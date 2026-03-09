function openRename(id, name) {

  const modal = document.getElementById("renameModal");
  const input = document.getElementById("renameInput");
  const form = document.getElementById("renameForm");

  modal.style.display = "block";

  input.value = name;
  input.focus();
  input.select();

  form.action = "/files/" + id + "?_method=PUT";

}

function closeRename() {

  const modal = document.getElementById("renameModal");

  modal.style.display = "none";

}