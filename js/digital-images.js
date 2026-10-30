const zoomInput = document.querySelector("#comparison-zoom");
const zoomOutput = document.querySelector("#comparison-zoom-value");
const zoomImages = document.querySelectorAll("[data-zoom-image]");

if (zoomInput && zoomOutput && zoomImages.length === 2) {
  const updateComparisonZoom = () => {
    const zoomFactor = Number(zoomInput.value);
    const zoomPercentage = Math.round(zoomFactor * 100);

    zoomImages.forEach((image) => {
      image.style.setProperty("--comparison-zoom", zoomFactor);
    });

    zoomOutput.value = `${zoomPercentage}%`;
    zoomOutput.textContent = `${zoomPercentage}%`;
    zoomInput.setAttribute("aria-valuetext", `${zoomPercentage}%`);
  };

  zoomInput.addEventListener("input", updateComparisonZoom);
  updateComparisonZoom();
}