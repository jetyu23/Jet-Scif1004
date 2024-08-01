document.addEventListener('DOMContentLoaded', function() {
    // Loader
    window.addEventListener('load', function() {
        const loader = document.getElementById('loader');
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    });

    // Smooth scrolling for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // GSAP Animations
    gsap.registerPlugin(ScrollTrigger);

    // Hero Section Parallax
    gsap.to("#hero", {
        backgroundPosition: "50% 100%",
        ease: "none",
        scrollTrigger: {
            trigger: "#hero",
            start: "top top",
            end: "bottom top",
            scrub: true
        }
    });

    // Timeline Animation
    gsap.utils.toArray('.event-container').forEach(container => {
        const eventBox = container.querySelector('.event');
        const imageBox = container.querySelector('.event-image-container');
        gsap.from([eventBox, imageBox], {
            opacity: 0,
            y: 50,
            duration: 1,
            stagger: 0.2,
            scrollTrigger: {
                trigger: container,
                start: "top bottom-=100",
                toggleActions: "play none none reverse"
            }
        });
    });

    // Science Grid Animation
    gsap.utils.toArray('.science-item').forEach(item => {
        gsap.from(item, {
            opacity: 0,
            scale: 0.8,
            duration: 0.5,
            scrollTrigger: {
                trigger: item,
                start: "top bottom-=50",
                toggleActions: "play none none reverse"
            }
        });
    });

    // Ethics Carousel Drag Scroll
    const carousel = document.querySelector('.ethics-carousel');
    let isDown = false;
    let startX;
    let scrollLeft;

    carousel.addEventListener('mousedown', (e) => {
        isDown = true;
        carousel.classList.add('active');
        startX = e.pageX - carousel.offsetLeft;
        scrollLeft = carousel.scrollLeft;
    });

    carousel.addEventListener('mouseleave', () => {
        isDown = false;
        carousel.classList.remove('active');
    });

    carousel.addEventListener('mouseup', () => {
        isDown = false;
        carousel.classList.remove('active');
    });

    carousel.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - carousel.offsetLeft;
        const walk = (x - startX) * 2;
        carousel.scrollLeft = scrollLeft - walk;
    });

    // Impact Columns Animation
    gsap.utils.toArray('.impact-column').forEach(column => {
        gsap.from(column, {
            opacity: 0,
            y: 30,
            duration: 0.8,
            scrollTrigger: {
                trigger: column,
                start: "top bottom-=50",
                toggleActions: "play none none reverse"
            }
        });
    });

    // Resource Links Animation
    gsap.utils.toArray('.resource-link').forEach(link => {
        gsap.from(link, {
            opacity: 0,
            scale: 0.9,
            duration: 0.5,
            scrollTrigger: {
                trigger: link,
                start: "top bottom-=30",
                toggleActions: "play none none reverse"
            }
        });
    });

    // Intersection Observer for navbar highlight
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav ul li a');

    const options = {
        threshold: 0.3 // Adjusted threshold
    };

    const observer = new IntersectionObserver(navCheck, options);

    function navCheck(entries) {
        entries.forEach(entry => {
            const id = entry.target.id;
            const activeLink = document.querySelector(`nav ul li a[href="#${id}"]`);
            if (entry.isIntersecting) {
                navLinks.forEach(link => link.classList.remove('active'));
                activeLink.classList.add('active');
            }
        });
    }

    sections.forEach(section => {
        observer.observe(section);
    });
});
