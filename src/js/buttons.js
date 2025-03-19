// Ripple effect
const addRippleEffect = (e) => {
  const button = e.currentTarget;
  const ripple = document.createElement('span');
  const rect = button.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);

  ripple.classList.add('ripple');
  ripple.style.width = ripple.style.height = `${size}px`;
  ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
  ripple.style.top = `${e.clientY - rect.top - size / 2}px`;

  button.appendChild(ripple);
  ripple.addEventListener('animationend', () => ripple.remove());
};

// Magnetic effect
const magneticButtons = document.querySelectorAll('.btn-magnetic');
magneticButtons.forEach((button) => {
  button.addEventListener('mousemove', (e) => {
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    button.style.setProperty('--mx', `${x * 0.2}px`);
    button.style.setProperty('--my', `${y * 0.2}px`);
  });

  button.addEventListener('mouseleave', () => {
    button.style.setProperty('--mx', '0px');
    button.style.setProperty('--my', '0px');
  });
});

// Initialize ripple effects
document.querySelectorAll('.btn-ripple').forEach((button) => {
  button.addEventListener('click', addRippleEffect);
});
