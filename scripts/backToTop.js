/* BACK TO TOP FUNCTIONALITY */
const backToTop = document.getElementById("backToTop");
let backToTopVisible = false;

function handleBackToTopScroll() {
  const scrollTop = window.pageYOffset;

  // Back to top button visibility
  if (scrollTop > 300 && !backToTopVisible) {
    backToTop.classList.add("visible");
    backToTopVisible = true;
  } else if (scrollTop <= 300 && backToTopVisible) {
    backToTop.classList.remove("visible");
    backToTopVisible = false;
  }
}

/* BACK TO TOP CLICK EVENT */
backToTop.addEventListener("click", () => {
  console.log("button clicked");
  lenis.scrollTo("#section1", {
    duration: 4, // 4 seconds long scroll
    offset: -60,
  });
});

/* OPTIMIZED SCROLL LISTENER FOR BACK TO TOP */
let backToTopTicking = false;

function optimizedBackToTopScroll() {
  if (!backToTopTicking) {
    requestAnimationFrame(() => {
      handleBackToTopScroll();
      backToTopTicking = false;
    });
    backToTopTicking = true;
  }
}

lenis.on("scroll", optimizedBackToTopScroll, { passive: true });

/* HANDLE ORIENTATION CHANGE FOR BACK TO TOP */
window.addEventListener("orientationchange", () => {
  setTimeout(() => {
    handleBackToTopScroll();
  }, 100);
});
