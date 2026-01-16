// Generate random falling logos
document.addEventListener("DOMContentLoaded", function () {
  const fallingLogosContainer = document.querySelector(".falling-logos");
  const mainElement = document.querySelector("main");

  if (!fallingLogosContainer || !mainElement) return;

  // Clear existing logos
  fallingLogosContainer.innerHTML = "";

  // Number of logos to create
  const logoCount = 25;

  // Create random logos
  for (let i = 0; i < logoCount; i++) {
    const img = document.createElement("img");
    img.src = "pizza-logo.png";
    img.alt = "logo";
    img.classList.add("falling-logo");

    // Random horizontal position (10-90%)
    const randomLeft = Math.random() * 70 + 10;
    img.style.left = randomLeft + "%";

    // Random duration between 6-10 seconds
    const randomDuration = Math.random() * 4 + 6;
    img.style.setProperty("--duration", randomDuration + "s");

    // Random delay between 0-5 seconds
    const randomDelay = Math.random() * 5;
    img.style.setProperty("--delay", randomDelay + "s");

    // Random size between 40-70px
    const randomSize = Math.random() * 60 + 25;
    img.style.width = randomSize + "px";
    img.style.height = randomSize + "px";

    // Random opacity between 0.15-0.35
    const randomOpacity = Math.random() * 0.2 + 0.15;
    img.style.opacity = randomOpacity;

    fallingLogosContainer.appendChild(img);
  }

  // Update keyframes dynamically based on main element height
  updateFallAnimationHeight();

  // Update on window resize
  window.addEventListener("resize", updateFallAnimationHeight);
});

function updateFallAnimationHeight() {
  const mainElement = document.querySelector("main");
  if (!mainElement) return;

  const mainHeight = mainElement.offsetHeight;

  // Remove old style if exists
  let styleEl = document.getElementById("dynamic-fall-animation");
  if (styleEl) styleEl.remove();

  // Create new style element with dynamic animation
  const style = document.createElement("style");
  style.id = "dynamic-fall-animation";
  style.textContent = `
    @keyframes fall {
      from {
        transform: translateY(-100px) rotate(0deg);
        opacity: var(--initial-opacity, 0.75);
      }
      to {
        transform: translateY(${mainHeight + 100}px) rotate(360deg);
        opacity: var(--initial-opacity, 0.75);
      }
    }

    @media (max-width: 768px) {
      @keyframes fall {
        from {
          transform: translateY(-80px) rotate(0deg);
          opacity: var(--initial-opacity, 1);
        }
        to {
          transform: translateY(${mainHeight + 80}px) rotate(360deg);
          opacity: var(--initial-opacity, 1);
        }
      }
    }
  `;

  document.head.appendChild(style);
}
