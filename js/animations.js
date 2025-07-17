function fadeIn() {
  const msg = document.createElement("div");
  msg.textContent = "🎉 Animations loaded";
  msg.style.opacity = 0;
  msg.style.transition = "opacity 1s ease-in";
  msg.style.marginTop = "40px";
  msg.style.fontSize = "1.2rem";
  document.body.appendChild(msg);

  setTimeout(() => {
    msg.style.opacity = 1;
  }, 100);
}

fadeIn();
