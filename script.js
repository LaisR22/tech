
// Espera o DOM ser completamente carregado
document.addEventListener('DOMContentLoaded', function() {
    // ===== MENU MOBILE =====
    const btnMobile = document.getElementById('btn-mobile');
    const nav = document.getElementById('nav');
    
    function toggleMenu(event) {
        if (event.type === 'touchstart') event.preventDefault();
        nav.classList.toggle('active');
        const active = nav.classList.contains('active');
        event.currentTarget.setAttribute('aria-expanded', active);
        if (active) {
            event.currentTarget.setAttribute('aria-label', 'Fechar Menu');
        } else {
            event.currentTarget.setAttribute('aria-label', 'Abrir Menu');
        }
    }
    
    btnMobile.addEventListener('click', toggleMenu);
    btnMobile.addEventListener('touchstart', toggleMenu);
    
    // Fechar menu ao clicar em um link
    const menuLinks = document.querySelectorAll('#menu a');
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            btnMobile.setAttribute('aria-expanded', false);
            btnMobile.setAttribute('aria-label', 'Abrir Menu');
        });
    });
    
    // ===== HEADER SCROLL =====
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // ===== BACK TO TOP BUTTON =====
    const backToTopButton = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
    
    backToTopButton.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // ===== PORTFOLIO FILTER =====
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            portfolioItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 100);
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
    
    // ===== TESTIMONIALS SLIDER =====
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    const prevButton = document.getElementById('prev-testimonial');
    const nextButton = document.getElementById('next-testimonial');
    let currentTestimonial = 0;
    
    // Hide all testimonials except the first one
    testimonialItems.forEach((item, index) => {
        if (index !== 0) {
            item.style.display = 'none';
        }
    });
    
    function showTestimonial(index) {
        testimonialItems.forEach(item => {
            item.style.display = 'none';
            item.style.opacity = '0';
        });
        
        testimonialItems[index].style.display = 'block';
        setTimeout(() => {
            testimonialItems[index].style.opacity = '1';
        }, 100);
    }
    
    nextButton.addEventListener('click', function() {
        currentTestimonial++;
        if (currentTestimonial >= testimonialItems.length) {
            currentTestimonial = 0;
        }
        showTestimonial(currentTestimonial);
    });
    
    prevButton.addEventListener('click', function() {
        currentTestimonial--;
        if (currentTestimonial < 0) {
            currentTestimonial = testimonialItems.length - 1;
        }
        showTestimonial(currentTestimonial);
    });
    
    // Auto slide testimonials
    setInterval(() => {
        currentTestimonial++;
        if (currentTestimonial >= testimonialItems.length) {
            currentTestimonial = 0;
        }
        showTestimonial(currentTestimonial);
    }, 5000);
    
    // ===== FORM VALIDATION =====
    const contactForm = document.getElementById('contactForm');
    const newsletterForm = document.getElementById('newsletterForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple validation
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            if (name && email && subject && message) {
                // Simulate form submission
                const submitButton = contactForm.querySelector('button[type="submit"]');
                submitButton.innerHTML = 'Enviando...';
                submitButton.disabled = true;
                
                setTimeout(() => {
                    // Reset form
                    contactForm.reset();
                    
                    // Show success message
                    const successMessage = document.createElement('div');
                    successMessage.className = 'success-message';
                    successMessage.innerHTML = '<p>Mensagem enviada com sucesso! Entraremos em contato em breve.</p>';
                    contactForm.appendChild(successMessage);
                    
                    // Reset button
                    submitButton.innerHTML = 'Enviar Mensagem';
                    submitButton.disabled = false;
                    
                    // Remove success message after 5 seconds
                    setTimeout(() => {
                        successMessage.remove();
                    }, 5000);
                }, 1500);
            }
        });
    }
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('newsletter-email').value;
            
            if (email) {
                // Simulate form submission
                const submitButton = newsletterForm.querySelector('button[type="submit"]');
                submitButton.innerHTML = 'Enviando...';
                submitButton.disabled = true;
                
                setTimeout(() => {
                    // Reset form
                    newsletterForm.reset();
                    
                    // Show success message
                    const successMessage = document.createElement('div');
                    successMessage.className = 'success-message';
                    successMessage.innerHTML = '<p>Inscrição realizada com sucesso!</p>';
                    newsletterForm.appendChild(successMessage);
                    
                    // Reset button
                    submitButton.innerHTML = 'Inscrever';
                    submitButton.disabled = false;
                    
                    // Remove success message after 5 seconds
                    setTimeout(() => {
                        successMessage.remove();
                    }, 5000);
                }, 1500);
            }
        });
    }
    
    // ===== SMOOTH SCROLL =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = document.getElementById('header').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ===== ANIMATIONS ON SCROLL =====
    // Simple animation for sections
    const animateOnScroll = function() {
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (sectionTop < windowHeight * 0.75) {
                section.classList.add('animate');
            }
        });
    };
    
    // Initial check
    animateOnScroll();
    
    // Check on scroll
    window.addEventListener('scroll', animateOnScroll);
});
