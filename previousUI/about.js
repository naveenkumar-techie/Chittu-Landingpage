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
    initCounters();
    initBackToTop();
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
        { y: 0, opacity: 1, duration: 0.8, ease: "power2.out", delay: 0.5 }
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
    
    // Special animation for values cards
    gsap.timeline({
        scrollTrigger: {
            trigger: '.grid.md\\:grid-cols-2.lg\\:grid-cols-3',
            start: 'top 75%'
        }
    })
    .fromTo('.grid.md\\:grid-cols-2.lg\\:grid-cols-3 .gsap-reveal', 
        { y: 50, opacity: 0, scale: 0.95 }, 
        { y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.1, ease: "back.out(1.7)" }
    );
    
    // Team members animation
    gsap.timeline({
        scrollTrigger: {
            trigger: '.grid.md\\:grid-cols-2.lg\\:grid-cols-4',
            start: 'top 75%'
        }
    })
    .fromTo('.grid.md\\:grid-cols-2.lg\\:grid-cols-4 .gsap-reveal', 
        { y: 50, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power2.out" }
    );
}

// Initialize counters animation
function initCounters() {
    const counterOrders = document.getElementById('counter-orders');
    const counterCountries = document.getElementById('counter-countries');
    const counterSuccess = document.getElementById('counter-success');
    const counterSupport = document.getElementById('counter-support');
    
    if (counterOrders && counterCountries && counterSuccess && counterSupport) {
        // Create counter animations
        gsap.timeline({
            scrollTrigger: {
                trigger: '.grid.grid-cols-2.lg\\:grid-cols-4',
                start: 'top 75%',
                toggleActions: 'play none none none'
            }
        })
        .from(counterOrders, {
            innerText: 0,
            duration: 2,
            snap: { innerText: 1 },
            ease: "power2.out",
            onUpdate: function() {
                counterOrders.innerText = numberWithCommas(Math.floor(counterOrders.innerText));
            }
        })
        .from(counterCountries, {
            innerText: 0,
            duration: 2,
            snap: { innerText: 1 },
            ease: "power2.out"
        }, "-=1.8")
        .from(counterSuccess, {
            innerText: 0,
            duration: 2,
            snap: { innerText: 1 },
            ease: "power2.out"
        }, "-=1.8")
        .from(counterSupport, {
            innerText: 0,
            duration: 2,
            snap: { innerText: 1 },
            ease: "power2.out"
        }, "-=1.8");
        
        // Set final values for counters
        setTimeout(() => {
            counterOrders.innerText = "1.5M+";
            counterCountries.innerText = "50+";
            counterSuccess.innerText = "99%";
            counterSupport.innerText = "<10";
        }, 2200);
    }
    
    // Helper function to format numbers with commas
    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
}

// Initialize hover effects
function initHoverEffects() {
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
    
    // Values cards hover effect
    const valueCards = document.querySelectorAll('.hover\\:-translate-y-2');
    
    valueCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            gsap.to(this, { 
                y: -10, 
                boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
                duration: 0.3, 
                ease: "power2.out" 
            });
        });
        
        card.addEventListener('mouseleave', function() {
            gsap.to(this, { 
                y: 0, 
                boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
                duration: 0.3, 
                ease: "power2.out" 
            });
        });
    });
    
    // Team member hover effects
    const teamMembers = document.querySelectorAll('.group');
    
    teamMembers.forEach(member => {
        const image = member.querySelector('img');
        const overlay = member.querySelector('.absolute.inset-0');
        
        member.addEventListener('mouseenter', function() {
            if (image) {
                gsap.to(image, { scale: 1.1, duration: 0.3, ease: "power2.out" });
            }
            if (overlay) {
                gsap.to(overlay, { opacity: 1, duration: 0.3 });
            }
        });
        
        member.addEventListener('mouseleave', function() {
            if (image) {
                gsap.to(image, { scale: 1, duration: 0.3, ease: "power2.out" });
            }
            if (overlay) {
                gsap.to(overlay, { opacity: 0.2, duration: 0.3 });
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
                gsap.to(backToTop, { opacity: 1, visibility: 'visible', duration: 0.3 });
            } else {
                gsap.to(backToTop, { opacity: 0, visibility: 'hidden', duration: 0.3 });
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
    const newsletterForm = document.getElementById('newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const submitButton = this.querySelector('button[type="submit"]');
            
            if (emailInput && emailInput.value) {
                // Store original button text
                const originalText = submitButton.textContent;
                
                // Show loading state
                submitButton.textContent = 'Subscribing...';
                submitButton.disabled = true;
                
                // Simulate API call
                setTimeout(() => {
                    // Show success message
                    submitButton.textContent = 'Subscribed!';
                    submitButton.classList.remove('bg-black', 'hover:bg-gray-800');
                    submitButton.classList.add('bg-green-500');
                    
                    // Clear the input
                    emailInput.value = '';
                    
                    // Reset button after 3 seconds
                    setTimeout(() => {
                        submitButton.textContent = originalText;
                        submitButton.disabled = false;
                        submitButton.classList.remove('bg-green-500');
                        submitButton.classList.add('bg-black', 'hover:bg-gray-800');
                    }, 3000);
                }, 1000);
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

// Add page loading animation
window.addEventListener('load', function() {
    // Hide any loading spinner or show page content
    document.body.style.opacity = '1';
    
    // Initial navbar state
    const navbar = document.getElementById('navbar');
    if (navbar) {
        navbar.classList.add('top-8');
    }
});