class LoadingManager {
  constructor() {
    this.loadingScreen = document.getElementById("loadingScreen");
    this.mainContent = document.getElementById("mainContent");
    this.progressBar = document.getElementById("progressBar");
    this.minLoadingTime = 3000; // Minimum 3 seconds
    this.startTime = Date.now();

    this.init();
  }

  init() {
    // Simulate loading progress
    this.simulateLoading();

    // Check if page is fully loaded
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () =>
        this.checkLoadingComplete()
      );
    } else {
      this.checkLoadingComplete();
    }

    // Also listen for window load event (images, etc.)
    window.addEventListener("load", () => this.checkLoadingComplete());
  }

  simulateLoading() {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15;
      if (progress > 90) progress = 90;

      this.updateProgress(progress);

      if (progress >= 90) {
        clearInterval(interval);
      }
    }, 200);
  }

  updateProgress(percentage) {
    this.progressBar.style.width = percentage + "%";
  }

  async checkLoadingComplete() {
    const currentTime = Date.now();
    const elapsedTime = currentTime - this.startTime;

    // Ensure minimum loading time
    if (elapsedTime < this.minLoadingTime) {
      setTimeout(
        () => this.completeLoading(),
        this.minLoadingTime - elapsedTime
      );
    } else {
      this.completeLoading();
    }
  }

  completeLoading() {
    // Complete the progress bar
    this.updateProgress(100);

    // Wait a bit for the progress bar to complete
    setTimeout(() => {
      // Hide loading screen
      this.loadingScreen.classList.add("loading-screen--hidden");

      // // Show main content
      // setTimeout(() => {
      //   this.mainContent.classList.add("main-content--visible");

      //   // Initialize contact form after loading is complete
      //   new ContactFormManager();
      // }, 400);
    }, 300);
  }
}

// Initialize loading manager when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new LoadingManager();
});
