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
    initTestimonials();
    initCounters();
    initServiceTabs();
    initParticlesBackground();
    initFAQAccordion();
    initBackToTop();
    initSpecialOfferModal();
    initTextAnimations();
    initHoverEffects();
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
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: "power2.out", delay: 0.5 }
    );
    
    // Animate the dashboard mockup
    gsap.fromTo('#hero .relative.bg-gradient-to-br', 
        { y: 50, opacity: 0, scale: 0.95 }, 
        { y: 0, opacity: 1, scale: 1, duration: 1, ease: "back.out(1.7)", delay: 1.2 }
    );
    
    // Add floating animation to the dashboard
    gsap.to('#hero .relative.bg-gradient-to-br', {
        y: -15,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });
    
    // Create scrolling animations for all sections
    gsap.utils.toArray('section').forEach(section => {
        const elements = section.querySelectorAll('.gsap-reveal');
        
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
    )
    .fromTo('.client-logo', 
        { y: 20, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.4, stagger: 0.1, ease: "power2.out" },
        "-=0.3"
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
    
    // Call to Action pulse animation
    const ctaButton = document.getElementById('cta-button');
    if (ctaButton) {
        // Subtle attention-grabbing animation
        gsap.timeline({ repeat: -1, repeatDelay: 3 })
            .to(ctaButton, { 
                scale: 1.05, 
                boxShadow: "0 20px 30px rgba(0,0,0,0.15)",
                duration: 0.5, 
                ease: "power1.inOut" 
            })
            .to(ctaButton, { 
                scale: 1, 
                boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
                duration: 0.5, 
                ease: "power1.inOut" 
            });
    }
    
    // Back to top button visibility
    const backToTop = document.getElementById('back-to-top');
    if (backToTop) {
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

// Initialize counters animation
function initCounters() {
    const counterUsers = document.getElementById('counter-users');
    const counterOrders = document.getElementById('counter-orders');
    const counterServices = document.getElementById('counter-services');
    const counterSupport = document.getElementById('counter-support');
    
    if (counterUsers && counterOrders && counterServices && counterSupport) {
        // Create counter animations
        gsap.timeline({
            scrollTrigger: {
                trigger: '#stats',
                start: 'top 75%',
                toggleActions: 'play none none none'
            }
        })
        .from(counterUsers, {
            innerText: 0,
            duration: 2,
            snap: { innerText: 1 },
            ease: "power2.out",
            onUpdate: function() {
                counterUsers.innerText = numberWithCommas(Math.floor(counterUsers.innerText));
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
        }, "-=1.8")
        .from(counterServices, {
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
            counterUsers.innerText = "25,000+";
            counterOrders.innerText = "1.5M+";
            counterServices.innerText = "250+";
            counterSupport.innerText = "<10";
        }, 2200);
    }
    
    // Helper function to format numbers with commas
    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
}

// Initialize service tabs
function initServiceTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            tabButtons.forEach(btn => {
                btn.classList.remove('active', 'bg-black', 'text-white');
            });
            
            // Add active class to clicked button
            this.classList.add('active', 'bg-black', 'text-white');
            
            // Get tab ID
            const tabId = this.getAttribute('data-tab');
            
            // You could filter the service cards here based on the tab
            // For this demo, we'll just add an animation effect
            gsap.fromTo('.service-card', 
                { y: 20, opacity: 0.5 }, 
                { y: 0, opacity: 1, duration: 0.4, stagger: 0.05, ease: "power2.out" }
            );
        });
    });
    
    // Set first tab as active
    if (tabButtons.length > 0) {
        tabButtons[0].classList.add('active', 'bg-black', 'text-white');
    }
}

// Initialize FAQ accordion
function initFAQAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const icon = item.querySelector('.faq-icon');
        
        question.addEventListener('click', function() {
            // Toggle the current item
            const isOpen = answer.classList.contains('block');
            
            if (isOpen) {
                // Close the current item
                answer.classList.remove('block');
                answer.classList.add('hidden');
                gsap.to(icon, { rotation: 0, duration: 0.3 });
            } else {
                // Close all items
                faqItems.forEach(otherItem => {
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    const otherIcon = otherItem.querySelector('.faq-icon');
                    
                    otherAnswer.classList.remove('block');
                    otherAnswer.classList.add('hidden');
                    gsap.to(otherIcon, { rotation: 0, duration: 0.3 });
                });
                
                // Open the clicked item
                answer.classList.remove('hidden');
                answer.classList.add('block');
                gsap.to(icon, { rotation: 180, duration: 0.3 });
                
                // Animate the answer
                gsap.fromTo(answer, 
                    { height: 0, opacity: 0 }, 
                    { height: 'auto', opacity: 1, duration: 0.3, ease: "power2.out" }
                );
            }
        });
    });
}

