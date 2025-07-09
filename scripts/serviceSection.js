document.addEventListener("DOMContentLoaded", function () {
  const serviceItems = document.querySelectorAll(".service-item");
  const navButtons = document.querySelectorAll(".nav-button");

  serviceItems.forEach((item) => {
    const button = item.querySelector(".nav-button");

    button.addEventListener("click", () => {
      // Check if the clicked item is already active
      const wasActive = item.classList.contains("active");

      // First, deactivate all items
      serviceItems.forEach((i) => i.classList.remove("active"));
      navButtons.forEach((b) => b.classList.remove("active-button-desktop"));

      // If the clicked item was not active, activate it.
      // This creates the accordion behavior where clicking an active item closes it.
      if (!wasActive) {
        item.classList.add("active");
        button.classList.add("active-button-desktop"); // Also add a class for desktop arrow
      } else {
        // Optional: if you want one item to always be open,
        // uncomment the two lines below to re-activate the first item
        // serviceItems[0].classList.add('active');
        // navButtons[0].classList.add('active-button-desktop');
      }
    });
  });
});
