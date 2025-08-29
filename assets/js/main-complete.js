// ReasonPath Application - Complete Working Implementation
// Built for 1000-term scalability with client-side JSON
class ReasonPathApp {
    constructor() {
        this.mobileMenuOpen = false;
        this.currentPage = 'home';
        this.dictionaryData = [];
        this.filteredDictionary = [];
        this.currentCategory = 'all';
        this.init();
    }

    async init() {
        console.log('ReasonPath™ initializing...');
        this.bindEvents();
        this.updateNavigation();
        
        // Load glossary data immediately
        await this.loadDictionaryData();
        
        // Initialize glossary display if we're already on that page
        if (this.currentPage === 'ai-glossary') {
            this.updateDictionaryDisplay();
            this.updateResultsCount();
        }
        
        console.log('ReasonPath™ ready - Enhanced UI with AI Glossary active');
    }

    bindEvents() {
        // Simple, direct event handling
        document.addEventListener('click', (e) => {
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
                return;
            }

            // Mobile menu toggle
            if (e.target.matches('.mobile-menu-toggle') || e.target.closest('.mobile-menu-toggle')) {
                this.toggleMobileMenu();
                return;
            }

            // Mobile menu close
            if (e.target.matches('.mobile-menu-close') || e.target.closest('.mobile-menu-close')) {
                this.closeMobileMenu();
                return;
            }

            // Mobile menu overlay
            if (e.target.matches('.mobile-menu-overlay')) {
                this.closeMobileMenu();
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
                this.filterByCategory(category);
                this.updateCategoryButtons(btn);
                return;
            }

            // Related term clicks
            if (e.target.matches('.related-tag') || e.target.closest('.related-tag')) {
                const tag = e.target.matches('.related-tag') ? e.target : e.target.closest('.related-tag');
                const termId = tag.getAttribute('data-related');
                if (termId) {
                    this.scrollToTerm(termId);
                }
                return;
            }

            // Button animations
            if (e.target.matches('.btn') || e.target.closest('.btn')) {
                const btn = e.target.matches('.btn') ? e.target : e.target.closest('.btn');
                this.animateButton(btn);
            }
        });

        // Search input
        document.addEventListener('input', (e) => {
            if (e.target.matches('#dictionary-search')) {
                const searchTerm = e.target.value.toLowerCase().trim();
                this.filterDictionary(searchTerm, this.currentCategory);
            }
        });

