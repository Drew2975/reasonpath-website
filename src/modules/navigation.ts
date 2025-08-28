// Navigation Manager - Handles page navigation and mobile menu functionality
// Manages navigation highlighting, mobile menu state, and page transitions

export class NavigationManager {
    constructor() {}

    public updateNavigation(currentPage: string): void {
        // Clear all active states
        document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
            link.classList.remove('active');
        });

        // Set active state for current page
        document.querySelectorAll(`[data-page="${currentPage}"]`).forEach(link => {
            if (link.matches('.nav-link') || link.matches('.mobile-nav-link')) {
                link.classList.add('active');
            }
        });
    }

    public openMobileMenu(): void {
        const menu = document.querySelector('.mobile-menu');
        const overlay = document.querySelector('.mobile-menu-overlay');
        const toggle = document.querySelector('.mobile-menu-toggle');

        if (menu && overlay && toggle) {
            menu.classList.add('active');
            overlay.classList.add('active');
            toggle.classList.add('active');
            toggle.setAttribute('aria-expanded', 'true');
            document.body.style.overflow = 'hidden';
        }
    }

    public closeMobileMenu(): void {
        const menu = document.querySelector('.mobile-menu');
        const overlay = document.querySelector('.mobile-menu-overlay');
        const toggle = document.querySelector('.mobile-menu-toggle');

        if (menu && overlay && toggle) {
            menu.classList.remove('active');
            overlay.classList.remove('active');
            toggle.classList.remove('active');
            toggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        }
    }
}
