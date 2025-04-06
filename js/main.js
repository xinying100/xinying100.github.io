document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('#navbar a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetSection.offsetTop - 70,
                behavior: 'smooth'
            });
        });
    });
    
    // Sticky navbar
    const navbar = document.getElementById('navbar');
    const navbarOffset = navbar.offsetTop;
    
    function handleScroll() {
        if (window.pageYOffset >= navbarOffset) {
            navbar.classList.add('sticky');
        } else {
            navbar.classList.remove('sticky');
        }
        
        // Active link highlighting
        const scrollPosition = window.scrollY;
        
        document.querySelectorAll('.section').forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelectorAll('#navbar a').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', handleScroll);
    
    // Mobile navigation toggle for smaller screens
    const mobileBreakpoint = 768;
    
    function checkScreenSize() {
        if (window.innerWidth <= mobileBreakpoint) {
            // Add mobile-friendly navigation if not already present
            if (!document.querySelector('.mobile-nav-toggle')) {
                const navContainer = document.querySelector('#navbar .container');
                const navLinks = document.querySelector('#navbar ul');
                
                // Create mobile toggle button
                const mobileToggle = document.createElement('button');
                mobileToggle.className = 'mobile-nav-toggle';
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
