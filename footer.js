function toggleBackground() {
  const footer = document.getElementById("footer");
  footer.classList.toggle("custom-bg");
}

// Optional: Add smooth scrolling for navigation links
document.querySelectorAll(".footer-nav a").forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    // Add your navigation logic here
    console.log("Navigating to:", this.getAttribute("href"));
  });
});
