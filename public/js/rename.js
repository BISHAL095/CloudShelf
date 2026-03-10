document.addEventListener("DOMContentLoaded", () => {

const modal = document.getElementById("renameModal");
const form = document.getElementById("renameForm");
const input = document.getElementById("renameInput");
const cancel = document.getElementById("renameCancel");

const buttons = document.querySelectorAll(".renameBtn");

buttons.forEach(btn => {
btn.addEventListener("click", () => {

const id = btn.dataset.id;
const name = btn.dataset.name;

input.value = name;
form.action = `/files/${id}?_method=PUT`;

modal.classList.remove("hidden");

});
});

cancel.addEventListener("click", () => {
modal.classList.add("hidden");
});

});