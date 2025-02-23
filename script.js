// Theme Toggle Functionality
const themeToggle = document.querySelector('.theme-toggle');
const htmlElement = document.documentElement;

// Initialize theme from localStorage or default to light
const initializeTheme = () => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    htmlElement.setAttribute('data-theme', savedTheme);
};

// Toggle theme and save to localStorage
themeToggle.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

// Back to Top Button
const backToTop = document.querySelector('.back-to-top');

// Show/hide back to top button based on scroll position
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

// Smooth scroll to top
backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Language Switcher
const languageBtns = document.querySelectorAll('.language-btn');

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
    document.querySelector('.submit-btn .submit-text').textContent = translations[lang].send;
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

// Modal Functionality
const modal = document.getElementById('responseModal');
const modalIcon = document.getElementById('modalIcon');
const modalTitle = document.getElementById('modalTitle');
const modalMessage = document.getElementById('modalMessage');
const modalClose = document.getElementById('modalClose');

// Show Modal Function
const showModal = (type, title, message) => {
    modalIcon.className = `modal-icon ${type}`;
    modalTitle.textContent = title;
    modalMessage.textContent = message;
    modal.classList.add('active');
};

// Hide Modal Function
const hideModal = () => {
    modal.classList.remove('active');
};

// Close modal when clicking close button
modalClose.addEventListener('click', hideModal);

// Close modal when clicking outside
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        hideModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        hideModal();
    }
});

// Contact Form Handling
const contactForm = document.getElementById('contact-form');
const submitButton = contactForm.querySelector('.submit-btn');

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
    if (!emailRegex.test(emailInput.value)) {
        emailInput.closest('.form-group').classList.add('error');
        isValid = false;
    }

    // Validate other required fields
    ['name', 'subject', 'message'].forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (!field.value.trim()) {
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
        showModal('error', 'Rate Limit Exceeded', 'Please try again later.');
        return;
    }

    // Validate form
    if (!validateForm()) {
        showModal('error', 'Validation Error', 'Please fill in all required fields correctly.');
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
            
            showModal('success', 'Message Sent!', 'Thank you for your message. I will get back to you soon!');
            contactForm.reset();
        } else {
            throw new Error(data.message || 'Form submission failed');
        }
    } catch (error) {
        console.error('Error:', error);
        showModal('error', 'Submission Failed', 'There was an error sending your message. Please try again.');
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

// Skills Progress Animation
const progressBars = document.querySelectorAll('.skills-progress-bar');

// Animate progress bars when they come into view
const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progress = entry.target.getAttribute('data-progress');
            entry.target.style.width = `${progress}%`;
            progressObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

progressBars.forEach(bar => {
    progressObserver.observe(bar);
});

// Section Animation
const sections = document.querySelectorAll('section');

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('slide-in');
            sectionObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1
});

sections.forEach(section => {
    sectionObserver.observe(section);
});

// Initialize everything when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeTheme();
    
    // Initialize language from localStorage
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
        const langBtn = document.querySelector(`[data-lang="${savedLanguage}"]`);
        if (langBtn) {
            langBtn.click();
        }
    }
});
// Mobile Menu Functionality
const createMobileMenu = () => {
    // Create menu toggle button
    const menuToggle = document.createElement('button');
    menuToggle.className = 'menu-toggle';
    menuToggle.setAttribute('aria-label', 'Toggle navigation menu');
    
    // Add hamburger icon spans
    for (let i = 0; i < 3; i++) {
        const span = document.createElement('span');
        menuToggle.appendChild(span);
    }
    
    // Add to document
    document.body.appendChild(menuToggle);
    
    // Get nav element
    const nav = document.querySelector('nav');
    
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
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            nav.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
};

// Enhanced Animation System
const initializeAnimations = () => {
    // Intersection Observer for sections
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                // Animate grid items within the section
                entry.target.querySelectorAll('.grid .item').forEach(item => {
                    item.classList.add('animate');
                });
                
                // Animate projects within the section
                entry.target.querySelectorAll('.project').forEach(project => {
                    project.classList.add('animate');
                });
                
                // Stop observing after animation
                sectionObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '50px'
    });

    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        sectionObserver.observe(section);
    });
};

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize mobile menu
    createMobileMenu();
    
    // Initialize animations
    initializeAnimations();
    
    // Handle smooth scrolling for navigation links
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Update active navigation link based on scroll position
const updateActiveNavLink = () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');
    
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const id = section.getAttribute('id');
        
        if (rect.top <= 150 && rect.bottom >= 150) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
};

// Listen for scroll events to update active nav link
window.addEventListener('scroll', _.throttle(updateActiveNavLink, 100));