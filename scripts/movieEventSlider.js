export function scrollRow(id, direction) {
    const el = document.getElementById(id);
    if (el) {
        // Use requestAnimationFrame to ensure we aren't interrupting a layout cycle
        requestAnimationFrame(() => {
            el.scrollBy({ left: 500 * direction, behavior: 'smooth' });
        });
    }
}

// Carousel Logic
let currentSlideIndex = 0;

export function changeHeroSlide(direction = 1) {
    const slides = document.querySelectorAll('.carousel .carousel_slide');
    const indicators = document.querySelectorAll('.indicator');
    
    if (slides.length === 0) return;
    
    // Batch all DOM changes inside a single frame
    requestAnimationFrame(() => {
        slides[currentSlideIndex].classList.remove('active');
        if (indicators[currentSlideIndex]) {
            indicators[currentSlideIndex].classList.remove('active');
        }
        
        currentSlideIndex = (currentSlideIndex + direction + slides.length) % slides.length;
        
        slides[currentSlideIndex].classList.add('active');
        if (indicators[currentSlideIndex]) {
            indicators[currentSlideIndex].classList.add('active');
        }
    });
}

// Auto-timer for Slider
// Check for carousel existence once and store it
const carouselExists = document.querySelector('.carousel');
if (carouselExists) {
    setInterval(() => {
        // Only trigger if the page is actually visible to the user
        if (!document.hidden) {
            changeHeroSlide(1);
        }
    }, 8000); 
}