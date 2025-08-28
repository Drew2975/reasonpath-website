// ReasonPath Application - Main Entry Point
// TypeScript implementation with modular architecture

import { DictionaryManager } from './modules/dictionary';
import { NavigationManager } from './modules/navigation';
import { escapeHTML, showToast } from './utils/helpers';

export interface AppState {
    mobileMenuOpen: boolean;
    currentPage: string;
    currentCategory: string;
}

export class ReasonPathApp {
    private state: AppState;
    private dictionaryManager: DictionaryManager;
    private navigationManager: NavigationManager;

    constructor() {
        this.state = {
            mobileMenuOpen: false,
            currentPage: 'home',
            currentCategory: 'all'
        };

        this.dictionaryManager = new DictionaryManager();
        this.navigationManager = new NavigationManager();
        
        this.init();
    }

    private async init(): Promise<void> {
        console.log('ReasonPath™ initializing...');
        
        this.bindEvents();
        this.navigationManager.updateNavigation(this.state.currentPage);
        
        // Load glossary data immediately
        await this.dictionaryManager.loadData();
        
        // Initialize glossary display if we're already on that page
        if (this.state.currentPage === 'ai-glossary') {
            this.dictionaryManager.updateDisplay();
            this.dictionaryManager.updateResultsCount();
        }
        
        console.log('ReasonPath™ ready - Enhanced UI with AI Glossary active');
    }

    private bindEvents(): void {
        // Main event delegation handler
        document.addEventListener('click', this.handleClick.bind(this));
        
        // Search input
        document.addEventListener('input', this.handleInput.bind(this));
        
        // Keyboard events
        document.addEventListener('keydown', this.handleKeydown.bind(this));
        
        // Scroll effects
        window.addEventListener('scroll', this.handleScroll.bind(this));
    }

    private handleClick(e: Event): void {
        const target = e.target as HTMLElement;
        
        // Navigation clicks
        if (target.matches('[data-page]') || target.closest('[data-page]')) {
            e.preventDefault();
            const element = target.matches('[data-page]') ? target : target.closest('[data-page]') as HTMLElement;
            const pageId = element.getAttribute('data-page');
            
            if (pageId) {
                this.showPage(pageId);
                
                // Close mobile menu if needed
                if (target.closest('.mobile-nav-link')) {
                    this.navigationManager.closeMobileMenu();
                    this.state.mobileMenuOpen = false;
                }
            }
            return;
        }

        // Mobile menu toggle
        if (target.matches('.mobile-menu-toggle') || target.closest('.mobile-menu-toggle')) {
            this.toggleMobileMenu();
            return;
        }

        // Mobile menu close
        if (target.matches('.mobile-menu-close') || target.closest('.mobile-menu-close')) {
            this.navigationManager.closeMobileMenu();
            this.state.mobileMenuOpen = false;
            return;
        }

        // Mobile menu overlay
        if (target.matches('.mobile-menu-overlay')) {
            this.navigationManager.closeMobileMenu();
            this.state.mobileMenuOpen = false;
            return;
        }

        // Frame buttons
        if (target.matches('.frame-btn') || target.closest('.frame-btn')) {
            const btn = target.matches('.frame-btn') ? target : target.closest('.frame-btn') as HTMLElement;
            this.handleFrameAction(btn);
            return;
        }

        // Category filter buttons
        if (target.matches('.category-filter') || target.closest('.category-filter')) {
            const btn = target.matches('.category-filter') ? target : target.closest('.category-filter') as HTMLElement;
            const category = btn.getAttribute('data-category') || 'all';
            this.dictionaryManager.filterByCategory(category);
            this.state.currentCategory = category;
            return;
        }

        // Related term clicks
        if (target.matches('.related-tag') || target.closest('.related-tag')) {
            const tag = target.matches('.related-tag') ? target : target.closest('.related-tag') as HTMLElement;
            const termId = tag.getAttribute('data-related');
            if (termId) {
                this.dictionaryManager.scrollToTerm(termId);
            }
            return;
        }

        // Button animations
        if (target.matches('.btn') || target.closest('.btn')) {
            const btn = target.matches('.btn') ? target : target.closest('.btn') as HTMLElement;
            this.animateButton(btn);
        }
    }

    private handleInput(e: Event): void {
        const target = e.target as HTMLInputElement;
        
        if (target.matches('#dictionary-search')) {
            const searchTerm = target.value.toLowerCase().trim();
            this.dictionaryManager.filterDictionary(searchTerm, this.state.currentCategory);
        }
    }

    private handleKeydown(e: KeyboardEvent): void {
        if (e.key === 'Escape' && this.state.mobileMenuOpen) {
            this.navigationManager.closeMobileMenu();
            this.state.mobileMenuOpen = false;
        }
    }

    private handleScroll(): void {
        const header = document.getElementById('header');
        if (header) {
            header.classList.toggle('scrolled', window.scrollY > 100);
        }
    }

    private showPage(pageId: string): void {
        if (!pageId || !document.getElementById(pageId)) {
            console.warn(`Page "${pageId}" not found`);
            return;
        }

        // Hide all pages
        document.querySelectorAll('.page-section').forEach(page => {
            page.classList.remove('active');
        });

        // Show selected page
        const targetPage = document.getElementById(pageId);
        if (targetPage) {
            targetPage.classList.add('active');
            this.state.currentPage = pageId;

            // Special handling for AI glossary page
            if (pageId === 'ai-glossary') {
                this.dictionaryManager.updateDisplay();
                this.dictionaryManager.updateResultsCount();
            }

            // Update navigation highlighting
            this.navigationManager.updateNavigation(pageId);

            // Smooth scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
            
            console.log(`Navigated to: ${pageId}`);
        }
    }

    private toggleMobileMenu(): void {
        this.state.mobileMenuOpen = !this.state.mobileMenuOpen;
        if (this.state.mobileMenuOpen) {
            this.navigationManager.openMobileMenu();
        } else {
            this.navigationManager.closeMobileMenu();
        }
    }

    private handleFrameAction(button: HTMLElement): void {
        const action = button.getAttribute('data-action');
        this.animateButton(button);

        switch (action) {
            case 'share':
                this.handleShare();
                break;
            case 'refresh':
                if (this.state.currentPage === 'ai-glossary') {
                    this.dictionaryManager.loadData();
                } else {
                    showToast('Content refreshed!', 'info');
                }
                break;
            case 'learn-more':
                showToast('More learning resources coming soon!', 'info');
                break;
            case 'filter':
                showToast('Advanced filtering coming soon!', 'info');
                break;
            default:
                showToast('Feature coming soon!', 'info');
        }
    }

    private handleShare(): void {
        const url = window.location.href;
        const title = 'ReasonPath™ - AI Learning Platform';
        const text = '150+ AI terms explained with practical analogies';

        if (navigator.share) {
            navigator.share({ title, text, url })
                .catch(err => console.log('Share failed:', err));
        } else if (navigator.clipboard) {
            navigator.clipboard.writeText(url)
                .then(() => showToast('Link copied to clipboard!', 'success'))
                .catch(() => showToast('Unable to copy link', 'error'));
        } else {
            showToast('Sharing not supported on this browser', 'error');
        }
    }

    private animateButton(button: HTMLElement): void {
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            button.style.transform = 'scale(1)';
        }, 150);
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    (window as any).reasonPathApp = new ReasonPathApp();
    console.log('ReasonPath™ Enhanced platform ready - AI Glossary system active');
});
