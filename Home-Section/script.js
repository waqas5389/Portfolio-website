
        // Navbar Toggle
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
        
        // Navbar Scroll Effect
        window.addEventListener('scroll', () => {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
        
        // Skills Progress Animation
        const skillProgress = document.querySelectorAll('.skill-progress');
        
        const animateSkills = () => {
            skillProgress.forEach(progress => {
                const width = progress.getAttribute('data-width');
                progress.style.width = width + '%';
            });
        };
        
        // Element Animation on Scroll
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                    if (entry.target.classList.contains('skill-card')) {
                        animateSkills();
                    }
                }
            });
        }, { threshold: 0.1 });
        
        document.querySelectorAll('.skill-card, .project-card').forEach(element => {
            observer.observe(element);
        });
        
        // Smooth Scrolling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const target = document.querySelector(this.getAttribute('href'));
                
                if (target) {
                    window.scrollTo({
                        top: target.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });
        
        // Form Validation
        const contactForm = document.querySelector('.contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const name = document.getElementById('name').value;
                const email = document.getElementById('email').value;
                const message = document.getElementById('message').value;
                
                // Simple validation
                if (name && email && message) {
                    // Here you would normally send the form data to a server
                    alert('Message sent successfully!');
                    contactForm.reset();
                } else {
                    alert('Please fill in all fields');
                }
            });
        }






//Send Message to gmail Codelogic

(function(){
    emailjs.init("jfegF8q2lDqzF-UAc");  // ✅ Apni Public Key yahan paste karo
})();

document.querySelector(".contact-form").addEventListener("submit", function(e) {
    e.preventDefault();

    emailjs.sendForm("service_jy1uws9", "template_n6rxcgp", this, "jfegF8q2lDqzF-UAc")
    .then(() => {
        alert("✅ Message sent successfully!");
        this.reset();
    }, (error) => {
        alert("❌ Failed to send message. Check console for details.");
        console.log("EmailJS Error:", error);
    });
});