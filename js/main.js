/**
 * Main JavaScript for Nikhil Chakravarthy's Portfolio Website
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize all components
  initNavigation();
  initAnimations();
  initFormValidation();
  initSkillBars();
  initTypewriter();
  initScrollReveal();
});

/**
 * Navigation functionality
 */
function initNavigation() {
  // Mobile menu toggle
  const mobileMenuButton = document.querySelector('button.text-gray-600');
  const mobileMenu = document.querySelector('.md\\:flex.items-center.space-x-8');
  
  if (mobileMenuButton && mobileMenu) {
    let isOpen = false;
    
    mobileMenuButton.addEventListener('click', () => {
      isOpen = !isOpen;
      
      if (isOpen) {
        // Create and show mobile menu
        const mobileMenuContainer = document.createElement('div');
        mobileMenuContainer.className = 'absolute top-16 left-0 right-0 bg-white shadow-md py-4 px-4 flex flex-col space-y-4 md:hidden z-20';
        mobileMenuContainer.id = 'mobile-menu';
        
        // Clone navigation links
        const navLinks = mobileMenu.querySelectorAll('a');
        navLinks.forEach(link => {
          const newLink = link.cloneNode(true);
          newLink.className = 'text-gray-600 hover:text-indigo-600 transition-all duration-300 py-2';
          mobileMenuContainer.appendChild(newLink);
          
          // Close menu when a link is clicked
          newLink.addEventListener('click', () => {
            document.getElementById('mobile-menu')?.remove();
            isOpen = false;
          });
        });
        
        document.body.appendChild(mobileMenuContainer);
      } else {
        // Remove mobile menu
        document.getElementById('mobile-menu')?.remove();
      }
    });
  }
  
  // Highlight active section in navbar
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');
  
  window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      
      if (pageYOffset >= sectionTop - 200) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('text-indigo-600');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('text-indigo-600');
      }
    });
  });
}

/**
 * Animations
 */
function initAnimations() {
  // Add fade-in animations to sections
  const animatedElements = document.querySelectorAll('.animate-fade-in');
  
  // Use Intersection Observer to trigger animations when elements come into view
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1
  });
  
  animatedElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
    observer.observe(element);
  });
}

/**
 * Form validation for contact form
 */
function initFormValidation() {
  const contactForm = document.querySelector('#contact form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form inputs
      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');
      const subjectInput = document.getElementById('subject');
      const messageInput = document.getElementById('message');
      
      // Simple validation
      let isValid = true;
      
      if (!nameInput.value.trim()) {
        markInvalid(nameInput, 'Name is required');
        isValid = false;
      } else {
        markValid(nameInput);
      }
      
      if (!emailInput.value.trim()) {
        markInvalid(emailInput, 'Email is required');
        isValid = false;
      } else if (!isValidEmail(emailInput.value.trim())) {
        markInvalid(emailInput, 'Please enter a valid email');
        isValid = false;
      } else {
        markValid(emailInput);
      }
      
      if (!subjectInput.value.trim()) {
        markInvalid(subjectInput, 'Subject is required');
        isValid = false;
      } else {
        markValid(subjectInput);
      }
      
      if (!messageInput.value.trim()) {
        markInvalid(messageInput, 'Message is required');
        isValid = false;
      } else if (messageInput.value.trim().length < 10) {
        markInvalid(messageInput, 'Message must be at least 10 characters');
        isValid = false;
      } else {
        markValid(messageInput);
      }
      
      // If form is valid, show success message
      if (isValid) {
        // Here you would normally send the form data to a server
        // For demo purposes, we'll just show a success message
        
        const formControls = contactForm.querySelectorAll('input, textarea, button');
        formControls.forEach(control => {
          control.disabled = true;
        });
        
        const successMsg = document.createElement('div');
        successMsg.className = 'mt-4 p-4 bg-green-100 text-green-800 rounded-md';
        successMsg.textContent = 'Thank you for your message! I will get back to you soon.';
        
        contactForm.appendChild(successMsg);
        
        // Reset form after 3 seconds
        setTimeout(() => {
          contactForm.reset();
          formControls.forEach(control => {
            control.disabled = false;
          });
          successMsg.remove();
        }, 3000);
      }
    });
  }
  
  // Helper functions for form validation
  function markInvalid(element, message) {
    element.classList.add('border-red-500');
    
    // Remove existing error message if any
    const existingError = element.parentElement.querySelector('.error-message');
    if (existingError) existingError.remove();
    
    // Add error message
    const errorElement = document.createElement('p');
    errorElement.className = 'error-message text-red-500 text-sm mt-1';
    errorElement.textContent = message;
    element.parentElement.appendChild(errorElement);
  }
  
  function markValid(element) {
    element.classList.remove('border-red-500');
    
    // Remove error message if any
    const existingError = element.parentElement.querySelector('.error-message');
    if (existingError) existingError.remove();
  }
  
  function isValidEmail(email) {
    const emailPattern = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
    return emailPattern.test(email);
  }
}

/**
 * Animate skill bars on scroll
 */
function initSkillBars() {
  const skillBars = document.querySelectorAll('.bg-indigo-600.h-2.rounded-full');
  
  // Only animate when in viewport
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Get the width from inline style and animate to it
        const targetWidth = entry.target.style.width;
        
        // Reset width to 0 before animating
        entry.target.style.width = '0%';
        
        // Animate to target width
        setTimeout(() => {
          entry.target.style.width = targetWidth;
          entry.target.style.transition = 'width 1s ease-out';
        }, 100);
        
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.2
  });
  
  skillBars.forEach(bar => {
    observer.observe(bar);
  });
}

/**
 * Typewriter effect for hero section
 */
function initTypewriter() {
  const element = document.querySelector('.hero-typewriter');
  
  if (element) {
    const text = element.textContent;
    element.textContent = '';
    
    let i = 0;
    const speed = 50; // Typing speed in milliseconds
    
    function typeWriter() {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, speed);
      }
    }
    
    // Start the typewriter effect
    typeWriter();
  }
}

/**
 * Reveal elements on scroll
 */
function initScrollReveal() {
  const elementsToReveal = document.querySelectorAll('.scroll-reveal');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1
  });
  
  elementsToReveal.forEach(element => {
    observer.observe(element);
  });
}