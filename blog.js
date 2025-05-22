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
    initCategoryFilters();
    initLoadMore();
    initNewsletterForm();
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
    
    // Categories section animation
    gsap.timeline({
        scrollTrigger: {
            trigger: '#categories',
            start: 'top 85%'
        }
    })
    .fromTo('#categories .gsap-reveal', 
        { y: 30, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" }
    );
    
    // Blog grid animation
    gsap.timeline({
        scrollTrigger: {
            trigger: '#blog-grid',
            start: 'top 75%'
        }
    })
    .fromTo('.blog-card', 
        { y: 50, opacity: 0, scale: 0.95 }, 
        { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.1, ease: "back.out(1.7)" }
    );
    
    // Newsletter section animation
    gsap.timeline({
        scrollTrigger: {
            trigger: '#newsletter',
            start: 'top 75%'
        }
    })
    .fromTo('#newsletter .gsap-reveal', 
        { y: 50, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
    );
}

// Initialize category filters
function initCategoryFilters() {
    const categoryTags = document.querySelectorAll('.category-tag');
    const blogCards = document.querySelectorAll('.blog-card');
    
    categoryTags.forEach(tag => {
        tag.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Update active tag
            categoryTags.forEach(t => {
                t.classList.remove('active', 'bg-black', 'text-white');
                t.classList.add('bg-gray-100', 'text-gray-600');
            });
            
            this.classList.remove('bg-gray-100', 'text-gray-600');
            this.classList.add('active', 'bg-black', 'text-white');
            
            // Filter blog cards
            blogCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                
                if (category === 'all' || cardCategory === category) {
                    // Show card
                    gsap.to(card, {
                        opacity: 1,
                        scale: 1,
                        duration: 0.3,
                        ease: "power2.out",
                        onComplete: function() {
                            card.style.display = 'block';
                        }
                    });
                } else {
                    // Hide card
                    gsap.to(card, {
                        opacity: 0,
                        scale: 0.95,
                        duration: 0.3,
                        ease: "power2.out",
                        onComplete: function() {
                            card.style.display = 'none';
                        }
                    });
                }
            });
            
            // Animate visible cards
            setTimeout(() => {
                const visibleCards = Array.from(blogCards).filter(card => 
                    category === 'all' || card.getAttribute('data-category') === category
                );
                
                gsap.fromTo(visibleCards, 
                    { y: 20, opacity: 0 }, 
                    { y: 0, opacity: 1, duration: 0.4, stagger: 0.05, ease: "power2.out" }
                );
            }, 300);
        });
    });
}

// Initialize load more functionality
function initLoadMore() {
    const loadMoreBtn = document.getElementById('load-more');
    const blogContainer = document.getElementById('blog-container');
    
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            // Add loading state
            const originalText = this.textContent;
            this.textContent = 'Loading...';
            this.disabled = true;
            
            // Simulate loading
            setTimeout(() => {
                // Create additional blog posts (demo data)
                const additionalPosts = createAdditionalBlogPosts();
                
                // Add new posts to container
                additionalPosts.forEach(post => {
                    blogContainer.appendChild(post);
                });
                
                // Animate new posts
                gsap.fromTo(additionalPosts, 
                    { y: 50, opacity: 0, scale: 0.95 }, 
                    { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.1, ease: "back.out(1.7)" }
                );
                
                // Reset button
                this.textContent = originalText;
                this.disabled = false;
                
                // Hide button after loading more (simulate end of content)
                gsap.to(this.parentElement, {
                    opacity: 0,
                    height: 0,
                    duration: 0.5,
                    delay: 2,
                    ease: "power2.out"
                });
            }, 1500);
        });
    }
}

