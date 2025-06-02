document.addEventListener('DOMContentLoaded', function() {
    // Certificate carousel initialization
    initCertificateCarousel();
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('#navbar a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Adjust for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Highlight active section in navigation
    function handleScroll() {
        const scrollPosition = window.scrollY;
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('#navbar a');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionId = '#' + section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
        
        // Handle fixed header
        const header = document.querySelector('header');
        if (scrollPosition > 100) {
            header.classList.add('fixed');
        } else {
            header.classList.remove('fixed');
        }
    }
    
    window.addEventListener('scroll', handleScroll);
    
    // Mobile navigation toggle for smaller screens
    const mobileBreakpoint = 768;
    
    function checkScreenSize() {
        // Remove existing mobile navigation elements when screen size changes
        const existingToggle = document.querySelector('.mobile-nav-toggle');
        const navLinks = document.querySelector('#navbar ul');
        
        if (existingToggle) {
            existingToggle.remove();
            navLinks.classList.remove('mobile-nav-links', 'show');
        }
        
        if (window.innerWidth <= mobileBreakpoint) {
            // Only add mobile navigation on small screens
            const navContainer = document.querySelector('#navbar .container');
            
            // Create mobile toggle button
            const mobileToggle = document.createElement('button');
            mobileToggle.className = 'mobile-nav-toggle';
            mobileToggle.setAttribute('aria-label', 'Toggle navigation menu');
            mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
            navContainer.insertBefore(mobileToggle, navLinks);
            
            // Add mobile class to nav links
            navLinks.classList.add('mobile-nav-links');
            
            // Toggle mobile menu
            mobileToggle.addEventListener('click', function() {
                navLinks.classList.toggle('show');
                this.innerHTML = navLinks.classList.contains('show') ? 
                    '<i class="fas fa-times"></i>' : 
                    '<i class="fas fa-bars"></i>';
            });
            
            // Close menu when clicking a link
            navLinks.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', function() {
                    navLinks.classList.remove('show');
                    mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
                });
            });
        }
    }
    
    // Initialize and check on resize
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    // Add animation on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.timeline-item, .project-card, .skills-category, .achievement-item, .leadership-item');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.classList.add('animate');
            }
        });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    // Initial check
    animateOnScroll();
});

// Certificate carousel function
function initCertificateCarousel() {
    const certificatesTrack = document.getElementById('certificatesTrack');
    const certificateSlides = certificatesTrack ? certificatesTrack.querySelectorAll('.carousel-slide') : [];
    const certificatePrevBtn = document.querySelector('.certificates-carousel .prev');
    const certificateNextBtn = document.querySelector('.certificates-carousel .next');
    
    if (!certificatesTrack || certificateSlides.length === 0) {
        return; // Exit if elements don't exist
    }
    
    // Clone slides to create infinite loop effect
    // First, store original slides in an array
    const originalSlides = Array.from(certificateSlides);
    const totalOriginalSlides = originalSlides.length;
    
    // Always create a set of clones to ensure infinite looping
    // This works regardless of how many original slides there are
    if (totalOriginalSlides > 0) {
        // For very few slides, create multiple sets of clones
        const clonesNeeded = totalOriginalSlides < 6 ? 2 : 1;
        
        for (let i = 0; i < clonesNeeded; i++) {
            originalSlides.forEach(slide => {
                const clone = slide.cloneNode(true);
                certificatesTrack.appendChild(clone);
            });
        }
    }
    
    let certificateIndex = 0;
    const slidesToShow = window.innerWidth < 768 ? 1 : 3; // Responsive: show fewer slides on mobile
    const slideWidth = (certificatesTrack.parentElement.clientWidth - 120) / slidesToShow; // Account for padding
    
    // Get all slides including clones
    const allSlides = certificatesTrack.querySelectorAll('.carousel-slide');
    const totalSlides = allSlides.length;
    
    // Adjust certificateIndex based on number of slides vs slidesToShow
    // This ensures proper looping behavior regardless of number of certificates
    const effectiveSlideCount = Math.max(totalOriginalSlides, slidesToShow);
    
    // Set initial width for all slides
    allSlides.forEach(slide => {
        slide.style.minWidth = `${slideWidth}px`;
    });
    
    function updateCertificateCarousel(smooth = true) {
        const offset = certificateIndex * slideWidth;
        certificatesTrack.style.transition = smooth ? 'transform 0.5s ease-in-out' : 'none';
        certificatesTrack.style.transform = `translateX(-${offset}px)`;
    }
    
    function nextCertificateSlide() {
        certificateIndex++;
        updateCertificateCarousel();
        
        // If we've reached beyond the end of original slides, loop to beginning
        if (certificateIndex >= totalOriginalSlides) {
            // Wait for the transition to finish before resetting
            setTimeout(() => {
                certificateIndex = 0;
                updateCertificateCarousel(false);
            }, 500);
        }
    }
    
    function prevCertificateSlide() {
        certificateIndex--;
        updateCertificateCarousel();
        
        // If we've gone before the beginning, loop to end
        if (certificateIndex < 0) {
            // Wait for the transition to finish before resetting
            setTimeout(() => {
                certificateIndex = totalOriginalSlides - 1;
                updateCertificateCarousel(false);
            }, 500);
        }
    }
    
    // Add event listeners if buttons exist
    if (certificateNextBtn) {
        certificateNextBtn.addEventListener('click', nextCertificateSlide);
    }
    
    if (certificatePrevBtn) {
        certificatePrevBtn.addEventListener('click', prevCertificateSlide);
    }
    
    // Auto-scroll every 5 seconds, only if we have more than one slide
    let autoScrollInterval = totalOriginalSlides > 1 ? setInterval(nextCertificateSlide, 3000) : null;
    
    // Pause auto-scroll when hovering over carousel
    const carouselContainer = document.querySelector('.certificates-carousel');
    if (carouselContainer) {
        carouselContainer.addEventListener('mouseenter', () => {
            if (autoScrollInterval) {
                clearInterval(autoScrollInterval);
            }
        });
        
        carouselContainer.addEventListener('mouseleave', () => {
            if (totalOriginalSlides > 1) {
                autoScrollInterval = setInterval(nextCertificateSlide, 3000);
            }
        });
    }
    
    // Update carousel on window resize
    window.addEventListener('resize', () => {
        const newSlidesToShow = window.innerWidth < 768 ? 1 : 3;
        const newSlideWidth = (certificatesTrack.parentElement.clientWidth - 120) / newSlidesToShow;
        
        // Update all slides including clones
        allSlides.forEach(slide => {
            slide.style.minWidth = `${newSlideWidth}px`;
        });
        
        // Maintain position within the original slides range
        certificateIndex = Math.min(certificateIndex, totalOriginalSlides - 1);
        certificateIndex = Math.max(0, certificateIndex);
        updateCertificateCarousel(false);
    });
    
    // Start from a sensible position to show certificates centered
    certificateIndex = Math.min(1, totalOriginalSlides - 1);
    
    // Initial setup
    updateCertificateCarousel();
}
