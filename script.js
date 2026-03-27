document.addEventListener("DOMContentLoaded", () => {
    const initials = document.querySelector('.initials');
    const scrollIndicator = document.querySelector('.scroll-indicator');

    // 1. Smooth Fade Out as you scroll
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const windowHeight = window.innerHeight;
        
        // Calculate progress (0 to 1)
        const scrollProgress = Math.min(scrolled / windowHeight, 1);
        
        if (initials) {
            // Initials fade and scale down slightly as they get covered
            initials.style.opacity = 1 - (scrollProgress * 1.5);
            initials.style.transform = `scale(${1 - (scrollProgress * 0.1)})`;
        }
        
        if (scrollIndicator) {
            scrollIndicator.style.opacity = 1 - (scrollProgress * 3);
        }
    });

    // 2. Reveal Card (Intersection Observer)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.querySelector('.invite-card').classList.add('visible');
            }
        });
    }, { threshold: 0.3 });

    observer.observe(document.getElementById('invite-page'));

    // 3. Water Ripple Effect
    document.body.addEventListener("click", (e) => {
        const ripple = document.createElement("span");
        ripple.className = "ripple";
        const size = Math.max(window.innerWidth, window.innerHeight) * 0.15;
        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${e.clientX - size/2}px`;
        ripple.style.top = `${e.clientY - size/2}px`;
        document.getElementById("ripple-container").appendChild(ripple);
        setTimeout(() => ripple.remove(), 1000);
    });

    // 4. Falling Hearts
    setInterval(() => {
        const heart = document.createElement("div");
        heart.className = "heart";
        heart.innerHTML = "♥";
        heart.style.left = Math.random() * 100 + "vw";
        heart.style.animationDuration = Math.random() * 3 + 5 + "s";
        document.getElementById("hearts-container").appendChild(heart);
        setTimeout(() => heart.remove(), 6000);
    }, 700);
});