// Intersection Observer for triggering animations when stats come into view
const observerOptions = {
  threshold: 0.5,
  rootMargin: "0px 0px -100px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const statNumbers = entry.target.querySelectorAll(".stat-number");
      statNumbers.forEach((stat) => {
        animateNumber(stat);
      });
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Function to animate counting
function animateNumber(element) {
  const target = parseInt(element.getAttribute("data-target"));
  const duration = 2000; // 2 seconds
  const increment = target / (duration / 16); // 60fps
  let current = 0;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    element.textContent = Math.floor(current) + "+";
  }, 16);
}

// Start observing the stats container
document.addEventListener("DOMContentLoaded", () => {
  const statsContainer = document.querySelector(".stats-container");
  if (statsContainer) {
    observer.observe(statsContainer);
  }
});
