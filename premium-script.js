// Premium Portfolio JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Navigation functionality
    const navbar = document.querySelector('.navbar');
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
    });
    
    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Animated counters for hero stats
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        
        counters.forEach(counter => {
            const target = parseInt(counter.textContent.replace(/\D/g, ''));
            const suffix = counter.textContent.replace(/\d/g, '');
            let current = 0;
            const increment = target / 50;
            
            const updateCounter = () => {
                if (current < target) {
                    current += increment;
                    counter.textContent = Math.ceil(current) + suffix;
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target + suffix;
                }
            };
            
            updateCounter();
        });
    }
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Trigger counter animation for hero stats
                if (entry.target.classList.contains('hero-stats')) {
                    animateCounters();
                }
                
                // Animate skill bars
                if (entry.target.classList.contains('skills-grid')) {
                    animateSkillBars();
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.hero-content, .hero-visual, .section-header, .about-item, .skills-grid, .service-card, .portfolio-item, .contact-item, .contact-form, .hero-stats');
    animateElements.forEach(el => observer.observe(el));
    
    // Skill bar animations
    function animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        
        skillBars.forEach((bar, index) => {
            setTimeout(() => {
                const width = bar.getAttribute('data-width');
                bar.style.width = width;
            }, index * 200);
        });
    }
    
    // Floating cards animation
    function initFloatingCards() {
        const cards = document.querySelectorAll('.floating-card');
        
        cards.forEach((card, index) => {
            // Add random movement
            setInterval(() => {
                const randomX = (Math.random() - 0.5) * 20;
                const randomY = (Math.random() - 0.5) * 20;
                card.style.transform = `translate(${randomX}px, ${randomY}px)`;
            }, 3000 + index * 1000);
        });
    }
    
    // Button ripple effect
    function createRipple(event) {
        const button = event.currentTarget;
        const circle = document.createElement('span');
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const radius = diameter / 2;
        
        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
        circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
        circle.classList.add('ripple');
        
        const ripple = button.getElementsByClassName('ripple')[0];
        if (ripple) {
            ripple.remove();
        }
        
        button.appendChild(circle);
        
        setTimeout(() => {
            circle.remove();
        }, 600);
    }
    
    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', createRipple);
    });
    
    // Form handling
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            // Show loading state
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission
            setTimeout(() => {
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
                submitBtn.style.background = 'linear-gradient(135deg, #28a745, #20c997)';
                
                // Reset form
                setTimeout(() => {
                    contactForm.reset();
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                }, 2000);
            }, 2000);
        });
    }
    
    // Parallax effect for hero background
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.floating-card');
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.1 + (index * 0.05);
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
    
    // Portfolio image hover effects
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    portfolioItems.forEach(item => {
        const image = item.querySelector('.portfolio-image img');
        
        item.addEventListener('mouseenter', () => {
            image.style.transform = 'scale(1.05)';
        });
        
        item.addEventListener('mouseleave', () => {
            image.style.transform = 'scale(1)';
        });
    });
    
    // Service card hover effects
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Contact item hover effects
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateX(8px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateX(0) scale(1)';
        });
    });
    
    // Initialize floating cards
    initFloatingCards();
    
    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        .ripple {
            position: absolute;
            border-radius: 50%;
            background-color: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .animate-in {
            animation: fadeInUp 0.8s ease-out forwards;
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .hero-content > *,
        .hero-visual > * {
            opacity: 0;
            transform: translateY(30px);
            animation: fadeInUp 0.8s ease-out forwards;
        }
        
        .hero-content > *:nth-child(1) { animation-delay: 0.1s; }
        .hero-content > *:nth-child(2) { animation-delay: 0.2s; }
        .hero-content > *:nth-child(3) { animation-delay: 0.3s; }
        .hero-content > *:nth-child(4) { animation-delay: 0.4s; }
        .hero-content > *:nth-child(5) { animation-delay: 0.5s; }
        
        .service-card,
        .portfolio-item,
        .contact-item {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.3s ease;
        }
        
        .service-card.animate-in,
        .portfolio-item.animate-in,
        .contact-item.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .about-item {
            opacity: 0;
            transform: translateX(-30px);
            transition: all 0.6s ease;
        }
        
        .about-item.animate-in {
            opacity: 1;
            transform: translateX(0);
        }
        
        .floating-card {
            transition: transform 0.3s ease;
        }
        
        .skill-progress {
            position: relative;
            overflow: hidden;
        }
        
        .skill-progress::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
            animation: shimmer 2s infinite;
        }
        
        @keyframes shimmer {
            0% { left: -100%; }
            100% { left: 100%; }
        }
    `;
    document.head.appendChild(style);
    
    // Performance optimization: Throttle scroll events
    let ticking = false;
    
    function updateOnScroll() {
        // Navbar scroll effect
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        ticking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateOnScroll);
            ticking = true;
        }
    });
    
    console.log('Premium Portfolio loaded successfully! 🚀');
});
