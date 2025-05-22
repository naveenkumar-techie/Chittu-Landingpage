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
    initContactForm();
    initFAQAccordion();
    initChatButton();
    initBackToTop();
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
    
    // Hero section animation
    gsap.timeline()
        .fromTo('#hero .gsap-reveal', 
            { y: 50, opacity: 0 }, 
            { y: 0, opacity: 1, duration: 0.8, ease: "power2.out", delay: 0.5 }
        );
    
    // Contact form section animation
    gsap.timeline({
        scrollTrigger: {
            trigger: '#contact-form',
            start: 'top 75%'
        }
    })
    .fromTo('#contact-form .gsap-reveal', 
        { x: -50, opacity: 0 }, 
        { x: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: "power2.out" }
    );
    
    // Map section animation
    gsap.timeline({
        scrollTrigger: {
            trigger: '#map',
            start: 'top 75%'
        }
    })
    .fromTo('#map .gsap-reveal:first-child', 
        { y: 30, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" }
    )
    .fromTo('#map .gsap-reveal:not(:first-child)', 
        { x: 50, opacity: 0 }, 
        { x: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: "power2.out" },
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

// Initialize contact form
function initContactForm() {
    const form = document.getElementById('contact-form-element');
    
    if (form) {
        // Form validation
        const inputs = form.querySelectorAll('input, textarea, select');
        
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                clearFieldError(this);
            });
        });
        
        // Form submission
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate all fields
            let isValid = true;
            inputs.forEach(input => {
                if (!validateField(input)) {
                    isValid = false;
                }
            });
            
            if (isValid) {
                submitForm(form);
            } else {
                // Scroll to first error
                const firstError = form.querySelector('.error');
                if (firstError) {
                    firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }
        });
    }
}

// Validate individual field
function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    let isValid = true;
    let errorMessage = '';
    
    // Clear previous errors
    clearFieldError(field);
    
    // Required field validation
    if (field.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = `${getFieldLabel(fieldName)} is required.`;
    }
    
    // Email validation
    if (fieldName === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address.';
        }
    }
    
    // Phone validation (if provided)
    if (fieldName === 'phone' && value) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        if (!phoneRegex.test(value.replace(/[\s\-\(\)]/g, ''))) {
            isValid = false;
            errorMessage = 'Please enter a valid phone number.';
        }
    }
    
    // Subject validation
    if (fieldName === 'subject' && field.tagName === 'SELECT' && !value) {
        isValid = false;
        errorMessage = 'Please select a subject.';
    }
    
    // Display error if validation failed
    if (!isValid) {
        showFieldError(field, errorMessage);
    }
    
    return isValid;
}

// Show field error
function showFieldError(field, message) {
    field.classList.add('error', 'border-red-500');
    
    // Create error message element
    const errorElement = document.createElement('p');
    errorElement.className = 'text-red-500 text-sm mt-1 error-message';
    errorElement.textContent = message;
    
    // Insert error message after field
    field.parentNode.insertBefore(errorElement, field.nextSibling);
}

// Clear field error
function clearFieldError(field) {
    field.classList.remove('error', 'border-red-500');
    
    // Remove error message
    const errorMessage = field.parentNode.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.remove();
    }
}

// Get user-friendly field label
function getFieldLabel(fieldName) {
    const labels = {
        'firstName': 'First Name',
        'lastName': 'Last Name',
        'email': 'Email Address',
        'phone': 'Phone Number',
        'subject': 'Subject',
        'message': 'Message'
    };
    
    return labels[fieldName] || fieldName;
}

// Submit form
function submitForm(form) {
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    // Show loading state
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    // Add loading animation
    gsap.to(submitButton, {
        scale: 0.98,
        duration: 0.1,
        yoyo: true,
        repeat: -1,
        ease: "power2.inOut"
    });
    
    // Simulate form submission
    setTimeout(() => {
        // Stop loading animation
        gsap.killTweensOf(submitButton);
        gsap.set(submitButton, { scale: 1 });
        
        // Show success message
        showSuccessMessage(form);
        
        // Reset form
        form.reset();
        
        // Reset button
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        
        // Animate success
        gsap.to(form, {
            y: -10,
            duration: 0.3,
            yoyo: true,
            repeat: 1,
            ease: "power2.inOut"
        });
        
    }, 2000);
}

