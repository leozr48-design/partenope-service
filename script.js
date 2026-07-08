document.addEventListener('DOMContentLoaded', () => {
    // Dynamic year for footer
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // Header scroll effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 10) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Handle Preventivo Form Submission
    const preventivoForm = document.getElementById('preventivo-form');

    // Broom Animation for "Chi Siamo" link
    const chiSiamoLink = document.querySelector('a[href="#chi-siamo"]');
    const broomOverlay = document.getElementById('broom-overlay');
    
    if (chiSiamoLink && broomOverlay) {
        chiSiamoLink.addEventListener('click', (e) => {
            e.preventDefault();
            
            if (broomOverlay.classList.contains('animating')) return;
            
            broomOverlay.classList.add('animating');
            
            // Scroll to the section smoothly while the broom sweeps
            setTimeout(() => {
                const target = document.getElementById('chi-siamo');
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }, 500); 
            
            // Remove the animation class once the CSS animation completes
            setTimeout(() => {
                broomOverlay.classList.remove('animating');
            }, 1500); 
        });
    }
    if (preventivoForm) {
        preventivoForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Log to DataLayer for Google Analytics
            window.dataLayer = window.dataLayer || []; 
            window.dataLayer.push({'event': 'form_submission'});
            
            // Increment remote counter
            fetch('https://api.counterapi.dev/v1/partenopeservice/preventivo_clicks/up', { method: 'GET' })
                .catch(err => console.error("Counter error:", err));
            
            alert('Messaggio inviato! (Sostituire con integrazione backend)');
        });
    }

    // Admin secret trigger: Double click on footer logo to show the counter
    const footerLogo = document.querySelector('.footer-logo img');
    if (footerLogo) {
        footerLogo.addEventListener('dblclick', () => {
            const adminCounter = document.getElementById('admin-counter');
            const adminCounterVal = document.getElementById('admin-counter-val');
            
            if (adminCounter && adminCounterVal) {
                // Fetch current count
                fetch('https://api.counterapi.dev/v1/partenopeservice/preventivo_clicks')
                    .then(res => res.json())
                    .then(data => {
                        adminCounterVal.textContent = data.count || 0;
                        adminCounter.style.display = 'block';
                    })
                    .catch(err => {
                        console.error("Errore fetch counter:", err);
                        alert("Impossibile caricare il contatore.");
                    });
            }
        });
    }
});
