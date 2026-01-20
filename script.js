// Burger menu functionality (must run after DOM exists)
document.addEventListener("DOMContentLoaded", () => {
  const burgerBtn = document.getElementById("burgerBtn");
  const navMenu = document.getElementById("navMenu");
  const header = document.querySelector("header");

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