// Show success message
function showSuccessMessage(form) {
    // Create success message
    const successDiv = document.createElement('div');
    successDiv.className = 'fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-500 text-white p-6 rounded-xl shadow-2xl z-50 max-w-md w-full mx-4';
    successDiv.innerHTML = `
        <div class="flex items-center mb-3">
            <i data-lucide="check-circle" class="w-6 h-6 mr-3"></i>
            <h3 class="text-lg font-bold">Message Sent Successfully!</h3>
        </div>
        <p class="text-sm opacity-90">Thank you for contacting us. We'll get back to you within 24 hours.</p>
    `;
    
    document.body.appendChild(successDiv);
    
    // Initialize icons
    lucide.createIcons();
    
    // Animate in
    gsap.fromTo(successDiv, 
        { scale: 0.8, opacity: 0 }, 
        { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(1.7)" }
    );
    
    // Remove after 4 seconds
    setTimeout(() => {
        gsap.to(successDiv, {
            scale: 0.8,
            opacity: 0,
            duration: 0.3,
            ease: "power2.inOut",
            onComplete: () => successDiv.remove()
        });
    }, 4000);
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

// Initialize chat button
function initChatButton() {
    const chatButton = document.getElementById('chat-now');
    
    if (chatButton) {
        chatButton.addEventListener('click', function() {
            // Add click animation
            gsap.to(this, {
                scale: 0.95,
                duration: 0.1,
                yoyo: true,
                repeat: 1,
                ease: "power2.inOut"
            });
            
            // Simulate opening chat
            setTimeout(() => {
                showChatWidget();
            }, 200);
        });
    }
}

// Show chat widget (simulation)
function showChatWidget() {
    // Create chat widget
    const chatWidget = document.createElement('div');
    chatWidget.className = 'fixed bottom-4 right-4 w-80 bg-white rounded-xl shadow-2xl border border-gray-200 z-50';
    chatWidget.innerHTML = `
        <div class="bg-black text-white p-4 rounded-t-xl flex justify-between items-center">
            <div class="flex items-center">
                <div class="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
                    <i data-lucide="message-circle" class="w-4 h-4"></i>
                </div>
                <div>
                    <h3 class="font-bold text-sm">Live Chat</h3>
                    <p class="text-xs opacity-75">We're online now</p>
                </div>
            </div>
            <button id="close-chat" class="text-white hover:text-gray-300">
                <i data-lucide="x" class="w-5 h-5"></i>
            </button>
        </div>
        <div class="p-4 h-64 bg-gray-50 overflow-y-auto">
            <div class="space-y-3">
                <div class="bg-white p-3 rounded-lg shadow-sm">
                    <p class="text-sm">👋 Hi! How can we help you today?</p>
                </div>
                <div class="bg-white p-3 rounded-lg shadow-sm">
                    <p class="text-sm">Our average response time is less than 2 minutes.</p>
                </div>
            </div>
        </div>
        <div class="p-4 border-t border-gray-200">
            <div class="flex space-x-2">
                <input type="text" placeholder="Type your message..." class="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black">
                <button class="bg-black text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-800 transition-colors">
                    <i data-lucide="send" class="w-4 h-4"></i>
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(chatWidget);
    
    // Initialize icons
    lucide.createIcons();
    
    // Animate in
    gsap.fromTo(chatWidget, 
        { y: 100, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.3, ease: "back.out(1.7)" }
    );
    
    // Close chat functionality
    document.getElementById('close-chat').addEventListener('click', function() {
        gsap.to(chatWidget, {
            y: 100,
            opacity: 0,
            duration: 0.3,
            ease: "power2.inOut",
            onComplete: () => chatWidget.remove()
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