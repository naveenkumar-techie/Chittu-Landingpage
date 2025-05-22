// Initialize Lucide Icons
lucide.createIcons();

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger);
    
    // Initialize all components
    initNavbar();
    initMobileMenu();
    initAnimations();
    initCounters();
    initBackToTop();
    initNewsletterForm();
});

// Navbar functionality
function initNavbar() {
    const navbar = document.getElementById('navbar');
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('top-0');
            navbar.classList.remove('top-8');
        } else {
            navbar.classList.add('top-8');
            navbar.classList.remove('top-0');
        }
    });
}

// Mobile Menu Functionality
function initMobileMenu() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenuClose = document.getElementById('mobile-menu-close');
    const mobileMenu = document.getElementById('mobile-menu');
    const body = document.body;
    
    // Open mobile menu
    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.remove('translate-x-full');
            mobileMenu.classList.add('translate-x-0');
            body.classList.add('menu-open');
        });
    }
    
    // Close mobile menu
    if (mobileMenuClose) {
        mobileMenuClose.addEventListener('click', function() {
            mobileMenu.classList.remove('translate-x-0');
            mobileMenu.classList.add('translate-x-full');
            body.classList.remove('menu-open');
        });
    }
    
    // Close menu when clicking on links
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('translate-x-0');
            mobileMenu.classList.add('translate-x-full');
            body.classList.remove('menu-open');
        });
    });
}

// Initialize GSAP Animations
function initAnimations() {
    // Reveal all GSAP elements
    gsap.utils.toArray('.gsap-reveal').forEach(element => {
        element.style.opacity = 0;
        element.style.visibility = 'visible';
    });
    
    // Page intro animation
    gsap.timeline()
        .fromTo('#page-intro .gsap-reveal', 
            { y: 50, opacity: 0 }, 
            { y: 0, opacity: 1, duration: 0.8, ease: "power2.out", delay: 0.5 }
        );
    
    // Mission section animation
    gsap.timeline({
        scrollTrigger: {
            trigger: '#mission',
            start: 'top 75%'
        }
    })
    .fromTo('#mission .gsap-reveal', 
        { x: -50, opacity: 0 }, 
        { x: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: "power2.out" }
    );
    
    // Values section animation
    gsap.timeline({
        scrollTrigger: {
            trigger: '#values',
            start: 'top 75%'
        }
    })
    .fromTo('#values .gsap-reveal:first-child', 
        { y: 30, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" }
    )
    .fromTo('#values .gsap-reveal:not(:first-child)', 
        { y: 50, opacity: 0, scale: 0.95 }, 
        { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.1, ease: "back.out(1.7)" },
        "-=0.4"
    );
    
    // Stats section animation
    gsap.timeline({
        scrollTrigger: {
            trigger: '#stats',
            start: 'top 75%'
        }
    })
    .fromTo('#stats .gsap-reveal:first-child', 
        { y: 30, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" }
    )
    .fromTo('#stats .gsap-reveal:not(:first-child)', 
        { y: 30, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out" },
        "-=0.4"
    );
    
    // Team section animation
    gsap.timeline({
        scrollTrigger: {
            trigger: '#team',
            start: 'top 75%'
        }
    })
    .fromTo('#team .gsap-reveal:first-child', 
        { y: 30, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" }
    )
    .fromTo('#team .gsap-reveal:not(:first-child)', 
        { y: 50, opacity: 0, scale: 0.95 }, 
        { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.15, ease: "back.out(1.7)" },
        "-=0.4"
    );
    
    // CTA section animation
    gsap.timeline({
        scrollTrigger: {
            trigger: '#cta',
            start: 'top 75%'
        }
    })
    .fromTo('#cta .gsap-reveal', 
        { y: 50, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
    );
}

// Initialize counters animation
function initCounters() {
    const counters = document.querySelectorAll('.counter');
    
    if (counters.length === 0) return;
    
    // Create counter animations
    gsap.timeline({
        scrollTrigger: {
            trigger: '#stats',
            start: 'top 75%',
            toggleActions: 'play none none none'
        }
    })
    .to(counters, {
        duration: 2,
        ease: "power2.out",
        onUpdate: function() {
            counters.forEach(counter => {
                const target = parseInt(counter.getAttribute('data-target'));
                const current = Math.floor(target * this.progress());
                
                if (target >= 1000000) {
                    counter.textContent = (current / 1000000).toFixed(1) + 'M+';
                } else if (target >= 1000) {
                    counter.textContent = (current / 1000).toFixed(0) + 'K+';
                } else {
                    counter.textContent = current + (target === 99 ? '%' : '');
                }
            });
        },
        onComplete: function() {
            // Set final values
            counters.forEach(counter => {
                const target = parseInt(counter.getAttribute('data-target'));
                if (target === 2000000) {
                    counter.textContent = '2M+';
                } else if (target === 50) {
                    counter.textContent = '50+';
                } else if (target === 99) {
                    counter.textContent = '99%';
                } else if (target === 5) {
                    counter.textContent = '<5';
                }
            });
        }
    });
}

// Initialize back to top button
function initBackToTop() {
    const backToTop = document.getElementById('back-to-top');
    
    if (backToTop) {
        // Show/hide button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.scrollY > 500) {
                backToTop.classList.remove('opacity-0', 'invisible');
                backToTop.classList.add('opacity-100', 'visible');
            } else {
                backToTop.classList.remove('opacity-100', 'visible');
                backToTop.classList.add('opacity-0', 'invisible');
            }
        });
        
        // Smooth scroll to top
        backToTop.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
}

// Initialize newsletter form
function initNewsletterForm() {
    const form = document.getElementById('newsletter-form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = form.querySelector('input[type="email"]');
            if (emailInput && emailInput.value) {
                // Show success message
                const successMessage = document.createElement('p');
                successMessage.textContent = 'Thank you for subscribing!';
                successMessage.className = 'text-green-600 mt-2 text-sm';
                
                // Remove any existing message
                const existingMessage = form.querySelector('.text-green-600');
                if (existingMessage) {
                    existingMessage.remove();
                }
                
                form.appendChild(successMessage);
                
                // Clear the input
                emailInput.value = '';
                
                // Animate success message
                gsap.from(successMessage, {
                    y: -20,
                    opacity: 0,
                    duration: 0.5,
                    ease: "power2.out"
                });
                
                // Remove message after 3 seconds
                setTimeout(() => {
                    if (successMessage.parentNode) {
                        successMessage.remove();
                    }
                }, 3000);
            }
        });
    }
}

// Add smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            e.preventDefault();
            
            // Close mobile menu if open
            const mobileMenu = document.getElementById('mobile-menu');
            const body = document.body;
            
            if (mobileMenu && mobileMenu.classList.contains('translate-x-0')) {
                mobileMenu.classList.remove('translate-x-0');
                mobileMenu.classList.add('translate-x-full');
                body.classList.remove('menu-open');
            }
            
            // Scroll to target
            window.scrollTo({
                top: targetElement.offsetTop - 100, // Offset for navbar
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.gsap-reveal').forEach(el => {
    observer.observe(el);
});

// Add CSS for fade-in animation
const style = document.createElement('style');
style.textContent = `
    .animate-fade-in {
        animation: fadeIn 0.6s ease-out forwards;
    }
    
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);