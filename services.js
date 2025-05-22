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
    initFAQAccordion();
    initBackToTop();
    initNewsletterForm();
    initTableAnimations();
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
    
    // Intro section animation
    gsap.timeline()
        .fromTo('#intro .gsap-reveal', 
            { y: 50, opacity: 0 }, 
            { y: 0, opacity: 1, duration: 0.8, ease: "power2.out", delay: 0.5 }
        );
    
    // Services table animation
    gsap.timeline({
        scrollTrigger: {
            trigger: '#services-table',
            start: 'top 75%'
        }
    })
    .fromTo('#services-table .gsap-reveal', 
        { y: 50, opacity: 0, scale: 0.95 }, 
        { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.7)" }
    );
    
    // Features section animation
    gsap.timeline({
        scrollTrigger: {
            trigger: '#features',
            start: 'top 75%'
        }
    })
    .fromTo('#features .gsap-reveal:first-child', 
        { y: 30, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" }
    )
    .fromTo('#features .gsap-reveal:not(:first-child)', 
        { y: 50, opacity: 0, scale: 0.95 }, 
        { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.1, ease: "back.out(1.7)" },
        "-=0.4"
    );
    
    // FAQ section animation
    gsap.timeline({
        scrollTrigger: {
            trigger: '#faq',
            start: 'top 75%'
        }
    })
    .fromTo('#faq .gsap-reveal:first-child', 
        { y: 30, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" }
    )
    .fromTo('#faq .gsap-reveal:not(:first-child)', 
        { y: 30, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out" },
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

// Initialize table animations
function initTableAnimations() {
    const serviceRows = document.querySelectorAll('.service-row');
    
    // Animate table rows on scroll
    gsap.timeline({
        scrollTrigger: {
            trigger: '#services-table',
            start: 'top 65%'
        }
    })
    .fromTo(serviceRows, 
        { x: -30, opacity: 0 }, 
        { x: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out" }
    );
    
    // Add hover animations for table rows
    serviceRows.forEach(row => {
        row.addEventListener('mouseenter', function() {
            gsap.to(this, {
                backgroundColor: "#f9fafb",
                scale: 1.02,
                duration: 0.3,
                ease: "power2.out"
            });
        });
        
        row.addEventListener('mouseleave', function() {
            gsap.to(this, {
                backgroundColor: "transparent",
                scale: 1,
                duration: 0.3,
                ease: "power2.out"
            });
        });
    });
}

// Initialize FAQ accordion
function initFAQAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const icon = item.querySelector('.faq-icon');
        
        question.addEventListener('click', function() {
            const isOpen = answer.classList.contains('block');
            
            if (isOpen) {
                // Close the current item
                answer.classList.remove('block');
                answer.classList.add('hidden');
                gsap.to(icon, { rotation: 0, duration: 0.3 });
                gsap.to(answer, { 
                    height: 0, 
                    opacity: 0, 
                    duration: 0.3,
                    ease: "power2.out"
                });
            } else {
                // Close all items first
                faqItems.forEach(otherItem => {
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    const otherIcon = otherItem.querySelector('.faq-icon');
                    
                    otherAnswer.classList.remove('block');
                    otherAnswer.classList.add('hidden');
                    gsap.to(otherIcon, { rotation: 0, duration: 0.3 });
                    gsap.to(otherAnswer, { 
                        height: 0, 
                        opacity: 0, 
                        duration: 0.3,
                        ease: "power2.out"
                    });
                });
                
                // Open the clicked item
                answer.classList.remove('hidden');
                answer.classList.add('block');
                gsap.to(icon, { rotation: 180, duration: 0.3 });
                gsap.fromTo(answer, 
                    { height: 0, opacity: 0 }, 
                    { 
                        height: 'auto', 
                        opacity: 1, 
                        duration: 0.3, 
                        ease: "power2.out"
                    }
                );
            }
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

// Add order button functionality
document.querySelectorAll('.order-btn').forEach(button => {
    button.addEventListener('click', function() {
        // Add a simple animation
        gsap.to(this, {
            scale: 0.95,
            duration: 0.1,
            yoyo: true,
            repeat: 1,
            ease: "power2.inOut"
        });
        
        // Here you would typically redirect to an order page or open a modal
        // For demo purposes, we'll just show an alert
        setTimeout(() => {
            alert('Order functionality would be implemented here. This would typically redirect to a checkout page or open an order modal.');
        }, 200);
    });
});

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