// Load pizza menu from JSON
async function loadPizzaMenu() {
  try {
    const response = await fetch("pizza-data.json");
    const data = await response.json();
    const menuItemsDiv = document.querySelector(".menu-items");
    const specialMenuDiv = document.querySelector(".menu-special .menu-item");

    if (menuItemsDiv && data.pizze) {
      // Separate special pizza (id 10) from regular pizzas
      const regularPizzas = data.pizze.filter((pizza) => pizza.id !== 10);
      const specialPizza = data.pizze.find((pizza) => pizza.id === 10);

      // Display regular pizzas
      menuItemsDiv.innerHTML = regularPizzas
        .map(
          (pizza) => `
        <div class="pizza-card">
          <h3>${pizza.nazov}</h3>
          <p class="popis">${pizza.popis}</p>
          <p class="cena">€${pizza.cena.toFixed(2)}</p>
        </div>
      `,
        )
        .join("");

      // Display special pizza
      if (specialPizza && specialMenuDiv) {
        specialMenuDiv.innerHTML = `
        <div class="pizza-card special">
          <h3>${specialPizza.nazov}</h3>
          <p class="popis">${specialPizza.popis}</p>
          <p class="cena">€${specialPizza.cena.toFixed(2)}</p>
        </div>
      `;
      }
    }
  } catch (error) {
    console.error("Error loading pizza menu:", error);
  }
}

// Burger menu functionality (must run after DOM exists)
document.addEventListener("DOMContentLoaded", () => {
  const burgerBtn = document.getElementById("burgerBtn");
  const navMenu = document.getElementById("navMenu");
  const header = document.querySelector("header");

  // Load pizza menu
  loadPizzaMenu();

  if (burgerBtn && navMenu) {
    const setExpanded = (isOpen) => {
      burgerBtn.setAttribute("aria-expanded", String(isOpen));
      burgerBtn.setAttribute(
        "aria-label",
        isOpen ? "Close navigation" : "Open navigation",
      );
    };

    const closeMenu = () => {
      burgerBtn.classList.remove("active");
      navMenu.classList.remove("active");
      setExpanded(false);
      // Restore scrolling
      document.body.style.overflow = "";
    };

    const toggleMenu = () => {
      const willOpen = !navMenu.classList.contains("active");
      burgerBtn.classList.toggle("active", willOpen);
      navMenu.classList.toggle("active", willOpen);
      setExpanded(willOpen);
      // Allow scrolling on body when menu is open
      document.body.style.overflow = willOpen ? "visible" : "";

      // Position nav below header
      if (willOpen && header) {
        const headerHeight = header.offsetHeight;
        navMenu.style.top = headerHeight + "px";
      }
    };

    burgerBtn.addEventListener("click", toggleMenu);

    // Close menu when a link is clicked
    navMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    // Close on escape
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeMenu();
    });

    // Close if user clicks outside the menu (mobile dropdown)
    document.addEventListener("click", (e) => {
      const isOpen = navMenu.classList.contains("active");
      if (!isOpen) return;
      const clickedInside =
        navMenu.contains(e.target) || burgerBtn.contains(e.target);
      if (!clickedInside) closeMenu();
    });
  }
});
