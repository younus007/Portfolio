// Modern Portfolio JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed header
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Navbar background on scroll
    const navbar = document.querySelector('.navbar-modern');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.boxShadow = 'none';
            }
        });
    }
    
    // Animate skill progress bars when they come into view
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const skillObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBars = entry.target.querySelectorAll('.skill-progress');
                progressBars.forEach(bar => {
                    const width = bar.getAttribute('data-width');
                    if (width) {
                        setTimeout(() => {
                            bar.style.width = width;
                        }, 200);
                    }
                });
            }
        });
    }, observerOptions);
    
    const skillsSection = document.querySelector('.skills-section');
    if (skillsSection) {
        skillObserver.observe(skillsSection);
    }
    
    // Form submission handling with Google Sheets integration
    const form = document.querySelector('form[name="submitToGoogleSheet"]');
    const msg = document.getElementById('msg');

    // Google Sheets Web App URL (you need to replace this with your actual Google Sheets Web App URL)
    const scriptURL = 'YOUR_GOOGLE_SHEETS_WEB_APP_URL_HERE';

    if (form && msg) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            // Show loading state
            const submitBtn = form.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span>Sending...</span><i class="fas fa-spinner fa-spin"></i>';
            submitBtn.disabled = true;

            // Create FormData object
            const formData = new FormData(form);

            // Add timestamp
            formData.append('TIMESTAMP', new Date().toLocaleString());

            // Submit to Google Sheets (if URL is configured)
            if (scriptURL !== 'YOUR_GOOGLE_SHEETS_WEB_APP_URL_HERE') {
                fetch(scriptURL, {
                    method: 'POST',
                    body: formData
                })
                .then(response => {
                    msg.innerHTML = '<div style="color: #10b981; background: #d1fae5; padding: 1rem; border-radius: 8px; border: 1px solid #10b981;">✅ Message sent successfully! I\'ll get back to you soon.</div>';
                    form.reset();
                })
                .catch(error => {
                    console.error('Error!', error.message);
                    msg.innerHTML = '<div style="color: #ef4444; background: #fee2e2; padding: 1rem; border-radius: 8px; border: 1px solid #ef4444;">❌ Something went wrong. Please try again or email me directly.</div>';
                })
                .finally(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;

                    // Clear message after 5 seconds
                    setTimeout(() => {
                        msg.innerHTML = '';
                    }, 5000);
                });
            } else {
                // Fallback for demo purposes
                setTimeout(() => {
                    msg.innerHTML = '<div style="color: #f59e0b; background: #fef3c7; padding: 1rem; border-radius: 8px; border: 1px solid #f59e0b;">⚠️ Form is in demo mode. Please configure Google Sheets integration or email me directly at cyounus212@gmail.com</div>';
                    form.reset();
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;

                    // Clear message after 8 seconds
                    setTimeout(() => {
                        msg.innerHTML = '';
                    }, 8000);
                }, 1500);
            }
        });
    }
    
    // Add active class to current navigation item
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    function updateActiveNav() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNav);
    
    // Typing animation for hero subtitle (optional enhancement)
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        const text = heroSubtitle.textContent;
        heroSubtitle.textContent = '';
        let i = 0;
        
        function typeWriter() {
            if (i < text.length) {
                heroSubtitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }
        
        // Start typing animation after a short delay
        setTimeout(typeWriter, 1000);
    }
    
    // Add scroll reveal animations
    const revealElements = document.querySelectorAll('.project-card, .cert-item, .timeline-item, .skill-category');
    
    const revealObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        revealObserver.observe(el);
    });

    // Modern Hover Effects with JavaScript

    // Add magnetic effect to buttons
    const magneticElements = document.querySelectorAll('.btn-primary, .btn-secondary');

    magneticElements.forEach(element => {
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            element.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px) scale(1.02)`;
        });

        element.addEventListener('mouseleave', () => {
            element.style.transform = 'translate(0px, 0px) scale(1)';
        });
    });

    // Add parallax effect to hero section
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            heroSection.style.transform = `translateY(${rate}px)`;
        });
    }

    // Add tilt effect to project cards
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
        });
    });

    // Add floating animation to skill categories
    const skillCategories = document.querySelectorAll('.skill-category');

    skillCategories.forEach((category, index) => {
        category.style.animation = `float 3s ease-in-out infinite`;
        category.style.animationDelay = `${index * 0.2}s`;
    });

    // Add ripple effect to clickable elements
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
    }

    const rippleButtons = document.querySelectorAll('.btn-primary, .btn-secondary, .tag');
    rippleButtons.forEach(button => {
        button.addEventListener('click', createRipple);
    });
});

// Add CSS for active nav link and modern effects
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: hsl(210, 100%, 56%) !important;
    }

    .nav-link.active::after {
        width: 100% !important;
    }

    .hamburger.active .bar:nth-child(2) {
        opacity: 0;
    }

    .hamburger.active .bar:nth-child(1) {
        transform: translateY(7px) rotate(45deg);
    }

    .hamburger.active .bar:nth-child(3) {
        transform: translateY(-7px) rotate(-45deg);
    }

    /* Modern Cursor Effects */
    .btn-primary, .btn-secondary, .project-card, .cert-item, .skill-category {
        cursor: pointer;
        will-change: transform;
    }

    /* Smooth Transitions for All Interactive Elements */
    * {
        transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    }

    /* Enhanced Focus States */
    .btn-primary:focus,
    .btn-secondary:focus {
        outline: 2px solid #3b82f6;
        outline-offset: 2px;
        box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.2);
    }

    /* Loading Animation for Images */
    .profile-image {
        transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .profile-image:hover {
        filter: brightness(1.1) contrast(1.1);
    }
`;
document.head.appendChild(style);
