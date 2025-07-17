function initButton() {
  const btn = document.createElement("button");
  btn.textContent = "Click Me!";
  btn.style.padding = "10px 20px";
  btn.style.marginTop = "20px";
  btn.onclick = () => alert("🧠 UI Button Clicked!");
  document.body.appendChild(btn);
}

initButton();
