const cookieImg = document.getElementById("cookie");
const fortuneBox = document.getElementById("fortune-box");
const fortuneText = document.getElementById("fortune-text");
const crackSound = document.getElementById("crack-sound");

let fortunes = [];
let isOpen = false;
let isAnimating = false;

// Load fortunes from fortunes.json
fetch('fortunes.json')
  .then(response => response.json())
  .then(data => {
    fortunes = data;
  })
  .catch(error => {
    console.error("Failed to load fortunes.json:", error);
    fortunes = ["Oops! No fortune today."]; // fallback
  });

cookieImg.addEventListener("click", () => {
  if (isAnimating || fortunes.length === 0) return;
  isAnimating = true;

  // 🔊 Play crack sound immediately
  crackSound.currentTime = 0;
  crackSound.play().catch(e => console.warn("Audio play blocked:", e));

  // 🌀 Start spin animation
  cookieImg.classList.add("spin");

  setTimeout(() => {
    cookieImg.classList.remove("spin");

    if (!isOpen) {
      cookieImg.src = "fortune_open.png";
      cookieImg.style.transform = "translateX(4px)"; // Adjust if needed
      const randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
      fortuneText.textContent = randomFortune;
      fortuneBox.classList.remove("hidden");
      isOpen = true;
    } else {
      cookieImg.src = "fortune_closed.png";
      cookieImg.style.transform = "translateX(0)";
      fortuneBox.classList.add("hidden");
      fortuneText.textContent = "";
      isOpen = false;
    }

    isAnimating = false;
  }, 500); // match spin animation duration
});
