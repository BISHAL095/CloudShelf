function showLoader() {
  const loader = document.getElementById("loader");
  if (loader) {
    loader.classList.remove("hidden");
  }
}

function hideLoader() {
  const loader = document.getElementById("loader");
  if (loader) {
    loader.classList.add("hidden");
  }
}

function attachLoaderToForms(selector = "form") {
  const forms = document.querySelectorAll(selector);

  forms.forEach(form => {
    form.addEventListener("submit", () => {
      showLoader();
    });
  });
}