// Initialize text animations
function initTextAnimations() {
    // Typing animation for hero title
    const heroTitle = document.getElementById('hero-title');
    
    if (heroTitle) {
        gsap.to(heroTitle, {
            duration: 2,
            text: {
                value: "Boost Your Social Media Presence Instantly",
                delimiter: ""
            },
            ease: "none",
            delay: 0.5
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

// Initialize special offer modal
function initSpecialOfferModal() {
    const offerModal = document.getElementById('offer-modal');
    const closeModal = document.getElementById('close-modal');
    const copyCode = document.getElementById('copy-code');
    const applyNow = document.getElementById('apply-now');
    
    if (offerModal && closeModal) {
        // Show modal after 10 seconds
        setTimeout(() => {
            gsap.to(offerModal, { 
                opacity: 1, 
                visibility: 'visible', 
                duration: 0.3 
            });
        }, 10000);
        
        // Close modal
        closeModal.addEventListener('click', function() {
            gsap.to(offerModal, { 
                opacity: 0, 
                visibility: 'hidden', 
                duration: 0.3 
            });
        });
        
        // Copy code button
        if (copyCode) {
            copyCode.addEventListener('click', function() {
                const code = 'SMM20';
                navigator.clipboard.writeText(code).then(() => {
                    this.textContent = 'Copied!';
                    setTimeout(() => {
                        this.textContent = 'Copy Code';
                    }, 2000);
                });
            });
        }
        
        // Apply now button
        if (applyNow) {
            applyNow.addEventListener('click', function() {
                gsap.to(offerModal, { 
                    opacity: 0, 
                    visibility: 'hidden', 
                    duration: 0.3 
                });
                
                // Scroll to pricing section
                const pricingSection = document.getElementById('pricing');
                if (pricingSection) {
                    pricingSection.scrollIntoView({ behavior: 'smooth' });
                }
            });
        }
    }
}

// Initialize testimonials
function initTestimonials() {
    // For this demo, testimonials are static, but you could add slider functionality here
    gsap.fromTo('.testimonial-slide', 
        { opacity: 0, y: 20 }, 
        { 
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.2,
            scrollTrigger: {
                trigger: '#testimonials',
                start: 'top 75%'
            }
        }
    );
}

// Initialize particles background
function initParticlesBackground() {
    const particlesContainer = document.getElementById('particles-js');
    
    if (particlesContainer) {
        // Create canvas element
        const canvas = document.createElement('canvas');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        canvas.style.position = 'absolute';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.opacity = '0.2';
        canvas.style.pointerEvents = 'none';
        
        // Append canvas to container
        particlesContainer.appendChild(canvas);
        
        // Get canvas context
        const ctx = canvas.getContext('2d');
        
        // Create particles
        const particles = [];
        const particleCount = 50;
        
        // Create particles
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 3 + 1,
                color: 'white',
                velocity: {
                    x: (Math.random() - 0.5) * 0.5,
                    y: (Math.random() - 0.5) * 0.5
                }
            });
        }
        
        // Animation loop
        function animate() {
            requestAnimationFrame(animate);
            
            // Clear canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Update and draw particles
            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];
                
                // Draw particle
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.fill();
                
                // Update position
                p.x += p.velocity.x;
                p.y += p.velocity.y;
                
                // Boundary check
                if (p.x < 0 || p.x > canvas.width) p.velocity.x *= -1;
                if (p.y < 0 || p.y > canvas.height) p.velocity.y *= -1;
                
                // Draw connections
                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const distance = Math.sqrt(
                        Math.pow(p.x - p2.x, 2) + Math.pow(p.y - p2.y, 2)
                    );
                    
                    if (distance < 100) {
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.strokeStyle = `rgba(255, 255, 255, ${1 - distance / 100})`;
                        ctx.stroke();
                    }
                }
            }
        }
        
        // Start animation
        animate();
        
        // Resize canvas on window resize
        window.addEventListener('resize', function() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    }
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

// Form submission handlers
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const emailInput = form.querySelector('input[type="email"]');
        if (emailInput && emailInput.value) {
            // Show a success message
            const successMessage = document.createElement('p');
            successMessage.textContent = 'Thank you for subscribing!';
            successMessage.className = 'text-green-600 mt-2';
            
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
        }
    });
});