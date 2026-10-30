const comingSoonButtons = document.querySelectorAll("[data-coming-soon]");
const toast = document.querySelector(".toast");
let toastTimeout;

comingSoonButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const featureName = button.dataset.comingSoon;

    toast.textContent = `${featureName} estará disponível em breve.`;
    toast.classList.add("is-visible");

    window.clearTimeout(toastTimeout);
    toastTimeout = window.setTimeout(() => {
      toast.classList.remove("is-visible");
    }, 2800);
  });
});