const fileInput = document.getElementById("fileInput");
const nameInput = document.getElementById("nameInput");

fileInput.addEventListener("change", () => {

  const file = fileInput.files[0];

  if (file) {

    // show rename input
    nameInput.style.display = "block";

    // remove extension
    const fileName = file.name.substring(0, file.name.lastIndexOf(".")) || file.name;

    nameInput.value = fileName;

    // auto focus
    nameInput.focus();

    // optional: select text so user can overwrite immediately
    nameInput.select();

  }

});