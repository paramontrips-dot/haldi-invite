document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Water Ripple Effect on Click
    document.body.addEventListener("click", function (e) {
        const rippleContainer = document.getElementById("ripple-container");
        const ripple = document.createElement("span");
        
        ripple.classList.add("ripple");
        
        // Calculate size and position
        const size = Math.max(window.innerWidth, window.innerHeight) * 0.1;
        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${e.clientX - size / 2}px`;
        ripple.style.top = `${e.clientY - size / 2}px`;
        
        rippleContainer.appendChild(ripple);
        
        // Remove the ripple element after animation completes to keep DOM clean
        setTimeout(() => {
            ripple.remove();
        }, 800);
    });

    // 2. Falling Golden Hearts Generator
    function createHeart() {
        const heartsContainer = document.getElementById("hearts-container");
        const heart = document.createElement("div");
        
        heart.classList.add("heart");
        heart.innerHTML = "♥"; // Using a text character for the heart to inherit CSS color cleanly
        
        // Randomize starting position, size, and animation duration
        heart.style.left = Math.random() * 100 + "vw";
        heart.style.animationDuration = Math.random() * 3 + 5 + "s"; // Between 5s and 8s
        heart.style.fontSize = Math.random() * 1 + 1 + "rem"; // Between 1rem and 2rem
        
        heartsContainer.appendChild(heart);
        
        // Remove heart after it falls off screen
        setTimeout(() => {
            heart.remove();
        }, 8000);
    }
    // Spawn a new heart every 400ms
    setInterval(createHeart, 400);

    // 3. Scroll Transition (Fade in Invitation)
    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.3 // Triggers when 30% of the section is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                
                // Optional: Fade out the main page initials slightly as you scroll down
                const mainPage = document.getElementById('main-page');
                mainPage.style.opacity = Math.max(0, 1 - (window.scrollY / 500));
            }
        });
    }, observerOptions);

    const inviteSection = document.getElementById("invite-page");
    observer.observe(inviteSection);
    
    // Attach scroll listener strictly to fade out the top section smoothly
    window.addEventListener('scroll', () => {
        const mainPage = document.getElementById('main-page');
        mainPage.style.opacity = 1 - (window.scrollY / 400);
    });
});