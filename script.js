document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;
    
    // 1. Setup the Smooth Scroll Wrapper
    // We only wrap the SECTIONS, not the background/ripple containers
    const scrollWrap = document.createElement('div');
    scrollWrap.id = 'scroll-container';
    scrollWrap.style.position = 'fixed';
    scrollWrap.style.top = '0';
    scrollWrap.style.left = '0';
    scrollWrap.style.width = '100%';
    scrollWrap.style.willChange = 'transform';

    const sections = document.querySelectorAll('section');
    sections.forEach(section => scrollWrap.appendChild(section));
    body.appendChild(scrollWrap);

    // Initial Variables
    let sy = 0, dy = 0; 
    const ease = 0.07; 

    // Set height of body to enable native scrollbar (even if hidden)
    function updateHeight() {
        body.style.height = `${scrollWrap.getBoundingClientRect().height}px`;
    }
    updateHeight();
    window.addEventListener('resize', updateHeight);

    // Update target scroll position on scroll
    window.addEventListener('scroll', () => {
        dy = window.scrollY;
    });

    // 2. The Main Premium Animation Loop
    function render() {
        // Linear Interpolation for "weighty" feel
        sy = (1 - ease) * sy + ease * dy;
        const roundedSy = Math.round(sy * 100) / 100;

        // Move the main container
        scrollWrap.style.transform = `translateY(-${roundedSy}px)`;

        // Handle Floating Initials & Parallax in the same loop for performance
        const initials = document.querySelector('.initials');
        if (initials) {
            // Slower upward movement (Parallax) + Fade out
            const opacityVal = 1 - (roundedSy / 500);
            initials.style.transform = `translateY(${roundedSy * 0.4}px) scale(${1 + roundedSy * 0.0002})`;
            initials.style.opacity = opacityVal;
        }

        // Handle Background parallax (optional)
        const mainPage = document.getElementById('main-page');
        if (mainPage) {
            mainPage.style.backgroundPositionY = `${roundedSy * 0.5}px`;
        }

        requestAnimationFrame(render);
    }
    requestAnimationFrame(render);

    // 3. Reveal Invitation on Scroll (Intersection Observer)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                entry.target.classList.remove('visible');
            }
        });
    }, { threshold: 0.1 });

    const invitePage = document.getElementById('invite-page');
    if (invitePage) observer.observe(invitePage);

    // 4. Water Ripple Effect (Stays fixed to screen)
    body.addEventListener("click", (e) => {
        const rippleContainer = document.getElementById("ripple-container");
        if(!rippleContainer) return;

        const ripple = document.createElement("span");
        ripple.classList.add("ripple");
        const size = Math.max(window.innerWidth, window.innerHeight) * 0.15;
        
        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${e.clientX - size / 2}px`;
        ripple.style.top = `${e.clientY - size / 2}px`;
        
        rippleContainer.appendChild(ripple);
        setTimeout(() => ripple.remove(), 1000);
    });

    // 5. Falling Hearts (Stays fixed to screen)
    setInterval(() => {
        const heartsContainer = document.getElementById("hearts-container");
        if(!heartsContainer) return;

        const heart = document.createElement("div");
        heart.classList.add("heart");
        heart.innerHTML = "♥";
        heart.style.left = Math.random() * 100 + "vw";
        heart.style.animationDuration = Math.random() * 5 + 7 + "s"; 
        heart.style.opacity = Math.random() * 0.3 + 0.2;
        heartsContainer.appendChild(heart);
        setTimeout(() => heart.remove(), 9000);
    }, 600);
});