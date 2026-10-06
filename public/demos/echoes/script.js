document.addEventListener('DOMContentLoaded', () => {
    // ===== SYSTÈME DE CALENDRIER ET RÉSERVATION =====

    const currentMonthElement = document.getElementById('current-month');
    const prevMonthBtn = document.getElementById('prev-month');
    const nextMonthBtn = document.getElementById('next-month');
    const calendarGrid = document.querySelector('.calendar-grid');

    // Date actuelle pour le calendrier
    let currentDate = new Date(2025, 1, 1);

    // Fonction pour générer le calendrier
    function generateCalendar(date) {
        if (!currentMonthElement || !calendarGrid) return;
        
        const year = date.getFullYear();
        const month = date.getMonth();
        
        // Mise à jour de l'affichage du mois
        currentMonthElement.textContent = new Intl.DateTimeFormat('fr-FR', { 
            month: 'long', 
            year: 'numeric' 
        }).format(date);

        const dateElements = document.querySelectorAll('.calendar-date:not(.calendar-days)');
        dateElements.forEach(el => el.remove());

        const firstDay = new Date(year, month, 1).getDay();
        const lastDate = new Date(year, month + 1, 0).getDate();

        // Ajuster le premier jour pour que lundi soit le premier jour
        const adjustedFirstDay = (firstDay + 6) % 7;

        for (let i = 0; i < adjustedFirstDay; i++) {
            const blankDate = document.createElement('div');
            blankDate.classList.add('calendar-date', 'empty');
            calendarGrid.appendChild(blankDate);
        }

        for (let day = 1; day <= lastDate; day++) {
            const dateElement = document.createElement('div');
            dateElement.classList.add('calendar-date');
            dateElement.textContent = day;

            if (Math.random() > 0.3) {
                dateElement.classList.add('available');
            } else {
                dateElement.classList.add('unavailable');
            }

            dateElement.addEventListener('click', function() {
                if (this.classList.contains('available')) {
                    document.querySelectorAll('.calendar-date').forEach(d => {
                        d.classList.remove('selected');
                    });
                    this.classList.add('selected');

                    const eventSelect = document.getElementById('event-select');
                    if (eventSelect) eventSelect.value = `event1`;
                }
            });

            calendarGrid.appendChild(dateElement);
        }
    }

    if (calendarGrid && prevMonthBtn && nextMonthBtn) {
        generateCalendar(currentDate);

        prevMonthBtn.addEventListener('click', () => {
            currentDate.setMonth(currentDate.getMonth() - 1);
            calendarGrid.innerHTML = '';
        });

        nextMonthBtn.addEventListener('click', () => {
            currentDate.setMonth(currentDate.getMonth() + 1);
            calendarGrid.innerHTML = '';
        });
    }

    // ===== SYSTÈME DE MÉTHODE DE PAIEMENT =====
    
    // Sélection des options de paiement
    const paymentOptions = document.querySelectorAll('.payment-option');
    const cardFields = document.querySelectorAll('#card-number, #card-expiry, #card-cvv');
    
    if (paymentOptions.length > 0) {
        const paypalOption = document.querySelector('.payment-option:last-child');
        const creditCardOption = document.querySelector('.payment-option:first-child');

        paymentOptions.forEach(option => {
            option.addEventListener('click', function() {
                paymentOptions.forEach(opt => {
                    opt.classList.remove('selected');
                });

                this.classList.add('selected');

                if (this === paypalOption) {
                    cardFields.forEach(field => {
                        field.disabled = true;
                        field.style.opacity = '0.5';
                        field.value = '';
                    });
                } else {
                    cardFields.forEach(field => {
                        field.disabled = false;
                        field.style.opacity = '1';
                    });
                }
            });
        });

        if (paypalOption && paypalOption.classList.contains('selected')) {
            cardFields.forEach(field => {
                field.disabled = true;
                field.style.opacity = '0.5';
            });
        }
    }

    // ===== SOUMISSION DU FORMULAIRE DE RÉSERVATION =====
    
    const bookingForm = document.getElementById('booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const requiredFields = this.querySelectorAll('[required]');
            let isValid = true;

            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    field.classList.add('error');
                    isValid = false;
                } else {
                    field.classList.remove('error');
                }
            });

            // Validation de la méthode de paiement
            const selectedPaymentMethod = document.querySelector('.payment-option.selected');
            const creditCardOption = document.querySelector('.payment-option:first-child');
            
            if (isValid) {
                // Vérifier si la carte de crédit est sélectionnée et valider les champs de carte
                if (selectedPaymentMethod === creditCardOption) {
                    const cardNumber = document.getElementById('card-number').value.trim();
                    const cardExpiry = document.getElementById('card-expiry').value.trim();
                    const cardCVV = document.getElementById('card-cvv').value.trim();

                    if (!cardNumber || !cardExpiry || !cardCVV) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Erreur de paiement',
                            text: 'Veuillez remplir tous les champs de carte de crédit.',
                            confirmButtonText: 'OK'
                        });
                        return;
                    }
                }

                // Simuler la confirmation de réservation
                Swal.fire({
                    icon: 'success',
                    title: 'Réservation réussie!',
                    text: 'Votre réservation a été confirmée. Un email de confirmation vous sera envoyé.',
                    confirmButtonText: 'OK'
                });

                this.reset();
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Erreur',
                    text: 'Veuillez remplir tous les champs obligatoires.',
                    confirmButtonText: 'OK'
                });
            }
        });
    }

    // ===== INTÉGRATIONS SPOTIFY =====
    
    const playButton = document.querySelector('.btn-play');
    const likeButton = document.querySelector('.btn-like');
    const tracks = document.querySelectorAll('.track');

    // Interaction avec le bouton de lecture
    if (playButton) {
        playButton.addEventListener('click', () => {
            const player = document.querySelector('iframe');
            if (player) {
                player.contentWindow.postMessage('{"method":"play"}', '*');
            }
        });
    }

    if (likeButton) {
        likeButton.addEventListener('click', () => {
            likeButton.classList.toggle('liked');
            const heartIcon = likeButton.querySelector('.heart-icon');
            if (heartIcon) {
                heartIcon.textContent = likeButton.classList.contains('liked') ? '♥' : '♡';
            }
        });
    }

    // Effets de survol des pistes
    if (tracks.length > 0) {
        tracks.forEach(track => {
            track.addEventListener('mouseenter', () => {
                track.style.backgroundColor = 'var(--hover-gray)';
            });

            track.addEventListener('mouseleave', () => {
                track.style.backgroundColor = 'transparent';
            });
        });
    }

    // ===== SYSTÈME D'AUTHENTIFICATION =====

    // Navigation entre les formulaires (connexion/inscription)
    const showSignup = document.getElementById("showSignup");
    const showLogin = document.getElementById("showLogin");
    const loginContainer = document.getElementById("loginContainer");
    const signupContainer = document.getElementById("signupContainer");

    if (showSignup && showLogin && loginContainer && signupContainer) {
        showSignup.addEventListener("click", (e) => {
            e.preventDefault();
            loginContainer.classList.add("hidden");
            signupContainer.classList.remove("hidden");
        });

        showLogin.addEventListener("click", (e) => {
            e.preventDefault();
            signupContainer.classList.add("hidden");
            loginContainer.classList.remove("hidden");
        });
    }

    // Gestion d'affichage du menu utilisateur
    const userMenu = document.getElementById("userMenu");
    const userEmailDisplay = document.getElementById("userEmail");
    const logoutBtn = document.getElementById("logoutBtn");

    function checkUserSession() {
        const user = JSON.parse(localStorage.getItem("loggedUser"));
        
        if (user && userMenu) {
            // Afficher le menu utilisateur
            userMenu.classList.remove("hidden");
            
            // Afficher l'email de l'utilisateur
            if (userEmailDisplay) {
                userEmailDisplay.textContent = user.email;
            }
            
            // Cacher les liens vers auth.html
            const loginLinks = document.querySelectorAll('a[href="auth.html"]');
            loginLinks.forEach(link => {
                const listItem = link.closest('li');
                if (listItem && !listItem.id) {
                    listItem.classList.add("hidden");
                }
            });
        } else if (userMenu) {
            // Cacher le menu utilisateur
            userMenu.classList.add("hidden");
            
            // Vider l'email
            if (userEmailDisplay) {
                userEmailDisplay.textContent = "";
            }
            
            // Afficher les liens vers auth.html
            const loginLinks = document.querySelectorAll('a[href="auth.html"]');
            loginLinks.forEach(link => {
                const listItem = link.closest('li');
                if (listItem && !listItem.id) {
                    listItem.classList.remove("hidden");
                }
            });
        }
    }

    // Déconnexion de l'utilisateur
    if (logoutBtn) {
        logoutBtn.addEventListener("click", (e) => {
            e.preventDefault();
            localStorage.removeItem("loggedUser");
            checkUserSession();
            window.location.href = "index.html";
        });
    }

    // Gestion du formulaire d'inscription
    const signupForm = document.getElementById("signupForm");
    if (signupForm) {
        signupForm.addEventListener("submit", function(e) {
            e.preventDefault();

            const name = document.getElementById("signupName").value.trim();
            const prenom = document.getElementById("signupPrenom").value.trim();
            const email = document.getElementById("signupEmail").value.trim();
            const password = document.getElementById("signupPassword").value.trim();

            if (!name || !prenom || !email || !password) {
                alert("Veuillez remplir tous les champs.");
                return;
            }

            let users = JSON.parse(localStorage.getItem("users")) || [];
            if (users.some(user => user.email === email)) {
                alert("Cet email est déjà utilisé !");
                return;
            }

            let newUser = { name, prenom, email, password };
            users.push(newUser);
            localStorage.setItem("users", JSON.stringify(users));
            localStorage.setItem("loggedUser", JSON.stringify(newUser));

            window.location.href = "index.html";
        });
    }

    // Gestion du formulaire de connexion
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", function(e) {
            e.preventDefault();

            const email = document.getElementById("loginEmail").value.trim();
            const password = document.getElementById("loginPassword").value.trim();

            let users = JSON.parse(localStorage.getItem("users")) || [];
            let user = users.find(u => u.email === email && u.password === password);

            if (user) {
                localStorage.setItem("loggedUser", JSON.stringify(user));
                window.location.href = "index.html";
            } else {
                alert("Email ou mot de passe incorrect !");
            }
        });
    }

    // Vérifier l'état de session au chargement de la page
    checkUserSession();

    // ===== FORMULAIRE DE CONTACT =====
    
    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
        contactForm.addEventListener("submit", function(e) {
            e.preventDefault();
            
            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const subject = document.getElementById("subject").value.trim();
            const message = document.getElementById("message").value.trim();

            if (!name || !email || !subject || !message) {
                Swal.fire({
                    icon: 'error',
                    title: 'Erreur',
                    text: 'Veuillez remplir tous les champs obligatoires.',
                    confirmButtonText: 'OK'
                });
                return;
            }

            // Simuler le succès de l'envoi du formulaire
            Swal.fire({
                icon: 'success',
                title: 'Message envoyé!',
                text: 'Nous avons bien reçu votre message et vous répondrons dans les plus brefs délais.',
                confirmButtonText: 'OK'
            });

            // Réinitialiser le formulaire
            this.reset();
        });
    }
});