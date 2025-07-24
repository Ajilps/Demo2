// Use an IIFE (Immediately Invoked Function Expression) to avoid polluting the global scope
(() => {
  // Query elements once and store them in constants
  const burger = document.querySelector(".burger");
  const mobileMenu = document.querySelector("#mobile-menu"); // Target by ID for specificity

  // Function to toggle the menu
  const toggleMenu = () => {
    const isOpened = burger.getAttribute("aria-expanded") === "true";
    burger.setAttribute("aria-expanded", !isOpened);

    burger.classList.toggle("active");
    mobileMenu.classList.toggle("active");
  };

  // Function to close the menu (can be used by other events)
  const closeMenu = () => {
    burger.setAttribute("aria-expanded", "false");
    burger.classList.remove("active");
    mobileMenu.classList.remove("active");
  };

  // --- Event Listeners ---

  // 1. Toggle menu when burger is clicked
  burger.addEventListener("click", toggleMenu);

  // 2. Use event delegation to close menu when a link inside it is clicked
  mobileMenu.addEventListener("click", (event) => {
    if (event.target.tagName === "A") {
      closeMenu();
    }
  });

  // 3. Close menu when clicking outside of it
  document.addEventListener("click", (event) => {
    // Check if the click is outside the mobile menu and not on the burger itself
    const isClickInsideMenu = mobileMenu.contains(event.target);
    const isClickOnBurger = burger.contains(event.target);
    if (
      !isClickInsideMenu &&
      !isClickOnBurger &&
      mobileMenu.classList.contains("active")
    ) {
      closeMenu();
    }
  });

  // 4. Close the menu when the 'Escape' key is pressed
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && mobileMenu.classList.contains("active")) {
      closeMenu();
    }
  });

  // 5. Close menu on window resize if screen becomes larger
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768 && mobileMenu.classList.contains("active")) {
      closeMenu();
    }
  });
})();

// Scroll animation for header and logos
lenis.on("scroll", () => {
  const scrolled = window.pageYOffset;

  const header = document.getElementById("header");
  const centerLogo = document.getElementById("centerLogo");
  const navLogo = document.getElementById("navLogo");

  if (header) {
    header.classList.toggle("scrolled", scrolled > 50);
  }

  if (centerLogo && navLogo) {
    if (scrolled > 200) {
      centerLogo.classList.add("hidden");
      navLogo.classList.add("visible");
    } else {
      centerLogo.classList.remove("hidden");
      navLogo.classList.remove("visible");
    }
  }
});
