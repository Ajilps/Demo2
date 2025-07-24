// 6. JAVASCRIPT LOGIC

// --- SETUP SMOOTH SCROLLING WITH LENIS ---
const lenis = new Lenis();

// Connect Lenis to GSAP's ticker
lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

// --- SETUP SMOOTH SCROLL FOR NAV LINKS ---
// document.querySelectorAll("nav a").forEach((anchor) => {
//   anchor.addEventListener("click", function (e) {
//     e.preventDefault();
//     lenis.scrollTo(this.getAttribute("href"));
//     // console.log(this.getAttribute("href"));
//   });
// });

// Animation 1: Change the navbar's background on scroll.
ScrollTrigger.create({
  trigger: "body", // The trigger for this animation is the entire page.
  start: "top -160px", // Trigger when the user has scrolled 50px down from the top.
  toggleClass: {
    // Instead of animating a property, just toggle a CSS class.
    className: "navbar-scrolled", // The class to add/remove.
    targets: "nav", // The element to apply the class to.
  },
});
