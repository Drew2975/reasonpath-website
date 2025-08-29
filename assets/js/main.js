class ReasonPathApp {
    constructor() {
        this.mobileMenuOpen = false;
        this.init();
    }

    init() {
        this.setupMobileMenu();
        this.setupFormValidation();
        this.setupDataCards();
        this.setupNavigation();
    }

    setupMobileMenu() {
        const nav = document.querySelector("nav");
        if (nav && !document.querySelector(".mobile-menu-toggle")) {
            const hamburger = document.createElement("button");
            hamburger.className = "mobile-menu-toggle";
            hamburger.innerHTML = "<span></span><span></span><span></span>";
            nav.appendChild(hamburger);
            
            const overlay = document.createElement("div");
            overlay.className = "mobile-menu-overlay";
            document.body.appendChild(overlay);
            
            hamburger.addEventListener("click", () => this.toggleMobileMenu());
            overlay.addEventListener("click", () => this.closeMobileMenu());
        }
    }

    toggleMobileMenu() {
        const nav = document.querySelector("nav");
        const overlay = document.querySelector(".mobile-menu-overlay");
        this.mobileMenuOpen = !this.mobileMenuOpen;
        
        if (this.mobileMenuOpen) {
            nav.classList.add("mobile-open");
            overlay.classList.add("active");
            document.body.style.overflow = "hidden";
        } else {
            this.closeMobileMenu();
        }
    }

    closeMobileMenu() {
        const nav = document.querySelector("nav");
        const overlay = document.querySelector(".mobile-menu-overlay");
        nav.classList.remove("mobile-open");
        overlay.classList.remove("active");
        document.body.style.overflow = "";
        this.mobileMenuOpen = false;
    }

    setupFormValidation() {
        document.querySelectorAll("form").forEach(form => {
            form.addEventListener("submit", e => {
                e.preventDefault();
                this.handleFormSubmit(form);
            });
        });
    }

    handleFormSubmit(form) {
        const btn = form.querySelector("button[type=submit]");
        if (btn) {
            btn.textContent = "Submitting...";
            setTimeout(() => {
                btn.textContent = "Success!";
                setTimeout(() => btn.textContent = "Submit", 2000);
            }, 1000);
        }
    }

    setupDataCards() {
        document.querySelectorAll(".datacard").forEach(card => {
            card.addEventListener("click", () => {
                card.classList.add("clicked");
                setTimeout(() => card.classList.remove("clicked"), 300);
            });
        });
    }

    setupNavigation() {
        document.querySelectorAll("nav a").forEach(link => {
            link.addEventListener("click", e => {
                if (this.mobileMenuOpen) {
                    this.closeMobileMenu();
                }
            });
        });
    }
}

document.addEventListener("DOMContentLoaded", () => {
    window.reasonPathApp = new ReasonPathApp();
});