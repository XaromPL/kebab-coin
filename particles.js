particlesJS("particles-js", {
    particles: {
        number: {
            value: 100,  // Number of particles
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: "#ffffff"  // Particle color (white stars)
        },
        shape: {
            type: "circle"  // Particle shape
        },
        opacity: {
            value: 0.7,  // Opacity
            random: true,
            anim: {
                enable: true,
                speed: 1,
                opacity_min: 0.1,
                sync: false
            }
        },
        size: {
            value: 3,  // Particle size
            random: true,
            anim: {
                enable: true,
                speed: 3,
                size_min: 0.1,
                sync: false
            }
        },
        line_linked: {
            enable: false  
        },
        move: {
            enable: true,
            speed: 1,
            direction: "bottom",  
            random: true,
            straight: false,
            out_mode: "out"
        }
    },
    interactivity: {
        detect_on: "canvas",
        events: {
            onhover: {
                enable: true,
                mode: "repulse"
            },
            onclick: {
                enable: true,
                mode: "push"
            }
        }
    },
    retina_detect: true
});
