const digitizationCanvas = document.querySelector("#digitization-canvas");
const digitizationContext = digitizationCanvas?.getContext("2d");

if (digitizationContext) {
  const visual = document.querySelector("#digitization-visual");
  const controls = document.querySelector("#digitization-controls");
  const startButton = document.querySelector("#digitization-start");
  const pauseButton = document.querySelector("#digitization-pause");
  const resetButton = document.querySelector("#digitization-reset");
  const status = document.querySelector("#digitization-status");
  const stageCards = document.querySelectorAll("[data-digitization-stage]");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const animationDuration = 8000;
  const sampleCount = 17;
  let elapsedTime = reducedMotion.matches ? animationDuration : 0;
  let previousTimestamp = null;
  let animationFrame = null;
  let running = false;
  let currentPhase = "";

  visual.hidden = false;
  controls.hidden = false;

  function signalValue(position) {
    return 0.8 * Math.sin(position * Math.PI * 4);
  }

  function highlightStage(stage) {
    stageCards.forEach((card) => {
      const active = card.dataset.digitizationStage === stage;
      card.classList.toggle("is-animation-active", active);
      if (active) {
        card.setAttribute("aria-current", "step");
      } else {
        card.removeAttribute("aria-current");
      }
    });
  }

  function drawDigitization() {
    const width = digitizationCanvas.getBoundingClientRect().width;
    const height = digitizationCanvas.getBoundingClientRect().height;
    const pixelRatio = window.devicePixelRatio || 1;
    const bufferWidth = Math.round(width * pixelRatio);
    const bufferHeight = Math.round(height * pixelRatio);
    if (digitizationCanvas.width !== bufferWidth || digitizationCanvas.height !== bufferHeight) {
      digitizationCanvas.width = bufferWidth;
      digitizationCanvas.height = bufferHeight;
    }
    digitizationContext.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    digitizationContext.clearRect(0, 0, width, height);

    const left = 44;
    const right = width - 18;
    const center = 146;
    const amplitude = 100;
    const positionX = (position) => left + position * (right - left);
    const positionY = (value) => center - value * amplitude;
    const progress = elapsedTime / animationDuration;
    const visibleSamples = Math.min(sampleCount, Math.floor(progress * 2 * sampleCount));
    const quantizedSamples = Math.max(0, Math.min(sampleCount, Math.floor((progress - 0.5) * 2 * sampleCount)));

    digitizationContext.font = '12px "DM Sans", sans-serif';
    digitizationContext.fillStyle = "#c8d0c5";
    digitizationContext.fillText("Amplitude normalizada", 12, 20);
    digitizationContext.fillText("Tempo →", Math.max(left, right - 60), height - 14);
    digitizationContext.lineWidth = 1;
    digitizationContext.strokeStyle = "#445448";
    for (const level of [-1, -0.5, 0, 0.5, 1]) {
      const verticalPosition = positionY(level);
      digitizationContext.beginPath();
      digitizationContext.moveTo(left, verticalPosition);
      digitizationContext.lineTo(right, verticalPosition);
      digitizationContext.stroke();
      digitizationContext.fillText(String(level).replace(".", ","), 8, verticalPosition + 4);
    }

    digitizationContext.beginPath();
    for (let pointIndex = 0; pointIndex <= 240; pointIndex += 1) {
      const position = pointIndex / 240;
      if (pointIndex === 0) {
        digitizationContext.moveTo(positionX(position), positionY(signalValue(position)));
      } else {
        digitizationContext.lineTo(positionX(position), positionY(signalValue(position)));
      }
    }
    digitizationContext.strokeStyle = "#c1f56b";
    digitizationContext.lineWidth = 2;
    digitizationContext.stroke();

    for (let sampleIndex = 0; sampleIndex < visibleSamples; sampleIndex += 1) {
      const position = sampleIndex / (sampleCount - 1);
      const horizontalPosition = positionX(position);
      const value = signalValue(position);
      const verticalPosition = positionY(value);
      digitizationContext.beginPath();
      digitizationContext.strokeStyle = "#88dbef";
      digitizationContext.lineWidth = 1;
      digitizationContext.moveTo(horizontalPosition, center);
      digitizationContext.lineTo(horizontalPosition, verticalPosition);
      digitizationContext.stroke();
      digitizationContext.beginPath();
      digitizationContext.arc(horizontalPosition, verticalPosition, 4, 0, Math.PI * 2);
      digitizationContext.fillStyle = "#88dbef";
      digitizationContext.fill();

      if (sampleIndex < quantizedSamples) {
        const quantizedValue = Math.round(value * 2) / 2;
        const quantizedPosition = positionY(quantizedValue);
        digitizationContext.strokeStyle = "#f4df80";
        digitizationContext.setLineDash([3, 3]);
        digitizationContext.beginPath();
        digitizationContext.moveTo(horizontalPosition, verticalPosition);
        digitizationContext.lineTo(horizontalPosition, quantizedPosition);
        digitizationContext.stroke();
        digitizationContext.setLineDash([]);
        digitizationContext.lineWidth = 2;
        digitizationContext.strokeRect(horizontalPosition - 5, quantizedPosition - 5, 10, 10);
      }
    }
  }

  function stopAnimation() {
    window.cancelAnimationFrame(animationFrame);
    animationFrame = null;
    previousTimestamp = null;
    running = false;
    startButton.disabled = false;
    pauseButton.disabled = true;
  }

  function animate(timestamp) {
    if (!running) return;
    if (previousTimestamp !== null) {
      elapsedTime = Math.min(animationDuration, elapsedTime + timestamp - previousTimestamp);
    }
    previousTimestamp = timestamp;
    const phase = elapsedTime < animationDuration / 2 ? "sampling" : "quantization";
    if (phase !== currentPhase) {
      currentPhase = phase;
      highlightStage(phase);
      status.textContent = phase === "sampling" ? "Amostragem: medidas em instantes regulares." : "Quantização: cada medida é aproximada a um nível disponível.";
    }
    drawDigitization();
    if (elapsedTime >= animationDuration) {
      stopAnimation();
      highlightStage(null);
      status.textContent = "Concluído: círculos são amostras; quadrados são valores quantizados.";
      return;
    }
    animationFrame = window.requestAnimationFrame(animate);
  }

  startButton.addEventListener("click", () => {
    if (running) return;
    if (reducedMotion.matches) {
      elapsedTime = animationDuration;
      highlightStage(null);
      drawDigitization();
      status.textContent = "Esquema completo, sem animação: preferência por movimento reduzido.";
      return;
    }
    if (elapsedTime >= animationDuration) elapsedTime = 0;
    running = true;
    currentPhase = "";
    startButton.disabled = true;
    pauseButton.disabled = false;
    animationFrame = window.requestAnimationFrame(animate);
  });

  pauseButton.addEventListener("click", () => {
    stopAnimation();
    status.textContent = "Pausado. Iniciar continua de onde parou.";
  });

  function resetAnimation() {
    stopAnimation();
    elapsedTime = reducedMotion.matches ? animationDuration : 0;
    currentPhase = "";
    highlightStage(null);
    drawDigitization();
    status.textContent = reducedMotion.matches ? "Esquema estático: preferência por movimento reduzido." : "Pronto para iniciar.";
  }

  resetButton.addEventListener("click", resetAnimation);
  reducedMotion.addEventListener("change", resetAnimation);
  window.addEventListener("resize", drawDigitization);
  const canvasResizeObserver = new ResizeObserver(drawDigitization);
  canvasResizeObserver.observe(digitizationCanvas);
  document.addEventListener("visibilitychange", () => {
    if (document.hidden && running) {
      stopAnimation();
      status.textContent = "Pausado enquanto a página está em segundo plano.";
    }
  });
  resetAnimation();
}