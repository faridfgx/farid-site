/**
 * Portfolio Website JavaScript
 * Enhanced for better mobile compatibility and performance
 */

// Global variables for elements that will be frequently accessed
let htmlElement, themeToggle, backToTop, nav, menuToggle;

/**
 * Theme Toggle Functionality
 * Manages theme switching between light and dark modes
 */
const initializeTheme = () => {
    htmlElement = document.documentElement;
    themeToggle = document.querySelector('.theme-toggle');
    
    if (!themeToggle) return;
    
    // Initialize theme from localStorage or default to light
    const savedTheme = localStorage.getItem('theme') || 'light';
    htmlElement.setAttribute('data-theme', savedTheme);
    
    // Toggle theme and save to localStorage
    themeToggle.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
};

/**
 * Back to Top Button
 * Shows/hides the back to top button based on scroll position
 */
const initializeBackToTop = () => {
    backToTop = document.querySelector('.back-to-top');
    
    if (!backToTop) return;
    
    // Throttled scroll handler for better performance
    const handleScroll = _.throttle(() => {
        if (window.scrollY > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }, 100);
    
    // Show/hide back to top button based on scroll position
    window.addEventListener('scroll', handleScroll);
    
    // Smooth scroll to top when button is clicked
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
};

/**
 * Language Switcher
 * Manages language switching and content translation
 */
const initializeLanguageSwitcher = () => {
    const languageBtns = document.querySelectorAll('.language-btn');
    
    if (!languageBtns.length) return;
    
    // Translation dictionary
    const translations = {
        en: {
            about: 'About',
            skills: 'Skills',
            projects: 'Projects',
            experience: 'Experience',
            contact: 'Contact',
            name: 'Name',
            email: 'Email',
            subject: 'Subject',
            message: 'Message',
            send: 'Send Message',
            aboutMe: 'About Me',
            welcome: 'Welcome to my website!',
            learnMore: 'Learn More',
            readMore: 'Read More',
            home: 'Home',
            services: 'Services',
            testimonials: 'Testimonials',
            portfolio: 'Portfolio',
            blog: 'Blog',
            newsletter: 'Subscribe to our newsletter',
            submit: 'Submit',
            loading: 'Loading...',
            successMessage: 'Message sent successfully!',
            errorMessage: 'An error occurred. Please try again.',
            phone: 'Phone',
            address: 'Address',
            followUs: 'Follow Us',
            copyright: 'All rights reserved.',
        },
        fr: {
            about: 'À propos',
            skills: 'Compétences',
            projects: 'Projets',
            experience: 'Expérience',
            contact: 'Contact',
            name: 'Nom',
            email: 'Email',
            subject: 'Sujet',
            message: 'Message',
            send: 'Envoyer',
            aboutMe: 'À propos de moi',
            welcome: 'Bienvenue sur mon site web!',
            learnMore: 'En savoir plus',
            readMore: 'Lire la suite',
            home: 'Accueil',
            services: 'Services',
            testimonials: 'Témoignages',
            portfolio: 'Portfolio',
            blog: 'Blog',
            newsletter: 'Abonnez-vous à notre newsletter',
            submit: 'Soumettre',
            loading: 'Chargement...',
            successMessage: 'Message envoyé avec succès!',
            errorMessage: 'Une erreur est survenue. Veuillez réessayer.',
            phone: 'Téléphone',
            address: 'Adresse',
            followUs: 'Suivez-nous',
            copyright: 'Tous droits réservés.',
        },
        ar: {
            about: 'حول',
            skills: 'المهارات',
            projects: 'المشاريع',
            experience: 'الخبرة',
            contact: 'اتصل بنا',
            name: 'الاسم',
            email: 'البريد الإلكتروني',
            subject: 'الموضوع',
            message: 'الرسالة',
            send: 'إرسال',
            aboutMe: 'نبذة عني',
            welcome: 'مرحبًا بك في موقعي الإلكتروني!',
            learnMore: 'أعرف أكثر',
            readMore: 'اقرأ المزيد',
            home: 'الرئيسية',
            services: 'الخدمات',
            testimonials: 'الشهادات',
            portfolio: 'المعرض',
            blog: 'المدونة',
            newsletter: 'اشترك في النشرة الإخبارية',
            submit: 'إرسال',
            loading: 'جار التحميل...',
            successMessage: 'تم إرسال الرسالة بنجاح!',
            errorMessage: 'حدث خطأ. حاول مرة اخرى.',
            phone: 'الهاتف',
            address: 'العنوان',
            followUs: 'تابعنا',
            copyright: 'جميع الحقوق محفوظة.',
        }
    };
    
    // Update page content based on selected language
    const updateContent = (lang) => {
        try {
            // Update navigation links
            document.querySelectorAll('nav a').forEach(link => {
                const key = link.getAttribute('href').slice(1);
                if (translations[lang][key]) {
                    link.textContent = translations[lang][key];
                }
            });
    
            // Update section headings
            document.querySelectorAll('section h2').forEach(heading => {
                const key = heading.closest('section').id;
                if (translations[lang][key]) {
                    heading.textContent = translations[lang][key];
                }
            });
    
            // Update form labels
            document.querySelectorAll('.form-group label').forEach(label => {
                const key = label.getAttribute('for');
                if (translations[lang][key]) {
                    label.textContent = translations[lang][key];
                }
            });
    
            // Update submit button
            const submitText = document.querySelector('.submit-btn .submit-text');
            if (submitText && translations[lang].send) {
                submitText.textContent = translations[lang].send;
            }
            
            // Update footer copyright
            const footerText = document.querySelector('footer p');
            if (footerText && translations[lang].copyright) {
                const year = new Date().getFullYear();
                footerText.textContent = `© ${year} Farid Mezane. ${translations[lang].copyright}`;
            }
        } catch (error) {
            console.error('Error updating content:', error);
        }
    };
    
    // Language switcher event listeners
    languageBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            languageBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');
            
            const lang = btn.dataset.lang;
            htmlElement.setAttribute('lang', lang);
            
            // Set RTL for Arabic
            if (lang === 'ar') {
                htmlElement.setAttribute('dir', 'rtl');
            } else {
                htmlElement.setAttribute('dir', 'ltr');
            }
            
            // Update content
            updateContent(lang);
            
            // Save language preference
            localStorage.setItem('language', lang);
        });
    });
    
    // Initialize language from localStorage
    const initializeLanguage = () => {
        const savedLanguage = localStorage.getItem('language');
        if (savedLanguage) {
            const langBtn = document.querySelector(`[data-lang="${savedLanguage}"]`);
            if (langBtn) {
                langBtn.click();
            }
        }
    };
    
    // Initialize language
    initializeLanguage();
};

