// Form submission handler
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const submitButton = document.getElementById("submitButton");
  const formData = new FormData(this);

  // Add loading state
  submitButton.classList.add("loading");
  submitButton.textContent = "Sending...";

  // Simulate form submission (replace with actual form handling)
  setTimeout(() => {
    // Reset button state
    submitButton.classList.remove("loading");
    submitButton.textContent = "Message Sent!";

    // Reset form
    setTimeout(() => {
      this.reset();
      submitButton.textContent = "Send a Message";
    }, 2000);
  }, 1500);
});

// Form validation
const inputs = document.querySelectorAll(".form-input");
inputs.forEach((input) => {
  input.addEventListener("blur", function () {
    if (this.required && !this.value.trim()) {
      this.style.borderBottomColor = "#ff4444";
    } else {
      this.style.borderBottomColor = "rgba(255, 255, 255, 0.3)";
    }
  });

  input.addEventListener("focus", function () {
    this.style.borderBottomColor = "#00bcd4";
  });
});

// Email validation
document.getElementById("emailInput").addEventListener("blur", function () {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (this.value && !emailRegex.test(this.value)) {
    this.style.borderBottomColor = "#ff4444";
  }
});
