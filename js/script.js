document.addEventListener("DOMContentLoaded", function () {
  const div = document.createElement("div");
  div.className = "test-message";
  div.textContent = "✅ External JS Loaded via cdn.jamescarter.eu";
  document.body.appendChild(div);
});