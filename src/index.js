import './styles.css';
import sunny1 from './images/sunny1.jpeg';
import sunny2 from './images/sunny2.jpeg';

// Lazy load portfolio images only when needed
const loadPortfolioImages = async () => {
    const designs = await Promise.all([
        import('./images/design1.jpeg'),
        import('./images/design2.jpeg'),
        import('./images/design3.jpeg'),
        import('./images/design4.jpeg'),
        import('./images/design5.jpeg'),
        import('./images/glitterClean.jpg')
    ]).then(modules => modules.map(m => m.default));
    return designs;
};

// Set the image source
document.addEventListener('DOMContentLoaded', () => {
    const heroImage = document.querySelector('.hero-image');
    if (heroImage) {
        heroImage.src = sunny1;
    }
    const aboutImage = document.querySelector('.about-image img');
    if (aboutImage) {
        aboutImage.src = sunny2;
    }
    
    // Lazy load portfolio images
    const portfolioImages = document.querySelectorAll('.portfolio-image');
    if (portfolioImages.length > 0) {
        loadPortfolioImages().then(designs => {
            portfolioImages.forEach((img, index) => {
                if (index < designs.length) {
                    img.src = designs[index];
                }
            });
        });
    }
});

 // Mobile Navigation Toggle
        const burger = document.querySelector('.burger');
        const navLinks = document.querySelector('.nav-links');
        
        burger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            burger.classList.toggle('toggle');
        });
        
        // Close mobile menu when clicking a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                burger.classList.remove('toggle');
            });
        });
        
        // Header scroll effect
        window.addEventListener('scroll', () => {
            const header = document.querySelector('header');
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
        
        // Portfolio filtering
        const filterBtns = document.querySelectorAll('.filter-btn');
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Update active button
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                const filter = btn.getAttribute('data-filter');
                
                // Filter items
                portfolioItems.forEach(item => {
                    if (filter === 'all' || item.getAttribute('data-category') === filter) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, 100);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 400);
                    }
                });
            });
        });
        
        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if(targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if(targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });
        
        // Form submission
        const contactForm = document.getElementById('contactForm');
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const formData = {
                name: e.target.name.value,
                email: e.target.email.value,
                subject: e.target.subject.value,
                message: e.target.message.value
            };
            // send formDate to backend
            try {
                const response = await fetch(('http://localhost:5000/api/contact/send'), {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });
                const result = await response.json();
                if(result.success) {
                    alert('Message sent successfully!');
                    e.target.reset();
                } else {
                    alert('Error sending message. Please try again later.');
                }
            } catch (error) {
                alert('Error connecting to server. Please try again later.');
            }
        
        });
        
        // Initialize animations on scroll
        const animateElements = document.querySelectorAll('.animate');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = 1;
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });
        
        animateElements.forEach(element => {
            element.style.opacity = 0;
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(element);
        });