        // Keyboard events
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.mobileMenuOpen) {
                this.closeMobileMenu();
            }
        });

        // Scroll effects
        window.addEventListener('scroll', () => {
            const header = document.getElementById('header');
            if (header) {
                header.classList.toggle('scrolled', window.scrollY > 100);
            }
        });
    }

    // Dictionary data loading - FIXED VERSION
    async loadDictionaryData() {
        const dictionaryGrid = document.querySelector('#dictionary-grid');
        const countElement = document.querySelector('#results-count');
        
        // Show loading state with progress bar
        if (dictionaryGrid) {
            dictionaryGrid.innerHTML = `
                <div class="loading-message" style="text-align: center; padding: 3rem;">
                    <h4 style="color: #00407A; margin-bottom: 1rem;">Loading AI Glossary Terms...</h4>
                    <div style="width: 200px; height: 4px; background: #e2e8f0; border-radius: 2px; margin: 0 auto; overflow: hidden;">
                        <div style="height: 100%; background: linear-gradient(90deg, #E55A00, #00407A); animation: loading 1.5s infinite; transform: translateX(-100%);"></div>
                    </div>
                    <p style="margin-top: 1rem; color: #64748b;">Preparing 150+ AI terms for learning...</p>
                </div>
                <style>
                    @keyframes loading {
                        0% { transform: translateX(-100%); }
                        100% { transform: translateX(300%); }
                    }
                </style>
            `;
        }

        try {
            console.log('Fetching glossary data from: data/dictionary.json');
            const response = await fetch('data/dictionary.json');
            
            if (!response.ok) {
                throw new Error(`Failed to load dictionary: ${response.status} ${response.statusText}`);
            }

            this.dictionaryData = await response.json();
            this.filteredDictionary = [...this.dictionaryData];
            
            console.log(`✅ Successfully loaded ${this.dictionaryData.length} glossary terms`);
            
            // Immediate update if we're on dictionary page
            this.updateDictionaryDisplay();
            this.updateResultsCount();
            
            // Show success feedback
            this.showToast(`AI Glossary loaded: ${this.dictionaryData.length} terms ready`, 'success');
            
        } catch (error) {
            console.error('❌ Glossary loading failed:', error);
            
            // Show detailed error with solutions
            if (dictionaryGrid) {
                const isLocalFile = window.location.protocol === 'file:';
                dictionaryGrid.innerHTML = `
                    <div class="no-results" style="text-align: center; padding: 2rem; background: #fef2f2; border-radius: 8px;">
                        <h4 style="color: #dc2626; margin-bottom: 1rem;">🚫 AI Glossary Loading Failed</h4>
                        <p style="margin-bottom: 1rem; color: #6b7280;">${error.message}</p>
                        
                        ${isLocalFile ? `
                            <div style="background: #fef3c7; padding: 1rem; border-radius: 6px; margin: 1rem 0; text-align: left;">
                                <h5 style="color: #92400e; margin-bottom: 0.5rem;">💡 Local File Access Issue</h5>
                                <p style="color: #92400e; font-size: 0.9rem; margin-bottom: 0.5rem;">
                                    Browsers block local file access. To fix:
                                </p>
                                <ul style="color: #92400e; font-size: 0.9rem; text-align: left; margin-left: 1rem;">
                                    <li>Use a local server: <code style="background: rgba(0,0,0,0.1); padding: 2px;">python -m http.server</code></li>
                                    <li>Or use VS Code Live Server extension</li>
                                </ul>
                            </div>
                        ` : ''}
                        
                        <button class="btn btn-primary" onclick="window.reasonPathApp.loadDictionaryData()" 
                                style="margin-top: 1rem;">
                            🔄 Retry Loading
                        </button>
                    </div>
                `;
            }
            
            if (countElement) {
                countElement.textContent = 'Loading failed';
            }
        }
    }

    // Dictionary display - FIXED VERSION
    updateDictionaryDisplay() {
        const dictionaryGrid = document.querySelector('#dictionary-grid');
        if (!dictionaryGrid) return;

        // If no data loaded yet, keep loading state
        if (this.dictionaryData.length === 0) {
            return;
        }

        // Show no results message
        if (this.filteredDictionary.length === 0) {
            dictionaryGrid.innerHTML = `
                <div class="no-results" style="text-align: center; padding: 3rem;">
                    <h4 style="color: #64748b; margin-bottom: 1rem;">🔍 No terms found</h4>
                    <p style="color: #64748b;">Try adjusting your search or category filter</p>
                    <button class="btn btn-secondary" onclick="document.getElementById('dictionary-search').value=''; window.reasonPathApp.filterDictionary('', 'all');" style="margin-top: 1rem;">
                        Clear Filters
                    </button>
                </div>
            `;
            return;
        }

        // Render dictionary terms with enhanced styling
        const termsHTML = this.filteredDictionary.map(term => `
            <div class="dictionary-term" data-term-id="${term.id}" style="transition: all 0.3s ease;">
                <div class="term-header">
                    <h3 class="term-title">${term.term}</h3>
                    <div class="term-meta">
                        <span class="category-tag">${term.category}</span>
                        <span class="difficulty-tag difficulty-${term.difficulty.toLowerCase()}">${term.difficulty}</span>
                    </div>
                </div>
                <div class="term-definition">
                    <p>${term.definition}</p>
                </div>
                ${term.analogy ? `<div class="term-analogy">
                    <h4 style="color: #0ea5e9; font-size: 0.875rem; margin: 0 0 0.5rem 0;">💡 Think of it this way:</h4>
                    <p style="font-style: italic;">${term.analogy}</p>
                </div>` : ''}
                ${term.example ? `<div class="term-example">
                    <h4 style="color: #64748b; font-size: 0.875rem; margin: 0 0 0.5rem 0;">Example:</h4>
                    <p><code style="background: #f1f5f9; padding: 2px 4px; border-radius: 3px; font-size: 0.9em;">${term.example}</code></p>
                </div>` : ''}
                ${term.related && term.related.length > 0 ? `<div class="term-related" style="margin-top: 1rem; padding-top: 1rem; border-top: 1px solid #e2e8f0;">
                    <h4 style="color: #64748b; font-size: 0.875rem; margin: 0 0 0.5rem 0;">Related terms:</h4>
                    <div class="related-tags">
                        ${term.related.map(relatedId => {
                            const relatedTerm = this.dictionaryData.find(t => t.id === relatedId);
                            return relatedTerm ? `<span class="related-tag" data-related="${relatedId}" style="cursor: pointer; transition: all 0.2s ease;">${relatedTerm.term}</span>` : '';
                        }).join('')}
                    </div>
                </div>` : ''}
            </div>
        `).join('');

        dictionaryGrid.innerHTML = termsHTML;
        
        // Add scroll reveal animation for terms
        setTimeout(() => {
            const terms = dictionaryGrid.querySelectorAll('.dictionary-term');
            terms.forEach((term, index) => {
                term.style.opacity = '0';
                term.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    term.style.opacity = '1';
                    term.style.transform = 'translateY(0)';
                }, index * 50);
            });
        }, 100);
    }

    // Search and filtering - FIXED VERSION
    filterDictionary(searchTerm = '', category = 'all') {
        if (this.dictionaryData.length === 0) return;

        this.filteredDictionary = this.dictionaryData.filter(term => {
            // Search matching - check multiple fields
            const matchesSearch = !searchTerm || 
                term.term.toLowerCase().includes(searchTerm) ||
                term.definition.toLowerCase().includes(searchTerm) ||
                term.category.toLowerCase().includes(searchTerm) ||
                (term.analogy && term.analogy.toLowerCase().includes(searchTerm)) ||
                (term.example && term.example.toLowerCase().includes(searchTerm));

            // Category matching
            const matchesCategory = category === 'all' || term.category === category;

            return matchesSearch && matchesCategory;
        });

        this.updateDictionaryDisplay();
        this.updateResultsCount();
    }

    // Category filtering
    filterByCategory(category) {
        this.currentCategory = category;
        const searchInput = document.querySelector('#dictionary-search');
        const searchTerm = searchInput ? searchInput.value.toLowerCase().trim() : '';
        this.filterDictionary(searchTerm, category);
    }

    // Results counter - FIXED VERSION
    updateResultsCount() {
        const countElement = document.querySelector('#results-count');
        if (countElement) {
            const count = this.filteredDictionary.length;
            const total = this.dictionaryData.length;
            
            if (total === 0) {
                countElement.textContent = 'Loading...';
            } else {
                countElement.textContent = `Showing ${count} of ${total} terms`;
                // Add visual emphasis for filtered results
                if (count < total) {
                    countElement.style.color = '#E55A00';
                    countElement.style.fontWeight = '600';
                } else {
                    countElement.style.color = '#64748b';
                    countElement.style.fontWeight = 'normal';
                }
            }
        }
    }

    // Category button updates
    updateCategoryButtons(activeButton) {
        document.querySelectorAll('.category-filter').forEach(btn => {
            btn.classList.remove('active');
            btn.style.background = '#e2e8f0';
            btn.style.color = '#64748b';
        });
        
        activeButton.classList.add('active');
        activeButton.style.background = '#00407A';
        activeButton.style.color = 'white';
    }

    // Page navigation - WORKING VERSION
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

        // Special handling for AI glossary page
        if (pageId === 'ai-glossary') {
            // Ensure dictionary is displayed if data is loaded
            if (this.dictionaryData.length > 0) {
                this.updateDictionaryDisplay();
                this.updateResultsCount();
            }
        }

        // Update navigation highlighting
        this.updateNavigation();

        // Smooth scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        console.log(`Navigated to: ${pageId}`);
    }

    // Navigation highlighting
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

    // Mobile menu management
    toggleMobileMenu() {
        this.mobileMenuOpen = !this.mobileMenuOpen;
        if (this.mobileMenuOpen) {
            this.openMobileMenu();
        } else {
            this.closeMobileMenu();
        }
    }

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

    // Frame button actions
    handleFrameAction(button) {
        const action = button.getAttribute('data-action');
        this.animateButton(button);

        switch (action) {
            case 'share':
                this.handleShare();
                break;
            case 'refresh':
                if (this.currentPage === 'ai-glossary') {
                    this.loadDictionaryData();
                } else {
                    this.showToast('Content refreshed!', 'info');
                }
                break;
            case 'learn-more':
                this.showToast('More learning resources coming soon!', 'info');
                break;
            case 'filter':
                this.showToast('Advanced filtering coming soon!', 'info');
                break;
            default:
                this.showToast('Feature coming soon!', 'info');
        }
    }

    // Share functionality
    handleShare() {
        const url = window.location.href;
        const title = 'ReasonPath™ - AI Learning Platform';
        const text = '150+ AI terms explained with practical analogies';

        if (navigator.share) {
            navigator.share({ title, text, url })
                .catch(err => console.log('Share failed:', err));
        } else if (navigator.clipboard) {
            navigator.clipboard.writeText(url)
                .then(() => this.showToast('Link copied to clipboard!', 'success'))
                .catch(() => this.showToast('Unable to copy link', 'error'));
        } else {
            this.showToast('Sharing not supported on this browser', 'error');
        }
    }

    // Button animation
    animateButton(button) {
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            button.style.transform = 'scale(1)';
        }, 150);
    }

    // Scroll to term
    scrollToTerm(termId) {
        const term = document.querySelector(`[data-term-id="${termId}"]`);
        if (term) {
            term.scrollIntoView({ behavior: 'smooth', block: 'center' });
            // Highlight effect
            term.style.background = '#fff5e6';
            term.style.borderColor = '#E55A00';
            setTimeout(() => {
                term.style.background = '';
                term.style.borderColor = '';
            }, 2000);
        }
    }

    // Toast notifications
    showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? '#10B981' : type === 'error' ? '#EF4444' : '#00407A'};
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            font-weight: 500;
            z-index: 10000;
            max-width: 300px;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        `;
        toast.textContent = message;
        document.body.appendChild(toast);

        // Slide in
        setTimeout(() => {
            toast.style.transform = 'translateX(0)';
        }, 100);

        // Slide out and remove
        setTimeout(() => {
            toast.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 300);
        }, 3000);
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.reasonPathApp = new ReasonPathApp();
    console.log('ReasonPath™ Enhanced platform ready - AI Glossary system active');
});