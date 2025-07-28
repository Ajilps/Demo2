// class ContactFormManager {
//   constructor() {
//     this.form = document.getElementById("contactForm");
//     this.submitBtn = document.getElementById("submitBtn");
//     this.submitBtnText = document.getElementById("submitBtnText");
//     this.successMessage = document.getElementById("successMessage");

//     this.fields = {
//       fullName: {
//         element: document.getElementById("fullName"),
//         errorElement: document.getElementById("fullNameError"),
//         required: true,
//         minLength: 2,
//       },
//       email: {
//         element: document.getElementById("email"),
//         errorElement: document.getElementById("emailError"),
//         required: true,
//         pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
//       },
//       company: {
//         element: document.getElementById("company"),
//         errorElement: document.getElementById("companyError"),
//         required: false,
//         minLength: 2,
//       },
//       project: {
//         element: document.getElementById("project"),
//         errorElement: document.getElementById("projectError"),
//         required: false,
//         minLength: 5,
//       },
//     };

//     this.init();
//   }

//   init() {
//     this.form.addEventListener("submit", (e) => this.handleSubmit(e));

//     // Add real-time validation
//     Object.keys(this.fields).forEach((fieldName) => {
//       const field = this.fields[fieldName];
//       field.element.addEventListener("blur", () =>
//         this.validateField(fieldName)
//       );
//       field.element.addEventListener("input", () =>
//         this.clearFieldError(fieldName)
//       );
//     });
//   }

//   validateField(fieldName) {
//     const field = this.fields[fieldName];
//     const value = field.element.value.trim();
//     let isValid = true;
//     let errorMessage = "";

//     // Required field validation
//     if (field.required && !value) {
//       isValid = false;
//       errorMessage = `${this.getFieldDisplayName(fieldName)} is required`;
//     }
//     // Minimum length validation
//     else if (value && field.minLength && value.length < field.minLength) {
//       isValid = false;
//       errorMessage = `${this.getFieldDisplayName(fieldName)} must be at least ${
//         field.minLength
//       } characters`;
//     }
//     // Email pattern validation
//     else if (fieldName === "email" && value && !field.pattern.test(value)) {
//       isValid = false;
//       errorMessage = "Please enter a valid email address";
//     }

//     this.displayFieldError(fieldName, isValid, errorMessage);
//     return isValid;
//   }

//   validateAllFields() {
//     let isFormValid = true;

//     Object.keys(this.fields).forEach((fieldName) => {
//       const fieldValid = this.validateField(fieldName);
//       if (!fieldValid) {
//         isFormValid = false;
//       }
//     });

//     return isFormValid;
//   }

//   displayFieldError(fieldName, isValid, errorMessage) {
//     const field = this.fields[fieldName];

//     if (isValid) {
//       field.element.classList.remove("contact-form-input--error");
//       field.errorElement.classList.remove(
//         "contact-form-error-message--visible"
//       );
//     } else {
//       field.element.classList.add("contact-form-input--error");
//       field.errorElement.textContent = errorMessage;
//       field.errorElement.classList.add("contact-form-error-message--visible");
//     }
//   }

//   clearFieldError(fieldName) {
//     const field = this.fields[fieldName];
//     field.element.classList.remove("contact-form-input--error");
//     field.errorElement.classList.remove("contact-form-error-message--visible");
//   }

//   clearAllErrors() {
//     Object.keys(this.fields).forEach((fieldName) => {
//       this.clearFieldError(fieldName);
//     });
//     this.successMessage.classList.remove(
//       "contact-form-success-message--visible"
//     );
//   }

//   getFieldDisplayName(fieldName) {
//     const displayNames = {
//       fullName: "Full Name",
//       email: "Email",
//       company: "Company",
//       project: "Project",
//     };
//     return displayNames[fieldName] || fieldName;
//   }

//   getFormData() {
//     const formData = {};
//     Object.keys(this.fields).forEach((fieldName) => {
//       formData[fieldName] = this.fields[fieldName].element.value.trim();
//     });
//     return formData;
//   }

//   setLoadingState(isLoading) {
//     if (isLoading) {
//       this.submitBtn.classList.add("contact-form-submit-btn--loading");
//       this.submitBtn.disabled = true;
//       this.submitBtnText.textContent = "Sending...";
//     } else {
//       this.submitBtn.classList.remove("contact-form-submit-btn--loading");
//       this.submitBtn.disabled = false;
//       this.submitBtnText.textContent = "Send a Message";
//     }
//   }

