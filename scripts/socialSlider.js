class CustomSlider {
  constructor(container) {
    this.container = container;
    this.slides = container.querySelectorAll(".slide");
    this.totalSlides = this.slides.length;
    this.currentIndex = 0;
    this.isAnimating = false;
    this.autoplayInterval = null;
    this.autoplayDelay = 3000;
    this.isPaused = false;

    this.init();
  }

  init() {
    this.createPagination();
    this.updateSlides();
    this.setupEventListeners();
    this.startAutoplay();
  }

  createPagination() {
    const pagination = this.container.querySelector(".pagination");
    for (let i = 0; i < this.totalSlides; i++) {
      const dot = document.createElement("div");
      dot.classList.add("pagination-dot");
      if (i === 0) dot.classList.add("active");
      dot.addEventListener("click", () => this.goToSlide(i));
      pagination.appendChild(dot);
    }
  }

  updateSlides() {
    this.slides.forEach((slide, index) => {
      slide.classList.remove(
        "active",
        "prev",
        "next",
        "far-prev",
        "far-next",
        "hidden"
      );

      const position = this.getSlidePosition(index);
      slide.classList.add(position);
    });

    // Update pagination
    const dots = this.container.querySelectorAll(".pagination-dot");
    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === this.currentIndex);
    });
  }

  getSlidePosition(index) {
    const diff = index - this.currentIndex;

    if (diff === 0) return "active";
    if (diff === 1 || diff === -(this.totalSlides - 1)) return "next";
    if (diff === -1 || diff === this.totalSlides - 1) return "prev";
    if (diff === 2 || diff === -(this.totalSlides - 2)) return "far-next";
    if (diff === -2 || diff === this.totalSlides - 2) return "far-prev";
    return "hidden";
  }

  next() {
    if (this.isAnimating) return;
    this.isAnimating = true;

    this.currentIndex = (this.currentIndex + 1) % this.totalSlides;
    this.updateSlides();

    setTimeout(() => {
      this.isAnimating = false;
    }, 600);
  }

  prev() {
    if (this.isAnimating) return;
    this.isAnimating = true;

    this.currentIndex =
      (this.currentIndex - 1 + this.totalSlides) % this.totalSlides;
    this.updateSlides();

    setTimeout(() => {
      this.isAnimating = false;
    }, 600);
  }

  goToSlide(index) {
    if (this.isAnimating || index === this.currentIndex) return;
    this.isAnimating = true;

    this.currentIndex = index;
    this.updateSlides();

    setTimeout(() => {
      this.isAnimating = false;
    }, 600);
  }

  startAutoplay() {
    if (this.autoplayInterval) return;

    this.autoplayInterval = setInterval(() => {
      if (!this.isPaused) {
        this.next();
      }
    }, this.autoplayDelay);
  }

  stopAutoplay() {
    if (this.autoplayInterval) {
      clearInterval(this.autoplayInterval);
      this.autoplayInterval = null;
    }
  }

  pauseAutoplay() {
    this.isPaused = true;
  }

  resumeAutoplay() {
    this.isPaused = false;
  }

  setupEventListeners() {
    // Keyboard navigation
    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") this.prev();
      if (e.key === "ArrowRight") this.next();
    });

    // Touch/swipe support
    let startX = 0;
    let startY = 0;
    let isSwipe = false;

    this.container.addEventListener(
      "touchstart",
      (e) => {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        isSwipe = false;
      },
      { passive: true }
    );

    this.container.addEventListener(
      "touchmove",
      (e) => {
        if (!startX || !startY) return;

        const currentX = e.touches[0].clientX;
        const currentY = e.touches[0].clientY;

        const diffX = startX - currentX;
        const diffY = startY - currentY;

        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
          isSwipe = true;
          e.preventDefault();
        }
      },
      { passive: true }
    );

    this.container.addEventListener("touchend", (e) => {
      if (!startX || !startY || !isSwipe) return;

      const currentX = e.changedTouches[0].clientX;
      const diffX = startX - currentX;

      if (Math.abs(diffX) > 50) {
        if (diffX > 0) {
          this.next();
        } else {
          this.prev();
        }
      }

      startX = 0;
      startY = 0;
      isSwipe = false;
    });

    // Pause on hover
    this.container.addEventListener("mouseenter", () => {
      this.pauseAutoplay();
    });

    this.container.addEventListener("mouseleave", () => {
      this.resumeAutoplay();
    });

    // Click on slides to navigate
    this.slides.forEach((slide, index) => {
      slide.addEventListener("click", () => {
        if (slide.classList.contains("next")) {
          this.next();
        } else if (slide.classList.contains("prev")) {
          this.prev();
        }
      });
    });
  }
}

// Initialize slider
const sliderContainer = document.querySelector(".slider-container");
const slider = new CustomSlider(sliderContainer);
