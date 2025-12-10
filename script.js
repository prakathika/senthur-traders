// Hero Carousel Functionality
document.addEventListener('DOMContentLoaded', () => {
    const heroSlides = document.querySelectorAll('.hero-slide');
    const heroPrevBtn = document.querySelector('.hero-prev');
    const heroNextBtn = document.querySelector('.hero-next');
    const heroIndicators = document.querySelectorAll('.hero-indicator');
    
    let currentHeroSlide = 0;
    
    // Auto-slide every 6 seconds
    let heroAutoSlide = setInterval(() => {
        moveToHeroSlide(currentHeroSlide + 1);
    }, 6000);
    
    const resetHeroAutoSlide = () => {
        clearInterval(heroAutoSlide);
        heroAutoSlide = setInterval(() => {
            moveToHeroSlide(currentHeroSlide + 1);
        }, 6000);
    };
    
    const moveToHeroSlide = (targetIndex) => {
        if (targetIndex >= heroSlides.length) {
            currentHeroSlide = 0;
        } else if (targetIndex < 0) {
            currentHeroSlide = heroSlides.length - 1;
        } else {
            currentHeroSlide = targetIndex;
        }
        
        // Remove active class from all slides
        heroSlides.forEach(slide => slide.classList.remove('active'));
        heroIndicators.forEach(ind => ind.classList.remove('active'));
        
        // Add active class to current slide
        heroSlides[currentHeroSlide].classList.add('active');
        heroIndicators[currentHeroSlide].classList.add('active');
    };
    
    // Next button
    heroNextBtn.addEventListener('click', () => {
        moveToHeroSlide(currentHeroSlide + 1);
        resetHeroAutoSlide();
    });
    
    // Previous button
    heroPrevBtn.addEventListener('click', () => {
        moveToHeroSlide(currentHeroSlide - 1);
        resetHeroAutoSlide();
    });
    
    // Indicators
    heroIndicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            moveToHeroSlide(index);
            resetHeroAutoSlide();
        });
    });
    
    // Touch swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    const heroCarousel = document.querySelector('.hero-carousel');
    
    heroCarousel.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    heroCarousel.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        if (touchStartX - touchEndX > 50) {
            moveToHeroSlide(currentHeroSlide + 1);
            resetHeroAutoSlide();
        } else if (touchEndX - touchStartX > 50) {
            moveToHeroSlide(currentHeroSlide - 1);
            resetHeroAutoSlide();
        }
    });
});

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-menu li a');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animate hamburger
    const spans = hamburger.querySelectorAll('span');
    if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// Carousel Functionality
document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.carousel-track');
    const slides = Array.from(track.children);
    const nextButton = document.querySelector('.next-btn');
    const prevButton = document.querySelector('.prev-btn');
    const indicators = document.querySelectorAll('.indicator');
    
    let currentSlide = 0;
    const slideWidth = slides[0].getBoundingClientRect().width;
    
    // Auto-slide every 5 seconds
    let autoSlide = setInterval(() => {
        moveToSlide(currentSlide + 1);
    }, 5000);
    
    // Reset auto-slide on manual interaction
    const resetAutoSlide = () => {
        clearInterval(autoSlide);
        autoSlide = setInterval(() => {
            moveToSlide(currentSlide + 1);
        }, 5000);
    };
    
    const moveToSlide = (targetIndex) => {
        if (targetIndex >= slides.length) {
            currentSlide = 0;
        } else if (targetIndex < 0) {
            currentSlide = slides.length - 1;
        } else {
            currentSlide = targetIndex;
        }
        
        track.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        // Update indicators
        indicators.forEach(ind => ind.classList.remove('active'));
        indicators[currentSlide].classList.add('active');
    };
    
    // Next button
    nextButton.addEventListener('click', () => {
        moveToSlide(currentSlide + 1);
        resetAutoSlide();
    });
    
    // Previous button
    prevButton.addEventListener('click', () => {
        moveToSlide(currentSlide - 1);
        resetAutoSlide();
    });
    
    // Indicators
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            moveToSlide(index);
            resetAutoSlide();
        });
    });
    
    // Touch swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    track.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    track.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        if (touchStartX - touchEndX > 50) {
            moveToSlide(currentSlide + 1);
            resetAutoSlide();
        } else if (touchEndX - touchStartX > 50) {
            moveToSlide(currentSlide - 1);
            resetAutoSlide();
        }
    });
});

