const logoConfig = [
  // Add your logos here - just edit the paths and names!
  { src: "./images/brandsImage/1.png", alt: "Intel" },
  { src: "./images/brandsImage/2.png", alt: "V-Ray" },
  { src: "./images/brandsImage/JBL 3.png", alt: "JBL" },
  { src: "./images/brandsImage/10.png", alt: "Visa" },
  { src: "./images/brandsImage/11.png", alt: "Adobe" },
  { src: "./images/brandsImage/12.png", alt: "3DS Max" },
  { src: "./images/brandsImage/13.png", alt: "Nvidia" },
  { src: "./images/brandsImage/5.png", alt: "5" },
  { src: "./images/brandsImage/6.png", alt: "6" },
  { src: "./images/brandsImage/7.png", alt: "7" },
  { src: "./images/brandsImage/8.png", alt: "8" },
  { src: "./images/brandsImage/9.png", alt: "9" },
  { src: "./images/brandsImage/4.png", alt: "4" },
];

// Animation speed (in seconds) - lower = faster
const animationDuration = 40;

// Enable/disable pause on hover
const pauseOnHover = true;

function generateLogoSlider() {
  const track = document.getElementById("brandsTrack");
  track.innerHTML = ""; // Clear existing content

  // Set animation duration
  track.style.animationDuration = `${animationDuration}s`;

  // Create two identical sets for seamless loop
  for (let setIndex = 0; setIndex < 2; setIndex++) {
    const brandSet = document.createElement("div");
    brandSet.className = "brand-set";

    logoConfig.forEach((logo, index) => {
      const brandItem = document.createElement("div");
      brandItem.className = "brand-item";

      const brandLogo = document.createElement("div");
      brandLogo.className = "brand-logo";

      // Try to load real image, fallback to demo logo
      const img = document.createElement("img");
      img.src = logo.src;
      img.alt = logo.alt;
      img.style.maxWidth = "100%";
      img.style.maxHeight = "100%";
      img.style.objectFit = "contain";
      img.style.filter = "grayscale(0.3)";
      img.style.transition = "all 0.3s ease";

      // Fallback for missing images
      img.onerror = function () {
        const demoLogo = document.createElement("div");
        demoLogo.className = "demo-logo";
        demoLogo.textContent = logo.alt.toUpperCase();
        demoLogo.style.background = `hsl(${index * 45}, 70%, 60%)`;
        brandLogo.replaceChild(demoLogo, img);
      };

      brandLogo.appendChild(img);
      brandItem.appendChild(brandLogo);
      brandSet.appendChild(brandItem);
    });

    track.appendChild(brandSet);
  }

  // Apply hover pause setting
  if (pauseOnHover) {
    document
      .querySelector(".brands-slider")
      .addEventListener("mouseenter", () => {
        track.style.animationPlayState = "paused";
      });
    document
      .querySelector(".brands-slider")
      .addEventListener("mouseleave", () => {
        track.style.animationPlayState = "running";
      });
  }
}

// Initialize the slider
document.addEventListener("DOMContentLoaded", generateLogoSlider);