/**
 * Mobile Menu Functionality
 * Creates and manages the mobile navigation menu
 */
const initializeMobileMenu = () => {
    nav = document.querySelector('nav');
    
    if (!nav) return;
    
    // Check if menu toggle already exists
    const existingMenuToggle = document.querySelector('.menu-toggle');
    
    if (!existingMenuToggle) {
        // Create menu toggle button
        menuToggle = document.createElement('button');
        menuToggle.className = 'menu-toggle';
        menuToggle.setAttribute('aria-label', 'Toggle navigation menu');
        menuToggle.setAttribute('aria-expanded', 'false');
        
        // Add hamburger icon spans
        for (let i = 0; i < 3; i++) {
            const span = document.createElement('span');
            menuToggle.appendChild(span);
        }
        
        // Add to document
        document.body.appendChild(menuToggle);
    } else {
        menuToggle = existingMenuToggle;
    }
    
    // Toggle menu
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        nav.classList.toggle('active');
        
        // Handle accessibility
        const isExpanded = nav.classList.contains('active');
        menuToggle.setAttribute('aria-expanded', isExpanded);
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = isExpanded ? 'hidden' : '';
    });
    
    // Close menu when clicking links
    nav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', (e) => {
            // Prevent default behavior
            e.preventDefault();
            
            // Get the target section ID from href
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            // Close the mobile menu
            menuToggle.classList.remove('active');
            nav.classList.remove('active');
            document.body.style.overflow = '';
            
            // Scroll to target section if it exists
            if (targetElement) {
                // Small delay to ensure menu is closed first
                setTimeout(() => {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Update active nav link
                    document.querySelectorAll('nav a').forEach(navLink => {
                        navLink.classList.remove('active');
                    });
                    link.classList.add('active');
                }, 300);
            }
        });
    });
    
    // Handle window resize to reset menu state
    window.addEventListener('resize', _.debounce(() => {
        if (window.innerWidth > 768 && nav.classList.contains('active')) {
            menuToggle.classList.remove('active');
            nav.classList.remove('active');
            document.body.style.overflow = '';
        }
    }, 250));
};

/**
 * Skills Progress Animation
 * Animates progress bars when they come into view
 */
