/**
 * ReasonPath™ Navigation Module
 * Handles page navigation, mobile menu, and routing
 */

export class NavigationManager {
    constructor() {
        this.mobileMenuOpen = false;
        this.currentPage = 'home';
    }

    /**
     * Show specific page and handle navigation
     * @param {string} pageId - ID of page to show
     */
    showPage(pageId) {
        if (!pageId || !document.getElementById(pageId)) {
            console.warn(`Page "${pageId}" not found`);
            return;
        }

        // Hide all pages
        document.querySelectorAll('.page-section').forEach(page => {
            page.classList.remove('active');
        });

        // Show selected page
        document.getElementById(pageId).classList.add('active');
        this.currentPage = pageId;

        // Update navigation highlighting
        this.updateNavigation();

        // Smooth scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        console.log(`Navigated to: ${pageId}`);

        // Return current page for external use
        return pageId;
    }

    /**
     * Update navigation highlighting
     */
    updateNavigation() {
        // Clear all active states
        document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
            link.classList.remove('active');
        });

        // Set active state for current page
        document.querySelectorAll(`[data-page="${this.currentPage}"]`).forEach(link => {
            if (link.matches('.nav-link') || link.matches('.mobile-nav-link')) {
                link.classList.add('active');
            }
        });
    }

    /**
     * Toggle mobile menu state
     */
    toggleMobileMenu() {
        this.mobileMenuOpen = !this.mobileMenuOpen;
        if (this.mobileMenuOpen) {
            this.openMobileMenu();
        } else {
            this.closeMobileMenu();
        }
    }

    /**
     * Open mobile menu
     */
    openMobileMenu() {
        const menu = document.querySelector('.mobile-menu');
        const overlay = document.querySelector('.mobile-menu-overlay');
        const toggle = document.querySelector('.mobile-menu-toggle');

        if (menu && overlay && toggle) {
            menu.classList.add('active');
            overlay.classList.add('active');
            toggle.classList.add('active');
            toggle.setAttribute('aria-expanded', 'true');
            document.body.style.overflow = 'hidden';
            this.mobileMenuOpen = true;
        }
    }

    /**
     * Close mobile menu
     */
    closeMobileMenu() {
        const menu = document.querySelector('.mobile-menu');
        const overlay = document.querySelector('.mobile-menu-overlay');
        const toggle = document.querySelector('.mobile-menu-toggle');

        if (menu && overlay && toggle) {
            menu.classList.remove('active');
            overlay.classList.remove('active');
            toggle.classList.remove('active');
            toggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
            this.mobileMenuOpen = false;
        }
    }

    /**
     * Handle navigation click events
     * @param {Event} e - Click event
     * @returns {boolean} - Whether event was handled
     */
    handleNavigationClick(e) {
        // Navigation clicks
        if (e.target.matches('[data-page]') || e.target.closest('[data-page]')) {
            e.preventDefault();
            const element = e.target.matches('[data-page]') ? e.target : e.target.closest('[data-page]');
            const pageId = element.getAttribute('data-page');
            this.showPage(pageId);
            
            // Close mobile menu if needed
            if (e.target.closest('.mobile-nav-link')) {
                this.closeMobileMenu();
            }
            return true;
        }

        // Mobile menu toggle
        if (e.target.matches('.mobile-menu-toggle') || e.target.closest('.mobile-menu-toggle')) {
            this.toggleMobileMenu();
            return true;
        }

        // Mobile menu close
        if (e.target.matches('.mobile-menu-close') || e.target.closest('.mobile-menu-close')) {
            this.closeMobileMenu();
            return true;
        }

        // Mobile menu overlay
        if (e.target.matches('.mobile-menu-overlay')) {
            this.closeMobileMenu();
            return true;
        }

        return false;
    }

    /**
     * Handle keyboard events for navigation
     * @param {KeyboardEvent} e - Keyboard event
     * @returns {boolean} - Whether event was handled
     */
    handleKeyboardEvent(e) {
        if (e.key === 'Escape' && this.mobileMenuOpen) {
            this.closeMobileMenu();
            return true;
        }
        return false;
    }

    /**
     * Initialize scroll effects
     */
    initScrollEffects() {
        window.addEventListener('scroll', () => {
            const header = document.getElementById('header');
            if (header) {
                header.classList.toggle('scrolled', window.scrollY > 100);
            }
        });
    }

    /**
     * Get current page
     * @returns {string} - Current page ID
     */
    getCurrentPage() {
        return this.currentPage;
    }

    /**
     * Check if mobile menu is open
     * @returns {boolean} - Mobile menu state
     */
    isMobileMenuOpen() {
        return this.mobileMenuOpen;
    }
}