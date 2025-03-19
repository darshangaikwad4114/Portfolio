class ContactForm {
  constructor() {
    this.form = document.querySelector('.contact-form');
    this.inputs = this.form.querySelectorAll('.form-control');
    this.submitBtn = this.form.querySelector('.submit-btn');

    this.validationRules = {
      name: {
        pattern: /^[a-zA-Z\s]{3,30}$/,
        message: 'Name must be 3-30 characters long and contain only letters',
      },
      email: {
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: 'Please enter a valid email address',
      },
      message: {
        minLength: 10,
        message: 'Message must be at least 10 characters long',
      },
    };

    this.initializeForm();
  }

  initializeForm() {
    this.inputs.forEach((input) => {
      // Add placeholder for floating label effect
      input.setAttribute('placeholder', ' ');

      input.addEventListener('focus', () => this.handleFocus(input));
      input.addEventListener('blur', () => this.handleBlur(input));
      input.addEventListener('input', () => this.validateInput(input));
    });

    this.form.addEventListener('submit', (e) => this.handleSubmit(e));
  }

  handleFocus(input) {
    input.parentElement.classList.add('focused');
    this.removeMagnetic();
  }

  handleBlur(input) {
    input.parentElement.classList.remove('focused');
    this.addMagnetic();
    if (!input.value) {
      input.classList.remove('has-error');
      this.hideError(input);
    } else {
      this.validateInput(input);
    }
  }

  validateInput(input) {
    const rule = this.validationRules[input.id];
    let isValid = true;
    let message = '';

    if (rule) {
      if (rule.pattern && !rule.pattern.test(input.value)) {
        isValid = false;
        message = rule.message;
      }
      if (rule.minLength && input.value.length < rule.minLength) {
        isValid = false;
        message = rule.message;
      }
    }

    this.toggleError(input, !isValid, message);
    return isValid;
  }

  toggleError(input, show, message = '') {
    const errorElement = input.parentElement.querySelector('.error-message');
    if (show) {
      input.classList.add('has-error');
      errorElement.textContent = message;
      errorElement.classList.add('show');
    } else {
      input.classList.remove('has-error');
      errorElement.classList.remove('show');
    }
  }

  hideError(input) {
    const errorElement = input.parentElement.querySelector('.error-message');
    errorElement.classList.remove('show');
  }

  async handleSubmit(e) {
    e.preventDefault();

    let isValid = true;
    this.inputs.forEach((input) => {
      if (!this.validateInput(input)) {
        isValid = false;
      }
    });

    if (isValid) {
      this.submitBtn.disabled = true;
      const originalText = this.submitBtn.innerHTML;
      this.submitBtn.innerHTML = `
        <span class="success-animation">
          <i class="fas fa-circle-notch fa-spin"></i>
        </span>
      `;

      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));

        this.submitBtn.innerHTML = `
          <span class="success-animation show">
            <i class="fas fa-check"></i>
          </span>
        `;

        setTimeout(() => {
          this.form.reset();
          this.submitBtn.disabled = false;
          this.submitBtn.innerHTML = originalText;
        }, 2000);
      } catch (error) {
        console.error('Form submission error:', error);
        this.submitBtn.innerHTML = 'Error, please try again';
        this.submitBtn.disabled = false;
      }
    }
  }

  // Magnetic effect for submit button
  addMagnetic() {
    const btn = this.submitBtn;
    btn.addEventListener('mousemove', this.handleMagneticMove);
    btn.addEventListener('mouseleave', this.handleMagneticLeave);
  }

  removeMagnetic() {
    const btn = this.submitBtn;
    btn.removeEventListener('mousemove', this.handleMagneticMove);
    btn.removeEventListener('mouseleave', this.handleMagneticLeave);
  }

  handleMagneticMove = (e) => {
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
  };

  handleMagneticLeave = (e) => {
    const btn = e.currentTarget;
    btn.style.transform = '';
  };
}

// Initialize form when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new ContactForm();
});
