document.addEventListener("DOMContentLoaded", function () {
  const btn = document.createElement("button");
  btn.textContent = "Click Me!";
  btn.onclick = () => {
    alert("If you're seeing this, your JS is working. 💥");
  };
  document.body.appendChild(btn);
});