//   resetForm() {
//     this.form.reset();
//     this.clearAllErrors();
//   }

//   showSuccessMessage() {
//     this.successMessage.classList.add("contact-form-success-message--visible");

//     // Auto-hide success message after 5 seconds
//     setTimeout(() => {
//       this.successMessage.classList.remove(
//         "contact-form-success-message--visible"
//       );
//     }, 5000);
//   }

//   async submitForm(formData) {
//     // Simulate API call - replace this with your actual submission logic
//     // return new Promise((resolve, reject) => {
//     //   setTimeout(() => {
//     //     // Simulate random success/failure for demo purposes
//     //     if (Math.random() > 0.1) {
//     //       // 90% success rate
//     //       resolve({
//     //         success: true,
//     //         message: "Form submitted successfully!",
//     //       });
//     //     } else {
//     //       reject({
//     //         success: false,
//     //         message: "Failed to submit form. Please try again.",
//     //       });
//     //     }
//     //   }, 2000); // Simulate 2-second delay
//     // });

//     // Example of actual API submission:
//     /*
//         try {
//             const response = await fetch('/api/contact', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(formData)
//             });

//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }

//             return await response.json();
//         } catch (error) {
//             throw error;
//         }
//         */
//   }

//   /* This function will sent the mail using "emailjs". after sending  it clear the form */
//   sentMail = () => {
//     var templateParams = {
//       title: "Message from website",
//       name: document.getElementById("fullName").value,
//       phone: document.getElementById("company").value,
//       email: document.getElementById("email").value,
//       message: document.getElementById("project").value,
//     };
//     console.log(templateParams);

//     emailjs.send("service_v9v6k1w", "template_ujtov9r", templateParams).then(
//       (response) => {
//         // document.getElementById("formName").value = "";
//         //         document.getElementById("phone").value = "";
//         //         document.getElementById("email").value = "";
//         //         document.getElementById("message").value = "";
//         console.log(response);
//         alert(" Your message sent successfully ");

//         console.log("SUCCESS!", response.status, response.text);
//       },
//       (error) => {
//         console.log("FAILED...", error);
//       }
//     );
//   };

//   ///////////////////////////////////////////////

//   async handleSubmit(e) {
//     e.preventDefault();

//     // Clear any previous messages
//     this.clearAllErrors();

//     // Validate all fields
//     if (!this.validateAllFields()) {
//       return;
//     }

//     // Get form data
//     const formData = this.getFormData();

//     // Set loading state
//     this.setLoadingState(true);

//     try {
//       // Submit form
//       const result = await this.submitForm(formData);

//       // Show success message
//       this.showSuccessMessage();

//       // Reset form
//       this.resetForm();

//       // Log success (you can customize this)
//       console.log("Form submitted successfully:", result);
//     } catch (error) {
//       // Handle submission error
//       console.error("Form submission error:", error);

//       // You could show a general error message here
//       alert(
//         "Sorry, there was an error submitting your form. Please try again."
//       );
//     } finally {
//       // Remove loading state
//       this.setLoadingState(false);
//     }
//   }
// }

// // Initialize the contact form when the DOM is loaded
// document.addEventListener("DOMContentLoaded", () => {
//   new ContactFormManager();
// });

class ContactFormManager {
  constructor() {
    this.form = document.getElementById("contactForm");
    this.submitBtn = document.getElementById("submitBtn");
    this.submitBtnText = document.getElementById("submitBtnText");
    this.successMessage = document.getElementById("successMessage");

    this.fields = {
      fullName: {
        element: document.getElementById("fullName"),
        errorElement: document.getElementById("fullNameError"),
        required: true,
        minLength: 2,
      },
      email: {
        element: document.getElementById("email"),
        errorElement: document.getElementById("emailError"),
        required: true,
        pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      },
      company: {
        element: document.getElementById("company"),
        errorElement: document.getElementById("companyError"),
        required: false,
        minLength: 2,
      },
      project: {
        element: document.getElementById("project"),
        errorElement: document.getElementById("projectError"),
        required: false,
        minLength: 5,
      },
    };

    this.init();
  }

  // Initialize event listeners
  init() {
    this.form.addEventListener("submit", (e) => this.handleSubmit(e));

    Object.keys(this.fields).forEach((fieldName) => {
      const field = this.fields[fieldName];
      field.element.addEventListener("blur", () =>
        this.validateField(fieldName)
      );
      field.element.addEventListener("input", () =>
        this.clearFieldError(fieldName)
      );
    });
  }

