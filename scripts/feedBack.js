let currentFeedback = 0;
const feedbackCards = document.querySelectorAll(".feedback-card");
const feedbackDots = document.querySelectorAll(".feedback-dot");
const feedbackPrevBtn = document.getElementById("feedbackPrevBtn");
const feedbackNextBtn = document.getElementById("feedbackNextBtn");

function showFeedback(n) {
  feedbackCards.forEach((card) => card.classList.remove("active"));
  feedbackDots.forEach((dot) => dot.classList.remove("active"));

  if (n >= feedbackCards.length) currentFeedback = 0;
  if (n < 0) currentFeedback = feedbackCards.length - 1;

  feedbackCards[currentFeedback].classList.add("active");
  feedbackDots[currentFeedback].classList.add("active");

  // Update button states
  feedbackPrevBtn.disabled = currentFeedback === 0;
  feedbackNextBtn.disabled = currentFeedback === feedbackCards.length - 1;
}

function nextFeedback() {
  currentFeedback++;
  showFeedback(currentFeedback);
}

function prevFeedback() {
  currentFeedback--;
  showFeedback(currentFeedback);
}

function currentFeedbackSlide(n) {
  currentFeedback = n - 1;
  showFeedback(currentFeedback);
}

// Event listeners
feedbackNextBtn.addEventListener("click", nextFeedback);
feedbackPrevBtn.addEventListener("click", prevFeedback);

// Auto-play functionality
let feedbackAutoPlay = setInterval(nextFeedback, 5000);

// Pause auto-play on hover
const feedbackContainer = document.querySelector(
  ".feedback-testimonial-container"
);
feedbackContainer.addEventListener("mouseenter", () => {
  clearInterval(feedbackAutoPlay);
});

feedbackContainer.addEventListener("mouseleave", () => {
  feedbackAutoPlay = setInterval(nextFeedback, 5000);
});

// Initialize
showFeedback(currentFeedback);

// Touch/swipe support for mobile
let feedbackTouchStartX = 0;
let feedbackTouchEndX = 0;

feedbackContainer.addEventListener(
  "touchstart",
  (e) => {
    feedbackTouchStartX = e.changedTouches[0].screenX;
  },
  { passive: true }
);

feedbackContainer.addEventListener("touchend", (e) => {
  feedbackTouchEndX = e.changedTouches[0].screenX;
  handleFeedbackSwipe();
});

function handleFeedbackSwipe() {
  if (feedbackTouchEndX < feedbackTouchStartX - 50) {
    nextFeedback();
  }
  if (feedbackTouchEndX > feedbackTouchStartX + 50) {
    prevFeedback();
  }
}
