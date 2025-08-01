// Card data - easily add more cards here
const cardData = [
  { name: "Arshad Warsi", image: "./images/celebrityImages/Arshad Warsi.png" },
  { name: "Asif Ali", image: "./images/celebrityImages/Asif Ali.png" },
  { name: "Basil Joseph", image: "./images/celebrityImages/Basil Joseph.png" },
  { name: "Dileep", image: "./images/celebrityImages/Dileep.png" },
  {
    name: "Dulquer Salman",
    image: "./images/celebrityImages/Dulquer Salman.png",
  },
  { name: "Honey Rose", image: "./images/celebrityImages/Honey Rose.png" },
  { name: "Jyothika", image: "./images/celebrityImages/Jyothika.png" },
  { name: "Karthi", image: "./images/celebrityImages/karthi.png" },
  { name: "Madhuri Dixit", image: "./images/celebrityImages/Madhuri.png" },
  {
    name: "Mamitha Baiju",
    image: "./images/celebrityImages/Mamitha Baiju.png",
  },
  { name: "Mohan Lal", image: "./images/celebrityImages/Mohan lal.png" },
  { name: "Nazriya ", image: "./images/celebrityImages/Nazria.png" },
  { name: "Nivin Pauly", image: "./images/celebrityImages/Nivin Pauly.png" },
  { name: "Samantha", image: "./images/celebrityImages/Saamantha.png" },
  { name: "Sanjay Dutt", image: "./images/celebrityImages/Sanjay Dutt.png" },
  { name: "Shiju Wilson", image: "./images/celebrityImages/Shiju Wilson.png" },
  {
    name: "Sivakarthikeyan",
    image: "./images/celebrityImages/Sivakarthikeyan.png",
  },
  { name: "Soori", image: "./images/celebrityImages/Soori.png" },
  { name: "Tamannaah", image: "./images/celebrityImages/tamannath.png" },
  { name: "Tovino Thomas", image: "./images/celebrityImages/Tovino.png" },
];

let currentIndex = 0;
let autoPlayInterval = null;
let isAutoPlaying = false;
let celebritySlides = [];

const celebrityPositions = [
  "celebrity-slide--hidden-left",
  "celebrity-slide--far-left",
  "celebrity-slide--left",
  "celebrity-slide--center",
  "celebrity-slide--right",
  "celebrity-slide--far-right",
  "celebrity-slide--hidden-right",
];

function createCelebritySlides() {
  const container = document.querySelector(".celebrity-slider-container");

  // Remove existing slides
  const existingSlides = container.querySelectorAll(".celebrity-slide");
  existingSlides.forEach((slide) => slide.remove());

  // Create new slides based on cardData
  cardData.forEach((card, index) => {
    const slideElement = document.createElement("div");
    slideElement.className = "celebrity-slide";

    const imageStyle = card.image
      ? `background-image: url('${card.image}'); background-size: cover;
      background-repeat: no-repeat;
      
      width: 100%; height: 100%;`
      : "";

    slideElement.innerHTML = `
                    <div class="celebrity-slide-image" style="${imageStyle}"></div>
                    <div class="celebrity-slide-name" style="text-align: center; padding-top: 10px;">${card.name}</div>
                `;

    // Add click handler
    slideElement.addEventListener("click", () => {
      currentIndex = index;
      updateCelebritySlider();
    });

    container.appendChild(slideElement);
  });

  // Update slides reference
  celebritySlides = document.querySelectorAll(".celebrity-slide");
}

function updateCelebritySlider() {
  const totalSlides = cardData.length;

  celebritySlides.forEach((slide, index) => {
    // Remove all position classes
    slide.className = "celebrity-slide";

    // Calculate relative position from current center
    let relativePos = index - currentIndex;

    // Handle wraparound
    if (relativePos > totalSlides / 2) {
      relativePos -= totalSlides;
    } else if (relativePos < -totalSlides / 2) {
      relativePos += totalSlides;
    }

    // Map to position index (center is at index 3)
    let posIndex = relativePos + 3;

    // Clamp to valid range
    posIndex = Math.max(0, Math.min(celebrityPositions.length - 1, posIndex));

    // Apply the position class
    slide.classList.add(celebrityPositions[posIndex]);
  });
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % cardData.length;
  updateCelebritySlider();
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + cardData.length) % cardData.length;
  updateCelebritySlider();
}

function startAutoPlay() {
  if (!isAutoPlaying) {
    autoPlayInterval = setInterval(nextSlide, 2500);
    isAutoPlaying = true;
  }
}

function stopAutoPlay() {
  if (isAutoPlaying) {
    clearInterval(autoPlayInterval);
    isAutoPlaying = false;
  }
}

// Add more cards dynamically
function addCard(name, image = "") {
  cardData.push({ name, image });
  createCelebritySlides();
  updateCelebritySlider();
}

// Remove card by index
function removeCard(index) {
  if (cardData.length > 1) {
    cardData.splice(index, 1);
    if (currentIndex >= cardData.length) {
      currentIndex = 0;
    }
    createCelebritySlides();
    updateCelebritySlider();
  }
}

// Update card data
function updateCard(index, name, image = "") {
  if (index >= 0 && index < cardData.length) {
    cardData[index] = { name, image };
    createCelebritySlides();
    updateCelebritySlider();
  }
}

// Add hover handlers to stop/start auto-play
document
  .querySelector(".celebrity-slider-container")
  .addEventListener("mouseenter", stopAutoPlay);
document
  .querySelector(".celebrity-slider-container")
  .addEventListener("mouseleave", startAutoPlay);

// Add keyboard navigation
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") prevSlide();
  if (e.key === "ArrowRight") nextSlide();
});

// Initialize
createCelebritySlides();
updateCelebritySlider();

// Auto-start autoplay after 1 second
setTimeout(() => {
  startAutoPlay();
}, 1000);