const initializeSkillsAnimation = () => {
    const progressBars = document.querySelectorAll('.skills-progress-bar');
    
    if (!progressBars.length) return;
    
    // Check if IntersectionObserver is supported
    if ('IntersectionObserver' in window) {
        // Animate progress bars when they come into view
        const progressObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progress = entry.target.getAttribute('data-progress');
                    entry.target.style.width = `${progress}%`;
                    // Also set a CSS variable for browsers that need it
                    entry.target.style.setProperty('--progress', `${progress}%`);
                    progressObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3, rootMargin: '50px' });
        
        progressBars.forEach(bar => {
            progressObserver.observe(bar);
        });
    } else {
        // Fallback for browsers without IntersectionObserver
        progressBars.forEach(bar => {
            const progress = bar.getAttribute('data-progress');
            bar.style.width = `${progress}%`;
        });
    }
};

/**
 * Section Animation
 * Animates sections when they come into view
 */
const initializeSectionAnimations = () => {
    const sections = document.querySelectorAll('section');
    
    if (!sections.length) return;
    
    // Check if IntersectionObserver is supported
    if ('IntersectionObserver' in window) {
        // Animate sections when they come into view
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    
                    // Animate grid items within the section
                    entry.target.querySelectorAll('.grid .item').forEach((item, index) => {
                        setTimeout(() => {
                            item.classList.add('animate');
                        }, index * 100); // Staggered animation
                    });
                    
                    // Animate projects within the section
                    entry.target.querySelectorAll('.project').forEach((project, index) => {
                        setTimeout(() => {
                            project.classList.add('animate');
                        }, index * 100); // Staggered animation
                    });
                    
                    sectionObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '50px'
        });
        
        sections.forEach(section => {
            sectionObserver.observe(section);
        });
    } else {
        // Fallback for browsers without IntersectionObserver
        sections.forEach(section => {
            section.classList.add('animate');
            section.querySelectorAll('.grid .item, .project').forEach(item => {
                item.classList.add('animate');
            });
        });
    }
};

/**
 * Update active navigation link based on scroll position
 */
const updateActiveNavLink = () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');
    
    if (!sections.length || !navLinks.length) return;
    
    let currentSectionId = '';
    
    // Find the current section in view
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const id = section.getAttribute('id');
        
        // Check if section is in view (allowing for some tolerance)
        if (rect.top <= 150 && rect.bottom >= 150) {
            currentSectionId = id;
        }
    });
    
    // Update the active navigation link
    if (currentSectionId) {
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    }
};

/**
 * Modal Functionality
 * Manages the display and behavior of modals
 */
const initializeModal = () => {
    const modal = document.getElementById('responseModal');
    
    if (!modal) return;
    
    const modalIcon = document.getElementById('modalIcon');
    const modalTitle = document.getElementById('modalTitle');
    const modalMessage = document.getElementById('modalMessage');
    const modalClose = document.getElementById('modalClose');
    
    // Show Modal Function
    window.showModal = (type, title, message) => {
        if (modalIcon) modalIcon.className = `modal-icon ${type}`;
        if (modalTitle) modalTitle.textContent = title;
        if (modalMessage) modalMessage.textContent = message;
        modal.classList.add('active');
    };
    
    // Hide Modal Function
    window.hideModal = () => {
        modal.classList.remove('active');
    };
    
    // Close modal when clicking close button
    if (modalClose) {
        modalClose.addEventListener('click', window.hideModal);
    }
    
    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            window.hideModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            window.hideModal();
        }
    });
};

/**
 * Contact Form Handling
 * Manages form validation, submission, and rate limiting
 */
