const form = document.getElementById("registerForm");

if (form) {
  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const email = form.querySelector("input[name='email']").value;
    const password = form.querySelector("input[name='password']").value;

    const res = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    if (res.redirected) {
      window.location.href = res.url;
    } else {
      const text = await res.text();
      document.body.innerHTML = text;
    }
  });
}