// Portfolio Filter Functionality
document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            portfolioItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filterValue === 'all' || category === filterValue) {
                    item.style.display = 'block';
                    // Add fade-in animation
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Initial animation for portfolio items
    portfolioItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'all 0.5s ease';
        
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, index * 100);
    });
});

// Load More Button Functionality
const loadMoreBtn = document.querySelector('.load-more-btn');
if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => {
        alert('More projects coming soon! Contact us to see our full portfolio.');
    });
}

// Scroll to Top Button
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('show');
    } else {
        scrollTopBtn.classList.remove('show');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Smooth Scrolling for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '#branches') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.offsetTop;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Header Scroll Effect
const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
    } else {
        header.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
    }
    
    lastScroll = currentScroll;
});

// Contact Form Submission
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const service = document.getElementById('service').value;
    const message = document.getElementById('message').value;
    
    // Get service text
    const serviceSelect = document.getElementById('service');
    const serviceText = serviceSelect.options[serviceSelect.selectedIndex].text;
    
    // Create WhatsApp message
    let whatsappMessage = `*New Inquiry from Website*%0A%0A`;
    whatsappMessage += `*Name:* ${encodeURIComponent(name)}%0A`;
    whatsappMessage += `*Phone:* ${encodeURIComponent(phone)}%0A`;
    if (email) {
        whatsappMessage += `*Email:* ${encodeURIComponent(email)}%0A`;
    }
    whatsappMessage += `*Service:* ${encodeURIComponent(serviceText)}%0A`;
    if (message) {
        whatsappMessage += `*Message:* ${encodeURIComponent(message)}`;
    }
    
    // Open WhatsApp with pre-filled message
    const whatsappUrl = `https://wa.me/919788833331?text=${whatsappMessage}`;
    window.open(whatsappUrl, '_blank');
    
    // Show success message
    alert('Thank you! Your message will be sent via WhatsApp. Please complete the message in WhatsApp.');
    
    // Reset form
    contactForm.reset();
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe service cards, design cards, and why-items
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.service-card, .design-card, .why-item, .contact-item');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });
});

// Phone number click tracking (optional analytics)
document.querySelectorAll('a[href^="tel:"]').forEach(telLink => {
    telLink.addEventListener('click', () => {
        console.log('Phone call initiated');
        // You can add analytics tracking here if needed
    });
});

// Email click tracking (optional analytics)
document.querySelectorAll('a[href^="mailto:"]').forEach(emailLink => {
    emailLink.addEventListener('click', () => {
        console.log('Email link clicked');
        // You can add analytics tracking here if needed
    });
});

// Branches dropdown for mobile
if (window.innerWidth <= 768) {
    const branchesLink = document.querySelector('.branches-link');
    const branchesMenu = document.querySelector('.branches-menu');
    
    if (branchesLink && branchesMenu) {
        branchesLink.addEventListener('click', (e) => {
            if (!e.target.closest('a[href^="https://"]')) {
                e.preventDefault();
                branchesMenu.style.display = branchesMenu.style.display === 'block' ? 'none' : 'block';
            }
        });
    }
}

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s';
        document.body.style.opacity = '1';
    }, 100);
});

// Dynamic year in footer
const currentYear = new Date().getFullYear();
const footerText = document.querySelector('.footer-bottom p');
if (footerText) {
    footerText.innerHTML = `&copy; ${currentYear} Senthur Traders. All rights reserved.`;
}

// Prevent form submission on enter key except in textarea
contactForm.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') {
        e.preventDefault();
    }
});

// Add active state to navigation based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-menu a[href="#${sectionId}"]`);

        if (navLink && scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-menu a').forEach(link => {
                link.style.color = '';
            });
            navLink.style.color = 'var(--primary-color)';
        }
    });
});

// Console welcome message
console.log('%c Welcome to Senthur Traders! ', 'background: #1a7a6e; color: white; font-size: 20px; padding: 10px;');
console.log('%c Professional False Ceiling Solutions ', 'background: #2d9687; color: white; font-size: 14px; padding: 5px;');
