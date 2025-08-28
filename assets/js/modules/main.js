/**
 * ReasonPath™ Main Application Module
 * Core application class and initialization
 */

import { NavigationManager } from './navigation.js';
import { DictionaryManager } from './dictionary.js';
import { showToast, animateButton, handleShare, scrollToTerm } from './utilities.js';

/**
 * ReasonPath Application - Modular Architecture
 * Built for 1000-term scalability with client-side JSON
 */
export class ReasonPathApp {
    constructor() {
        // Initialize managers
        this.navigation = new NavigationManager();
        this.dictionary = new DictionaryManager();
        
        // Initialize application
        this.init();
    }

    /**
     * Initialize application
     */
    async init() {
        console.log('ReasonPath™ initializing...');
        this.bindEvents();
        this.navigation.updateNavigation();
        this.navigation.initScrollEffects();
        
        // Load glossary data immediately
        await this.dictionary.loadDictionaryData();
        
        // Initialize glossary display if we're already on that page
        if (this.navigation.getCurrentPage() === 'ai-glossary') {
            this.dictionary.updateDictionaryDisplay();
            this.dictionary.updateResultsCount();
        }
        
        console.log('ReasonPath™ ready - Enhanced UI with AI Glossary active');
    }

    /**
     * Bind all event listeners
     */
    bindEvents() {
        // Simple, direct event handling
        document.addEventListener('click', (e) => {
            // Try navigation first
            if (this.navigation.handleNavigationClick(e)) {
                return;
            }

            // Frame buttons
            if (e.target.matches('.frame-btn') || e.target.closest('.frame-btn')) {
                const btn = e.target.matches('.frame-btn') ? e.target : e.target.closest('.frame-btn');
                this.handleFrameAction(btn);
                return;
            }

            // Category filter buttons
            if (e.target.matches('.category-filter') || e.target.closest('.category-filter')) {
                const btn = e.target.matches('.category-filter') ? e.target : e.target.closest('.category-filter');
                const category = btn.getAttribute('data-category') || 'all';
                this.dictionary.filterByCategory(category);
                this.dictionary.updateCategoryButtons(btn);
                return;
            }

            // Related term clicks
            if (e.target.matches('.related-tag') || e.target.closest('.related-tag')) {
                const tag = e.target.matches('.related-tag') ? e.target : e.target.closest('.related-tag');
                const termId = tag.getAttribute('data-related');
                if (termId) {
                    scrollToTerm(termId);
                }
                return;
            }

            // Button animations
            if (e.target.matches('.btn') || e.target.closest('.btn')) {
                const btn = e.target.matches('.btn') ? e.target : e.target.closest('.btn');
                animateButton(btn);
            }
        });

        // Search input
        document.addEventListener('input', (e) => {
            if (e.target.matches('#dictionary-search')) {
                const searchTerm = e.target.value.toLowerCase().trim();
                this.dictionary.filterDictionary(searchTerm, this.dictionary.currentCategory);
            }
        });

        // Keyboard events
        document.addEventListener('keydown', (e) => {
            this.navigation.handleKeyboardEvent(e);
        });
    }

    /**
     * Handle frame button actions
     * @param {HTMLElement} button - Button element
     */
    handleFrameAction(button) {
        const action = button.getAttribute('data-action');
        animateButton(button);

        switch (action) {
            case 'share':
                handleShare();
                break;
            case 'refresh':
                if (this.navigation.getCurrentPage() === 'ai-glossary') {
                    this.dictionary.loadDictionaryData();
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
            case 'reset-filters':
                // Reset dictionary filters
                if (this.navigation.getCurrentPage() === 'ai-glossary') {
                    const searchInput = document.getElementById('dictionary-search');
                    if (searchInput) searchInput.value = '';
                    this.dictionary.filterDictionary('', 'all');
                    // Reset category buttons
                    const allButton = document.querySelector('.category-filter[data-category="all"]');
                    if (allButton) this.dictionary.updateCategoryButtons(allButton);
                    showToast('Filters reset!', 'success');
                } else {
                    showToast('Filters reset!', 'info');
                }
                break;
            case 'random-term':
                // Show random term
                if (this.dictionary.dictionaryData.length > 0) {
                    const randomTerm = this.dictionary.dictionaryData[
                        Math.floor(Math.random() * this.dictionary.dictionaryData.length)
                    ];
                    scrollToTerm(randomTerm.id);
                    showToast(`Random term: ${randomTerm.term}`, 'success');
                } else {
                    showToast('Loading glossary terms...', 'info');
                }
                break;
            default:
                showToast('Feature coming soon!', 'info');
        }
    }

    /**
     * Show page (proxy to navigation manager)
     * @param {string} pageId - Page to show
     */
    showPage(pageId) {
        const result = this.navigation.showPage(pageId);
        
        // Special handling for AI glossary page
        if (pageId === 'ai-glossary') {
            // Ensure dictionary is displayed if data is loaded
            if (this.dictionary.dictionaryData.length > 0) {
                this.dictionary.updateDictionaryDisplay();
                this.dictionary.updateResultsCount();
            }
        }
        
        return result;
    }

    /**
     * Get application status for debugging
     * @returns {Object} - Application status
     */
    getStatus() {
        return {
            currentPage: this.navigation.getCurrentPage(),
            mobileMenuOpen: this.navigation.isMobileMenuOpen(),
            dictionaryLoaded: this.dictionary.dictionaryData.length > 0,
            dictionaryTermCount: this.dictionary.dictionaryData.length,
            filteredTermCount: this.dictionary.filteredDictionary.length,
            currentCategory: this.dictionary.currentCategory
        };
    }
}

/**
 * Initialize application when DOM is ready
 */
export function initializeApp() {
    document.addEventListener('DOMContentLoaded', () => {
        window.reasonPathApp = new ReasonPathApp();
        console.log('ReasonPath™ Enhanced platform ready - AI Glossary system active');
    });
}