  // Validate individual field
  validateField(fieldName) {
    const field = this.fields[fieldName];
    const value = field.element.value.trim();
    let isValid = true;
    let errorMessage = "";

    if (field.required && !value) {
      isValid = false;
      errorMessage = `${this.getFieldDisplayName(fieldName)} is required`;
    } else if (value && field.minLength && value.length < field.minLength) {
      isValid = false;
      errorMessage = `${this.getFieldDisplayName(fieldName)} must be at least ${
        field.minLength
      } characters`;
    } else if (field.pattern && value && !field.pattern.test(value)) {
      isValid = false;
      errorMessage = `Please enter a valid ${this.getFieldDisplayName(
        fieldName
      ).toLowerCase()}`;
    }

    this.displayFieldError(fieldName, isValid, errorMessage);
    return isValid;
  }

  // Validate all fields
  validateAllFields() {
    return Object.keys(this.fields).every((fieldName) =>
      this.validateField(fieldName)
    );
  }

  // Display error or clear it
  displayFieldError(fieldName, isValid, errorMessage = "") {
    const field = this.fields[fieldName];
    if (isValid) {
      field.element.classList.remove("contact-form-input--error");
      field.errorElement.classList.remove(
        "contact-form-error-message--visible"
      );
    } else {
      field.element.classList.add("contact-form-input--error");
      field.errorElement.textContent = errorMessage;
      field.errorElement.classList.add("contact-form-error-message--visible");
    }
  }

  clearFieldError(fieldName) {
    const field = this.fields[fieldName];
    field.element.classList.remove("contact-form-input--error");
    field.errorElement.classList.remove("contact-form-error-message--visible");
  }

  clearAllErrors() {
    Object.keys(this.fields).forEach((fieldName) =>
      this.clearFieldError(fieldName)
    );
    this.successMessage.classList.remove(
      "contact-form-success-message--visible"
    );
  }

  getFieldDisplayName(fieldName) {
    const displayNames = {
      fullName: "Full Name",
      email: "Email",
      company: "Company",
      project: "Project",
    };
    return displayNames[fieldName] || fieldName;
  }

  getFormData() {
    const formData = {};
    Object.keys(this.fields).forEach((fieldName) => {
      formData[fieldName] = this.fields[fieldName].element.value.trim();
    });
    return formData;
  }

  setLoadingState(isLoading) {
    if (isLoading) {
      this.submitBtn.classList.add("contact-form-submit-btn--loading");
      this.submitBtn.disabled = true;
      this.submitBtnText.textContent = "Sending...";
    } else {
      this.submitBtn.classList.remove("contact-form-submit-btn--loading");
      this.submitBtn.disabled = false;
      this.submitBtnText.textContent = "Send a Message";
    }
  }

  resetForm() {
    this.form.reset();
    this.clearAllErrors();
  }

  // showSuccessMessage() {
  //   this.successMessage.classList.add("contact-form-success-message--visible");
  //   console.log(this.successMessage);
  //   setTimeout(() => {
  //     this.successMessage.classList.remove(
  //       "contact-form-success-message--visible"
  //     );
  //   }, 2000);
  // }

  // 👇 Real async form submission using emailjs
  async submitForm(formData) {
    const templateParams = {
      title: "Message from website",
      name: formData.fullName,
      company: formData.company,
      email: formData.email,
      project: formData.project,
    };

    console.log(templateParams);

    try {
      const response = await emailjs.send(
        "service_v9v6k1w",
        "template_ujtov9r",
        templateParams
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  // 👇 Submit handler
  async handleSubmit(e) {
    e.preventDefault();
    this.clearAllErrors();

    if (!this.validateAllFields()) return;

    const formData = this.getFormData();
    this.setLoadingState(true);

    try {
      await this.submitForm(formData);
      // this.showSuccessMessage();
      this.successMessage.classList.add(
        "contact-form-success-message--visible"
      );
      console.log(this.successMessage);
      setTimeout(() => {
        this.successMessage.classList.remove(
          "contact-form-success-message--visible"
        );
      }, 5000);

      this.resetForm();
      console.log("Form submitted successfully");
    } catch (error) {
      console.error("Form submission failed:", error);
      alert("There was an error submitting your form. Please try again.");
    } finally {
      this.setLoadingState(false);
    }
  }
}

// Initialize the contact form when the DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  new ContactFormManager();
});
