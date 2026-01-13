/* ===============================
   SCROLL REVEAL (SMOOTH & LIGHT)
   =============================== */

const reveals = document.querySelectorAll('.reveal');

function revealOnScroll() {
    reveals.forEach(el => {
        const top = el.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (top < windowHeight - 120) {
            el.classList.add('active');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);


/* ===============================
   HERO SLIDER (SMOOTH FADE)
   =============================== */

const slides = document.querySelectorAll('.hero-slide');
let currentSlide = 0;
const slideInterval = 5000; // 5 seconds (premium feel)

function showSlide(index) {
    slides.forEach(slide => {
        slide.classList.remove('active');
        slide.style.opacity = 0;
    });

    slides[index].classList.add('active');
    slides[index].style.opacity = 1;
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

// Init
if (slides.length > 0) {
    showSlide(currentSlide);
    setInterval(nextSlide, slideInterval);
}


/* ===============================
   MENU CARD TOUCH SUPPORT (MOBILE)
   =============================== */

const menuCards = document.querySelectorAll('.menu-card');

menuCards.forEach(card => {
    card.addEventListener('click', () => {
        card.classList.toggle('flipped');
    });
});
