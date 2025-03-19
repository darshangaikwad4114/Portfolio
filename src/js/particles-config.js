async function initParticles() {
  await tsParticles.load('particles-js', {
    fullScreen: {
      enable: true,
      zIndex: 0,
    },
    particles: {
      number: {
        value: 40,
        density: {
          enable: true,
          value_area: 800,
        },
      },
      color: {
        value: ['#9338bd', '#1e90ff', '#ff3366'],
      },
      shape: {
        type: 'circle',
      },
      opacity: {
        value: 0.6,
        random: true,
        animation: {
          enable: true,
          speed: 1,
          minimumValue: 0.1,
          sync: false,
        },
      },
      size: {
        value: 3,
        random: true,
        animation: {
          enable: true,
          speed: 2,
          minimumValue: 0.1,
          sync: false,
        },
      },
      links: {
        enable: true,
        distance: 150,
        color: '#9338bd',
        opacity: 0.4,
        width: 1,
        triangles: {
          enable: true,
          opacity: 0.05,
        },
      },
      move: {
        enable: true,
        speed: 1,
        direction: 'none',
        random: true,
        straight: false,
        outModes: {
          default: 'bounce',
        },
        attract: {
          enable: true,
          rotateX: 600,
          rotateY: 1200,
        },
      },
    },
    interactivity: {
      detectsOn: 'canvas',
      events: {
        onHover: {
          enable: true,
          mode: ['grab', 'bubble'],
        },
        onClick: {
          enable: true,
          mode: 'push',
        },
        resize: true,
      },
      modes: {
        grab: {
          distance: 180,
          links: {
            opacity: 0.8,
          },
        },
        bubble: {
          distance: 200,
          size: 6,
          duration: 0.4,
          opacity: 0.8,
        },
        push: {
          quantity: 4,
        },
      },
    },
    background: {
      color: 'transparent',
    },
    detectRetina: true,
  });
}

// Initialize particles
document.addEventListener('DOMContentLoaded', () => {
  initParticles().catch(console.error);
});

// Responsive optimization
window.addEventListener('resize', () => {
  const width = window.innerWidth;
  const particles = tsParticles.domItem(0);

  if (particles) {
    if (width < 768) {
      particles.options.particles.number.value = 20;
      particles.options.particles.move.speed = 1;
    } else if (width < 1024) {
      particles.options.particles.number.value = 30;
      particles.options.particles.move.speed = 1.5;
    } else {
      particles.options.particles.number.value = 40;
      particles.options.particles.move.speed = 2;
    }
    particles.refresh();
  }
});
