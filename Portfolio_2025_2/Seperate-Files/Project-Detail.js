document.addEventListener('DOMContentLoaded', function() {
    // Initialize gallery
    const slides = document.querySelectorAll('.gallery-slide');
    const thumbnails = document.querySelectorAll('.thumbnail');
    const prevArrow = document.querySelector('.prev-arrow');
    const nextArrow = document.querySelector('.next-arrow');
    const indicators = document.querySelector('.gallery-indicators');
    
    let currentIndex = 0;
    
    // Create indicators
    slides.forEach((_, index) => {
        const indicator = document.createElement('div');
        indicator.classList.add('indicator');
        if (index === 0) indicator.classList.add('active');
        indicator.addEventListener('click', () => goToSlide(index));
        indicators.appendChild(indicator);
    });
    
    const indicatorDots = document.querySelectorAll('.indicator');
    
    // Function to update the active slide
    function goToSlide(index) {
        if (index < 0) index = slides.length - 1;
        if (index >= slides.length) index = 0;
        
        slides.forEach(slide => slide.classList.remove('active'));
        thumbnails.forEach(thumb => thumb.classList.remove('active'));
        indicatorDots.forEach(dot => dot.classList.remove('active'));
        
        slides[index].classList.add('active');
        thumbnails[index].classList.add('active');
        indicatorDots[index].classList.add('active');
        
        currentIndex = index;
    }
    
    // Event listeners for controls
    prevArrow.addEventListener('click', () => goToSlide(currentIndex - 1));
    nextArrow.addEventListener('click', () => goToSlide(currentIndex + 1));
    
    // Thumbnail clicks
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', () => {
            const index = parseInt(thumbnail.dataset.index);
            goToSlide(index);
        });
    });
    
    // Auto advance slides every 5 seconds
    let slideInterval = setInterval(() => goToSlide(currentIndex + 1), 5000);
    
    // Pause auto-advance on hover
    const galleryWrapper = document.querySelector('.gallery-wrapper');
    galleryWrapper.addEventListener('mouseenter', () => clearInterval(slideInterval));
    galleryWrapper.addEventListener('mouseleave', () => {
        clearInterval(slideInterval);
        slideInterval = setInterval(() => goToSlide(currentIndex + 1), 5000);
    });
    
    // Touch swipe support
    let touchStartX = 0;
    let touchEndX = 0;
    
    galleryWrapper.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    galleryWrapper.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        if (touchEndX < touchStartX - swipeThreshold) {
            // Swiped left
            goToSlide(currentIndex + 1);
        }
        if (touchEndX > touchStartX + swipeThreshold) {
            // Swiped right
            goToSlide(currentIndex - 1);
        }
    }
});



    // Navbar Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Navbar Scroll Effect
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });