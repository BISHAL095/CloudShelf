/**
 * Show the loader
 */
export function showLoader() {
  const loader = document.getElementById('loader');
  if (loader) loader.style.display = 'flex';
}

/**
 * Hide the loader (optional)
 */
export function hideLoader() {
  const loader = document.getElementById('loader');
  if (loader) loader.style.display = 'none';
}

/**
 * Attach loader to any form automatically
 * Pass a CSS selector for forms, default is all <form>
 */
export function attachLoaderToForms(selector = 'form') {
  const forms = document.querySelectorAll(selector);
  forms.forEach(form => {
    form.addEventListener('submit', () => {
      showLoader();
    });
  });
}
