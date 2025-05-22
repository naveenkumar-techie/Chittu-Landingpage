// Initialize Lucide Icons
lucide.createIcons();

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger, TextPlugin);
    
    // Initialize all components
    initNavbar();
    initMobileMenu();
    initAnimations();
    initBackToTop();
    initTextAnimations();
    initHoverEffects();
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
    
    // Hero section animations
    const heroTl = gsap.timeline();
    
    heroTl.fromTo('#hero .gsap-reveal', 
        { y: 50, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: "power2.out", delay: 0.5 }
    );
    
    // Create scrolling animations for all sections
    gsap.utils.toArray('section').forEach(section => {
        const elements = section.querySelectorAll('.gsap-reveal');
        
        if (elements.length > 0) {
            gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    start: "top 75%",
                    toggleActions: "play none none none"
                }
            })
            .fromTo(elements, 
                { y: 50, opacity: 0 }, 
                { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power2.out" }
            );
        }
    });
    
    // Trusted by section icons
    gsap.timeline({
        scrollTrigger: {
            trigger: '#trusted-by',
            start: 'top 75%'
        }
    })
    .fromTo('.trusted-icon', 
        { y: 30, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.15, ease: "back.out(1.7)" }
    );
    
    // Services cards
    gsap.timeline({
        scrollTrigger: {
            trigger: '#services',
            start: 'top 75%'
        }
    })
    .fromTo('.service-card', 
        { y: 50, opacity: 0, scale: 0.95 }, 
        { y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.1, ease: "back.out(1.7)" }
    );
    
    // Features section
    gsap.timeline({
        scrollTrigger: {
            trigger: '#features',
            start: 'top 75%'
        }
    })
    .fromTo('#features .gsap-reveal', 
        { y: 50, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power2.out" }
    );
    
    // Testimonials
    gsap.timeline({
        scrollTrigger: {
            trigger: '#testimonials',
            start: 'top 75%'
        }
    })
    .fromTo('.testimonial-slide', 
        { y: 30, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.2, ease: "power2.out" }
    );
    
    // Call to Action pulse animation
    const ctaButton = document.getElementById('cta-button');
    if (ctaButton) {
        gsap.timeline({ repeat: -1, repeatDelay: 3 })
            .to(ctaButton, { 
                scale: 1.05, 
                duration: 0.5, 
                ease: "power1.inOut" 
            })
            .to(ctaButton, { 
                scale: 1, 
                duration: 0.5, 
                ease: "power1.inOut" 
            });
    }
}

// Initialize text animations
function initTextAnimations() {
    // Hero title typing animation
    const heroTitle = document.getElementById('hero-title');
    
    if (heroTitle) {
        // Clear the text first
        heroTitle.textContent = '';
        
        gsap.to(heroTitle, {
            duration: 2,
            text: {
                value: "Boost Your Social Media Presence Instantly",
                delimiter: ""
            },
            ease: "none",
            delay: 0.8
        });
    }
}

// Initialize hover effects
function initHoverEffects() {
    // Service cards hover effect
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            gsap.to(this, { y: -10, duration: 0.3, ease: "power2.out" });
        });
        
        card.addEventListener('mouseleave', function() {
            gsap.to(this, { y: 0, duration: 0.3, ease: "power2.out" });
        });
    });
    
    // Menu items hover effect
    const menuItems = document.querySelectorAll('nav a:not(.bg-black):not(.bg-white)');
    
    menuItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            gsap.to(this, { y: -2, duration: 0.3, ease: "power2.out" });
        });
        
        item.addEventListener('mouseleave', function() {
            gsap.to(this, { y: 0, duration: 0.3, ease: "power2.out" });
        });
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