// Create additional blog posts for load more functionality
function createAdditionalBlogPosts() {
    const posts = [
        {
            category: 'tips',
            categoryColor: 'black',
            image: 'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            date: 'May 3, 2025',
            readTime: '7 min read',
            title: 'Content Creation Strategies That Actually Work',
            excerpt: 'Discover proven content creation methods that drive engagement and build authentic connections with your audience...',
            author: 'Lisa Wong',
            authorImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=50&q=80'
        },
        {
            category: 'platform-news',
            categoryColor: 'blue-600',
            image: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            date: 'May 1, 2025',
            readTime: '5 min read',
            title: 'LinkedIn Introduces New Business Features for 2025',
            excerpt: 'Explore the latest LinkedIn updates and how they can benefit your professional networking and business growth...',
            author: 'Tom Anderson',
            authorImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=50&q=80'
        },
        {
            category: 'industry',
            categoryColor: 'purple-600',
            image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            date: 'April 28, 2025',
            readTime: '9 min read',
            title: 'The Future of Social Commerce: What to Expect',
            excerpt: 'Learn about emerging trends in social commerce and how to prepare your business for the next wave of social selling...',
            author: 'Rachel Green',
            authorImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=50&q=80'
        }
    ];
    
    return posts.map(post => {
        const article = document.createElement('article');
        article.className = 'blog-card bg-white rounded-2xl overflow-hidden shadow-lg gsap-reveal';
        article.setAttribute('data-category', post.category);
        
        article.innerHTML = `
            <div class="relative overflow-hidden h-60">
                <img src="${post.image}" alt="${post.title}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110">
                <div class="absolute top-4 left-4 bg-${post.categoryColor} text-white text-xs px-3 py-1 rounded-full font-medium">
                    ${post.category.charAt(0).toUpperCase() + post.category.slice(1).replace('-', ' ')}
                </div>
            </div>
            <div class="p-6">
                <div class="flex items-center text-sm text-gray-500 mb-3">
                    <i data-lucide="calendar" class="w-4 h-4 mr-2"></i>
                    ${post.date}
                    <span class="mx-2">•</span>
                    <span>${post.readTime}</span>
                </div>
                <h3 class="text-xl font-bold mb-3 line-clamp-2">${post.title}</h3>
                <p class="text-gray-600 mb-4 line-clamp-3">${post.excerpt}</p>
                <div class="flex items-center justify-between">
                    <div class="flex items-center">
                        <img src="${post.authorImage}" alt="${post.author}" class="w-8 h-8 rounded-full mr-2">
                        <span class="text-sm text-gray-600">${post.author}</span>
                    </div>
                    <a href="#" class="inline-flex items-center font-medium text-black hover:text-gray-600 transition-colors group">
                        <span>Read More</span>
                        <i data-lucide="arrow-right" class="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1"></i>
                    </a>
                </div>
            </div>
        `;
        
        return article;
    });
}

// Initialize newsletter form
function initNewsletterForm() {
    const form = document.getElementById('newsletter-signup');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = form.querySelector('input[type="email"]');
            const submitBtn = form.querySelector('button[type="submit"]');
            
            if (emailInput && emailInput.value) {
                // Add loading state
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Subscribing...';
                submitBtn.disabled = true;
                
                // Simulate API call
                setTimeout(() => {
                    // Show success message
                    const successMessage = document.createElement('div');
                    successMessage.className = 'mt-4 p-4 bg-green-500/20 border border-green-500/30 rounded-xl text-center';
                    successMessage.innerHTML = `
                        <div class="flex items-center justify-center mb-2">
                            <i data-lucide="check-circle" class="w-5 h-5 text-green-400 mr-2"></i>
                            <span class="text-green-400 font-medium">Successfully subscribed!</span>
                        </div>
                        <p class="text-sm text-gray-300">Thank you for joining our newsletter. You'll receive our latest updates soon.</p>
                    `;
                    
                    // Remove any existing message
                    const existingMessage = form.querySelector('.mt-4');
                    if (existingMessage) {
                        existingMessage.remove();
                    }
                    
                    form.appendChild(successMessage);
                    
                    // Clear the input
                    emailInput.value = '';
                    
                    // Reset button
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    
                    // Initialize icons for the new success message
                    lucide.createIcons();
                    
                    // Animate success message
                    gsap.from(successMessage, {
                        y: -20,
                        opacity: 0,
                        duration: 0.5,
                        ease: "power2.out"
                    });
                    
                    // Remove message after 5 seconds
                    setTimeout(() => {
                        if (successMessage.parentNode) {
                            gsap.to(successMessage, {
                                opacity: 0,
                                y: -20,
                                duration: 0.3,
                                ease: "power2.out",
                                onComplete: () => successMessage.remove()
                            });
                        }
                    }, 5000);
                }, 1500);
            }
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

// Add hover effects for blog cards
document.querySelectorAll('.blog-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        gsap.to(this, {
            y: -8,
            boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
            duration: 0.3,
            ease: "power2.out"
        });
    });
    
    card.addEventListener('mouseleave', function() {
        gsap.to(this, {
            y: 0,
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
            duration: 0.3,
            ease: "power2.out"
        });
    });
});

// Add click handlers for read more links
document.querySelectorAll('.blog-card a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Add click animation
        gsap.to(this, {
            scale: 0.95,
            duration: 0.1,
            yoyo: true,
            repeat: 1,
            ease: "power2.inOut"
        });
        
        // Here you would typically navigate to the full blog post
        setTimeout(() => {
            alert('This would navigate to the full blog post. In a real implementation, this would link to individual blog post pages.');
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

// Add CSS for fade-in animation and line clamp
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
    
    .line-clamp-2 {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }
    
    .line-clamp-3 {
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }
`;
document.head.appendChild(style);