const initializeContactForm = () => {
    const contactForm = document.getElementById('contact-form');
    
    if (!contactForm) return;
    
    const submitButton = contactForm.querySelector('.submit-btn');
    
    if (!submitButton) return;
    
    // Rate limiting configuration
    const RATE_LIMIT = {
        maxAttempts: 3,
        timeWindow: 3600000, // 1 hour in milliseconds
        submissionHistory: []
    };
    
    // Check if user has exceeded rate limit
    const checkRateLimit = () => {
        const now = Date.now();
        // Remove submissions older than the time window
        RATE_LIMIT.submissionHistory = RATE_LIMIT.submissionHistory.filter(
            time => now - time < RATE_LIMIT.timeWindow
        );
        
        return RATE_LIMIT.submissionHistory.length < RATE_LIMIT.maxAttempts;
    };
    
    // Form validation
    const validateForm = () => {
        let isValid = true;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        // Clear previous errors
        document.querySelectorAll('.form-group.error').forEach(el => {
            el.classList.remove('error');
        });
    
        // Validate email
        const emailInput = document.getElementById('email');
        if (emailInput && !emailRegex.test(emailInput.value)) {
            emailInput.closest('.form-group').classList.add('error');
            isValid = false;
        }
    
        // Validate other required fields
        ['name', 'subject', 'message'].forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (field && !field.value.trim()) {
                field.closest('.form-group').classList.add('error');
                isValid = false;
            }
        });
    
        return isValid;
    };
    
    // Handle form submission
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Check rate limit
        if (!checkRateLimit()) {
            window.showModal('error', 'Rate Limit Exceeded', 'Please try again later.');
            return;
        }
    
        // Validate form
        if (!validateForm()) {
            window.showModal('error', 'Validation Error', 'Please fill in all required fields correctly.');
            return;
        }
    
        // Show loading state
        submitButton.disabled = true;
        submitButton.classList.add('loading');
        
        try {
            const formData = new FormData(contactForm);
    
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(Object.fromEntries(formData))
            });
            
            const data = await response.json();
            
            if (data.success) {
                // Add submission to rate limit history
                RATE_LIMIT.submissionHistory.push(Date.now());
                
                window.showModal('success', 'Message Sent!', 'Thank you for your message. I will get back to you soon!');
                contactForm.reset();
            } else {
                throw new Error(data.message || 'Form submission failed');
            }
        } catch (error) {
            console.error('Error:', error);
            window.showModal('error', 'Submission Failed', 'There was an error sending your message. Please try again.');
        } finally {
            // Reset button state
            submitButton.disabled = false;
            submitButton.classList.remove('loading');
        }
    });
    
    // Real-time field validation
    document.querySelectorAll('.form-group input, .form-group textarea').forEach(field => {
        field.addEventListener('blur', () => {
            const group = field.closest('.form-group');
            if (!field.value.trim()) {
                group.classList.add('error');
            } else if (field.type === 'email') {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(field.value)) {
                    group.classList.add('error');
                } else {
                    group.classList.remove('error');
                }
            } else {
                group.classList.remove('error');
            }
        });
    });
};

/**
 * Browser Compatibility Check
 * Detects problematic browsers and applies compatibility fixes
 */
const checkBrowserCompatibility = () => {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    const isOldAndroid = /Android 4\./.test(navigator.userAgent);
    const isOldSamsung = /SamsungBrowser\/[1-9]\./.test(navigator.userAgent);
    const isLowEndDevice = navigator.deviceMemory && navigator.deviceMemory < 2;
    
    if (isIOS || isOldAndroid || isOldSamsung || isLowEndDevice) {
        // Apply compatibility mode
        document.documentElement.classList.add('compat-mode');
        
        // Add compatibility CSS
        const compatStyle = document.createElement('style');
        compatStyle.textContent = `
            .compat-mode * {
                transition-duration: 0.1s !important;
            }
            
            .compat-mode .skills-progress-bar {
                transition: none !important;
                width: var(--progress, 0%) !important;
            }
            
            .compat-mode section,
            .compat-mode .item,
            .compat-mode .project {
                animation: none !important;
                opacity: 1 !important;
            }
            
            @media (max-width: 768px) {
                .compat-mode nav {
                    position: absolute;
                    transform: none !important;
                    height: auto;
                    max-height: 100vh;
                    overflow-y: auto;
                }
                
                .compat-mode nav.active {
                    display: block;
                    left: 0;
                    right: 0;
                }
            }
        `;
        document.head.appendChild(compatStyle);
        
        // Simplify animations
        document.querySelectorAll('.skills-progress-bar').forEach(bar => {
            const progress = bar.getAttribute('data-progress');
            bar.style.width = `${progress}%`;
        });
        
        document.querySelectorAll('section, .grid .item, .project').forEach(element => {
            element.classList.add('animate');
        });
    }
};

/**
 * Initialize everything when the DOM is loaded
 */
document.addEventListener('DOMContentLoaded', () => {
    // Feature detection for missing browser APIs
    if (!window.IntersectionObserver) {
        document.documentElement.classList.add('no-intersection-observer');
    }
    
    // Basic features initialization
    initializeTheme();
    initializeBackToTop();
    initializeLanguageSwitcher();
    initializeMobileMenu();
    
    // Animation initialization
    initializeSkillsAnimation();
    initializeSectionAnimations();
    
    // Form and modal initialization
    initializeModal();
    initializeContactForm();
    
    // Initial update of active navigation link
    updateActiveNavLink();
    
    // Listen for scroll events to update active nav link
    window.addEventListener('scroll', _.throttle(updateActiveNavLink, 100));
    
    // Check browser compatibility after everything is loaded
    window.addEventListener('load', checkBrowserCompatibility);
});