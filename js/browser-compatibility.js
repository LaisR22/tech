

// Polyfill para o método forEach em NodeList para navegadores antigos
if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = Array.prototype.forEach;
}

// Polyfill para o método closest para navegadores antigos
if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
}

if (!Element.prototype.closest) {
    Element.prototype.closest = function(s) {
        var el = this;
        do {
            if (el.matches(s)) return el;
            el = el.parentElement || el.parentNode;
        } while (el !== null && el.nodeType === 1);
        return null;
    };
}

// Detecção de navegador para ajustes específicos
document.addEventListener('DOMContentLoaded', function() {
    // Detectar navegador
    const isIE = /*@cc_on!@*/false || !!document.documentMode;
    const isEdge = !isIE && !!window.StyleMedia;
    const isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);
    const isFirefox = typeof InstallTrigger !== 'undefined';
    const isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification));
    
    // Adicionar classes ao body para estilos específicos de navegador
    const body = document.body;
    
    if (isIE) body.classList.add('is-ie');
    if (isEdge) body.classList.add('is-edge');
    if (isChrome) body.classList.add('is-chrome');
    if (isFirefox) body.classList.add('is-firefox');
    if (isSafari) body.classList.add('is-safari');
    
    // Verificar suporte a modo escuro
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        body.classList.add('dark-mode-support');
    }
    
    // Verificar se é dispositivo móvel
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (isMobile) {
        body.classList.add('is-mobile');
    }
    
    // Ajustes para Internet Explorer
    if (isIE) {
        // Corrigir problemas de flexbox no IE
        const flexElements = document.querySelectorAll('.hero .container, .about-content, .contact-content, .footer-content');
        flexElements.forEach(function(el) {
            el.style.display = 'block';
        });
        
        // Substituir gradientes por cores sólidas no IE
        const gradientElements = document.querySelectorAll('.service-card::before, .hero::before, .hero::after');
        gradientElements.forEach(function(el) {
            el.style.background = '#4361ee';
        });
    }
    
    // Verificar suporte a recursos modernos
    const supportsGridLayout = window.CSS && window.CSS.supports && window.CSS.supports('display', 'grid');
    
    if (!supportsGridLayout) {
        // Fallback para navegadores sem suporte a CSS Grid
        const gridContainers = document.querySelectorAll('.services-grid, .portfolio-grid');
        gridContainers.forEach(function(container) {
            container.style.display = 'flex';
            container.style.flexWrap = 'wrap';
            
            const children = container.children;
            for (let i = 0; i < children.length; i++) {
                children[i].style.flex = '0 0 100%';
                children[i].style.maxWidth = '100%';
                
                // Em telas maiores, usar 50% ou 33.33%
                if (window.innerWidth >= 768) {
                    children[i].style.flex = '0 0 48%';
                    children[i].style.maxWidth = '48%';
                    children[i].style.marginRight = '2%';
                }
                
                if (window.innerWidth >= 992) {
                    if (container.classList.contains('services-grid')) {
                        children[i].style.flex = '0 0 31%';
                        children[i].style.maxWidth = '31%';
                        children[i].style.marginRight = '2%';
                    }
                }
            }
        });
    }
    
    // Verificar suporte a smooth scrolling
    const supportsScrollBehavior = 'scrollBehavior' in document.documentElement.style;
    
    if (!supportsScrollBehavior) {
        // Polyfill para smooth scrolling
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
                    
                    // Smooth scroll polyfill
                    const startPosition = window.pageYOffset;
                    const distance = offsetPosition - startPosition;
                    const duration = 500;
                    let start = null;
                    
                    window.requestAnimationFrame(step);
                    
                    function step(timestamp) {
                        if (!start) start = timestamp;
                        const progress = timestamp - start;
                        const percentage = Math.min(progress / duration, 1);
                        
                        window.scrollTo(0, startPosition + distance * easeInOutCubic(percentage));
                        
                        if (progress < duration) {
                            window.requestAnimationFrame(step);
                        }
                    }
                    
                    function easeInOutCubic(t) {
                        return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
                    }
                }
            });
        });
    }
    
    // Verificar suporte a lazy loading nativo
    const supportsLazyLoading = 'loading' in HTMLImageElement.prototype;
    
    if (!supportsLazyLoading) {
        // Implementar lazy loading manual para imagens
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver(function(entries, observer) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        const image = entry.target;
                        image.src = image.dataset.src;
                        imageObserver.unobserve(image);
                    }
                });
            });
            
            lazyImages.forEach(function(image) {
                imageObserver.observe(image);
            });
        } else {
            // Fallback para navegadores sem suporte a IntersectionObserver
            lazyImages.forEach(function(image) {
                image.src = image.dataset.src;
            });
        }
    }
    
    // Verificar suporte a CSS variables
    const supportsCssVars = window.CSS && window.CSS.supports && window.CSS.supports('(--a: 0)');
    
    if (!supportsCssVars) {
        // Fallback para navegadores sem suporte a CSS variables
        document.documentElement.style.setProperty('--primary-color', '#4361ee');
        document.documentElement.style.setProperty('--primary-dark', '#3a56d4');
        document.documentElement.style.setProperty('--secondary-color', '#7209b7');
        document.documentElement.style.setProperty('--accent-color', '#4cc9f0');
        document.documentElement.style.setProperty('--dark-color', '#1a1a2e');
        document.documentElement.style.setProperty('--light-color', '#f8f9fa');
        document.documentElement.style.setProperty('--gray-color', '#6c757d');
        document.documentElement.style.setProperty('--gray-light', '#e9ecef');
        document.documentElement.style.setProperty('--success-color', '#38b000');
        document.documentElement.style.setProperty('--warning-color', '#ffaa00');
        document.documentElement.style.setProperty('--danger-color', '#d90429');
        
        // Aplicar cores diretamente aos elementos
        const primaryColorElements = document.querySelectorAll('.btn-primary, .service-icon i, .logo span');
        primaryColorElements.forEach(function(el) {
            el.style.backgroundColor = '#4361ee';
            el.style.color = '#4361ee';
        });
    }
});
