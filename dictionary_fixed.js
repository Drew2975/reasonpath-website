// ReasonPath Application - Fixed Working Implementation
// Built for 1000-term scalability with client-side JSON
class ReasonPathApp {
    constructor() {
        this.mobileMenuOpen = false;
        this.currentPage = 'home';
        this.dictionaryData = [];
        this.filteredDictionary = [];
        this.currentCategory = 'all';
        this.init().catch(error => {
            console.error('Failed to initialize application:', error);
        });
    }

    async init() {
        try {
            this.bindEvents();
            this.updateNavigationState();
            
            // Load dictionary data on init
            await this.loadDictionaryData();
            
            console.log('ReasonPath™ initialized successfully');
            console.log(`Dictionary loaded: ${this.dictionaryData.length} terms`);
        } catch (error) {
            console.error('Initialization error:', error);
        }
    }

    // Event Binding
    bindEvents() {
        // Single global click handler for all interactions
        document.addEventListener('click', (e) => this.handleClick(e));
        document.addEventListener('keydown', (e) => this.handleKeydown(e));
        document.addEventListener('input', (e) => this.handleInput(e));
        window.addEventListener('scroll', () => this.handleScroll());
        
        console.log('Event listeners bound successfully');
    }

    // Main Click Handler - Event Delegation
    handleClick(e) {
        const target = e.target;
        
        // Prevent default for hash links
        if (target.matches('a[href="#"]')) {
            e.preventDefault();
        }
        
        // Navigation links
        const pageLink = target.closest('[data-page]');
        if (pageLink) {
            e.preventDefault();
            const pageId = pageLink.getAttribute('data-page');
            this.showPage(pageId);
            
            // Close mobile menu if open
            if (target.closest('.mobile-nav-link')) {
                this.closeMobileMenu();
            }
            return;
        }

        // Mobile menu toggle
        if (target.closest('.mobile-menu-toggle')) {
            e.preventDefault();
            this.toggleMobileMenu();
            return;
        }

        // Mobile menu close
        if (target.closest('.mobile-menu-close') || target.matches('.mobile-menu-overlay')) {
            e.preventDefault();
            this.closeMobileMenu();
            return;
        }

        // Frame buttons
        const frameBtn = target.closest('.frame-btn');
        if (frameBtn) {
            e.preventDefault();
            this.handleFrameAction(frameBtn);
            return;
        }

        // Category filter buttons
        const categoryBtn = target.closest('.category-filter');
        if (categoryBtn) {
            e.preventDefault();
            const category = categoryBtn.getAttribute('data-category') || 'all';
            this.filterByCategory(category);
            this.updateCategoryButtons(categoryBtn);
            return;
        }

        // Related term tags
        const relatedTag = target.closest('.related-tag');
        if (relatedTag) {
            e.preventDefault();
            const relatedId = relatedTag.getAttribute('data-related');
            this.scrollToTerm(relatedId);
            return;
        }

        // General button animation
        const btn = target.closest('.btn');
        if (btn) {
            this.animateButton(btn);
        }
    }

    // Keyboard Handler
    handleKeydown(e) {
        if (e.key === 'Escape' && this.mobileMenuOpen) {
            this.closeMobileMenu();
        }
    }

    // Input Handler for Search
    handleInput(e) {
        if (e.target.id === 'dictionary-search') {
            const searchTerm = e.target.value.toLowerCase().trim();
            this.searchDictionary(searchTerm);
        }
    }

    // Scroll Handler
    handleScroll() {
        const header = document.getElementById('header');
        if (header) {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
    }

    // Page Navigation
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
        const selectedPage = document.getElementById(pageId);
        selectedPage.classList.add('active');
        this.currentPage = pageId;

        // Initialize dictionary if on dictionary page
        if (pageId === 'dictionary' && this.dictionaryData.length > 0) {
            this.updateDictionaryDisplay();
            this.updateResultsCount();
        }

        // Update navigation
        this.updateNavigationState();
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Update Navigation Active States
    updateNavigationState() {
        // Clear all active states
        document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
            link.classList.remove('active');
        });

        // Set active states for current page
        document.querySelectorAll(`[data-page="${this.currentPage}"]`).forEach(link => {
            if (link.classList.contains('nav-link') || link.classList.contains('mobile-nav-link')) {
                link.classList.add('active');
            }
        });
    }

    // Mobile Menu Management
    toggleMobileMenu() {
        this.mobileMenuOpen = !this.mobileMenuOpen;
        if (this.mobileMenuOpen) {
            this.openMobileMenu();
        } else {
            this.closeMobileMenu();
        }
    }

    openMobileMenu() {
        const mobileMenu = document.querySelector('.mobile-menu');
        const overlay = document.querySelector('.mobile-menu-overlay');
        const toggleBtn = document.querySelector('.mobile-menu-toggle');

        if (mobileMenu && overlay) {
            mobileMenu.classList.add('active');
            overlay.classList.add('active');
            if (toggleBtn) {
                toggleBtn.classList.add('active');
                toggleBtn.setAttribute('aria-expanded', 'true');
            }
            document.body.style.overflow = 'hidden';
            this.mobileMenuOpen = true;
        }
    }

    closeMobileMenu() {
        const mobileMenu = document.querySelector('.mobile-menu');
        const overlay = document.querySelector('.mobile-menu-overlay');
        const toggleBtn = document.querySelector('.mobile-menu-toggle');

        if (mobileMenu && overlay) {
            mobileMenu.classList.remove('active');
            overlay.classList.remove('active');
            if (toggleBtn) {
                toggleBtn.classList.remove('active');
                toggleBtn.setAttribute('aria-expanded', 'false');
            }
            document.body.style.overflow = '';
            this.mobileMenuOpen = false;
        }
    }

    // Frame Action Handler
    handleFrameAction(button) {
        const action = button.getAttribute('data-action');
        this.animateButton(button);

        switch (action) {
            case 'reset-filters':
                // Reset search and category filters
                const searchInput = document.getElementById('dictionary-search');
                if (searchInput) searchInput.value = '';
                
                // Reset category to 'all'
                const allCategoryBtn = document.querySelector('.category-filter[data-category="all"]');
                if (allCategoryBtn) {
                    this.filterByCategory('all');
                    this.updateCategoryButtons(allCategoryBtn);
                }
                
                this.showUserFeedback('Filters cleared!', 'success');
                break;
            
            case 'random-term':
                // Show a random dictionary term
                if (this.dictionaryData.length > 0) {
                    const randomIndex = Math.floor(Math.random() * this.dictionaryData.length);
                    const randomTerm = this.dictionaryData[randomIndex];
                    
                    // Filter to just this term
                    this.filteredDictionary = [randomTerm];
                    this.updateDictionaryDisplay();
                    this.updateResultsCount();
                    
                    this.showUserFeedback(`Random term: ${randomTerm.term}`, 'info');
                    
                    // Reset after 10 seconds
                    setTimeout(() => {
                        this.filterByCategory(this.currentCategory);
                    }, 10000);
                } else {
                    this.showUserFeedback('Dictionary not loaded yet', 'warning');
                }
                break;
            case 'share':
                this.handleShare();
                break;
            default:
                this.showUserFeedback('Feature coming soon!', 'info');
        }
    }

    // Share Functionality
    handleShare() {
        if (navigator.share) {
            navigator.share({
                title: 'ReasonPath™ - AI Learning Platform',
                text: 'Check out this AI learning platform',
                url: window.location.href
            }).catch(err => console.log('Share cancelled'));
        } else {
            navigator.clipboard.writeText(window.location.href).then(() => {
                this.showUserFeedback('Link copied to clipboard!', 'success');
            }).catch(() => {
                this.showUserFeedback('Unable to share', 'error');
            });
        }
    }

    // Button Animation
    animateButton(button) {
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            button.style.transform = '';
        }, 150);
    }

    // User Feedback System
    showUserFeedback(message, type = 'info') {
        let feedback = document.getElementById('user-feedback');
        if (!feedback) {
            feedback = document.createElement('div');
            feedback.id = 'user-feedback';
            feedback.style.cssText = `
                position: fixed;
                top: 100px;
                right: 20px;
                padding: 12px 20px;
                border-radius: 8px;
                color: white;
                font-weight: 500;
                z-index: 10000;
                max-width: 300px;
                opacity: 0;
                transform: translateX(100%);
                transition: all 0.3s ease;
                box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            `;
            document.body.appendChild(feedback);
        }

        // Set message and color
        feedback.textContent = message;
        const colors = {
            'info': '#00407A',
            'success': '#28A745',
            'error': '#DC3545',
            'warning': '#FFC107'
        };
        feedback.style.backgroundColor = colors[type] || colors.info;

        // Show feedback
        setTimeout(() => {
            feedback.style.opacity = '1';
            feedback.style.transform = 'translateX(0)';
        }, 10);

        // Hide after delay
        setTimeout(() => {
            feedback.style.opacity = '0';
            feedback.style.transform = 'translateX(100%)';
        }, 3000);
    }

    // DICTIONARY FUNCTIONALITY - FIXED IMPLEMENTATION

    // Load Dictionary Data
    async loadDictionaryData() {
        const dictionaryGrid = document.getElementById('dictionary-grid');
        const countElement = document.getElementById('results-count');
        
        // Show loading state
        if (dictionaryGrid) {
            dictionaryGrid.innerHTML = `
                <div class="loading-message" style="text-align: center; padding: 2rem;">
                    <p style="color: #00407A; font-weight: 500;">Loading dictionary terms...</p>
                    <div style="margin-top: 1rem; width: 100%; height: 4px; background: #e2e8f0; border-radius: 2px; overflow: hidden;">
                        <div style="height: 100%; width: 50%; background: linear-gradient(90deg, #E55A00, #00407A); 
                                animation: loading-bar 1.5s infinite;"></div>
                    </div>
                </div>
                <style>
                    @keyframes loading-bar {
                        0% { transform: translateX(-100%); }
                        100% { transform: translateX(200%); }
                    }
                </style>
            `;
        }
        
        if (countElement) {
            countElement.textContent = 'Loading...';
        }

        try {
            const response = await fetch('data/dictionary.json');
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            this.dictionaryData = data;
            this.filteredDictionary = [...data];
            
            console.log(`Successfully loaded ${this.dictionaryData.length} dictionary terms`);
            
            // Update display
            this.updateDictionaryDisplay();
            this.updateResultsCount();
            
        } catch (error) {
            console.error('Failed to load dictionary:', error);
            
            // Show error state with helpful guidance
            if (dictionaryGrid) {
                dictionaryGrid.innerHTML = `
                    <div class="error-message" style="text-align: center; padding: 2rem;">
                        <h4 style="color: #DC3545; margin-bottom: 1rem;">Failed to load dictionary</h4>
                        <p style="margin-bottom: 1rem;">Error: ${error.message}</p>
                        ${window.location.protocol === 'file:' ? `
                            <div style="background: #FFF3CD; padding: 1rem; border-radius: 8px; margin: 1rem auto; max-width: 500px;">
                                <h5 style="color: #856404; margin-bottom: 0.5rem;">Running locally?</h5>
                                <p style="color: #856404; margin-bottom: 0.5rem;">
                                    You need a local server to load the dictionary data:
                                </p>
                                <ol style="color: #856404; text-align: left;">
                                    <li>Open terminal in website folder</li>
                                    <li>Run: <code>python -m http.server 8000</code></li>
                                    <li>Open: <code>http://localhost:8000</code></li>
                                </ol>
                            </div>
                        ` : ''}
                        <button class="btn btn-primary" onclick="window.reasonPathApp.loadDictionaryData()">
                            Try Again
                        </button>
                    </div>
                `;
            }
            
            if (countElement) {
                countElement.textContent = 'Error loading terms';
            }
        }
    }

    // Search Dictionary
    searchDictionary(searchTerm) {
        if (!searchTerm) {
            // Reset to current category if no search term
            this.filterByCategory(this.currentCategory);
            return;
        }

        this.filteredDictionary = this.dictionaryData.filter(term => {
            const searchLower = searchTerm.toLowerCase();
            return (
                term.term.toLowerCase().includes(searchLower) ||
                term.definition.toLowerCase().includes(searchLower) ||
                term.category.toLowerCase().includes(searchLower) ||
                (term.analogy && term.analogy.toLowerCase().includes(searchLower)) ||
                (term.example && term.example.toLowerCase().includes(searchLower))
            );
        });

        // Apply category filter on top of search if not "all"
        if (this.currentCategory !== 'all') {
            this.filteredDictionary = this.filteredDictionary.filter(
                term => term.category === this.currentCategory
            );
        }

        this.updateDictionaryDisplay();
        this.updateResultsCount();
    }

    // Filter by Category
    filterByCategory(category) {
        this.currentCategory = category;
        const searchInput = document.getElementById('dictionary-search');
        const searchTerm = searchInput ? searchInput.value.toLowerCase().trim() : '';

        if (category === 'all') {
            this.filteredDictionary = searchTerm 
                ? this.dictionaryData.filter(term => this.matchesSearch(term, searchTerm))
                : [...this.dictionaryData];
        } else {
            this.filteredDictionary = this.dictionaryData.filter(term => {
                const matchesCategory = term.category === category;
                const matchesSearch = !searchTerm || this.matchesSearch(term, searchTerm);
                return matchesCategory && matchesSearch;
            });
        }

        this.updateDictionaryDisplay();
        this.updateResultsCount();
    }

    // Helper: Check if term matches search
    matchesSearch(term, searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        return (
            term.term.toLowerCase().includes(searchLower) ||
            term.definition.toLowerCase().includes(searchLower) ||
            (term.analogy && term.analogy.toLowerCase().includes(searchLower)) ||
            (term.example && term.example.toLowerCase().includes(searchLower))
        );
    }

    // Update Category Buttons
    updateCategoryButtons(activeButton) {
        document.querySelectorAll('.category-filter').forEach(btn => {
            btn.classList.remove('active');
            btn.style.background = '#e2e8f0';
            btn.style.color = '#4a5568';
        });
        
        activeButton.classList.add('active');
        activeButton.style.background = '#00407A';
        activeButton.style.color = 'white';
    }

    // Update Results Count
    updateResultsCount() {
        const countElement = document.getElementById('results-count');
        if (countElement) {
            const shown = this.filteredDictionary.length;
            const total = this.dictionaryData.length;
            countElement.textContent = `Showing ${shown} of ${total} terms`;
        }
    }

    // Update Dictionary Display
    updateDictionaryDisplay() {
        const dictionaryGrid = document.getElementById('dictionary-grid');
        if (!dictionaryGrid) return;

        if (this.filteredDictionary.length === 0) {
            dictionaryGrid.innerHTML = `
                <div class="no-results" style="text-align: center; padding: 3rem;">
                    <h4 style="color: #64748B;">No terms found</h4>
                    <p style="color: #94A3B8;">Try adjusting your search or category filter</p>
                </div>
            `;
            return;
        }

        // Use document fragment for performance with large datasets
        const fragment = document.createDocumentFragment();
        const container = document.createElement('div');
        container.style.cssText = 'display: grid; grid-template-columns: repeat(auto-fill, minmax(350px, 1fr)); gap: 1.5rem;';

        // Render each term - optimized for 1000+ terms
        this.filteredDictionary.forEach(term => {
            const termCard = this.createTermCard(term);
            container.appendChild(termCard);
        });

        fragment.appendChild(container);
        dictionaryGrid.innerHTML = '';
        dictionaryGrid.appendChild(fragment);
    }

    // Create Term Card Element
    createTermCard(term) {
        const card = document.createElement('div');
        card.className = 'dictionary-term';
        card.setAttribute('data-term-id', term.id);
        card.style.cssText = `
            background: white;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            padding: 1.5rem;
            transition: transform 0.2s, box-shadow 0.2s;
        `;

        // Build card HTML
        let cardHTML = `
            <div class="term-header" style="margin-bottom: 1rem;">
                <h3 style="color: #00407A; font-size: 1.25rem; margin: 0 0 0.5rem 0;">${term.term}</h3>
                <div style="display: flex; gap: 0.5rem;">
                    <span style="background: #E8F4FD; color: #00407A; padding: 0.25rem 0.75rem; 
                                border-radius: 4px; font-size: 0.875rem;">${term.category}</span>
                    <span style="background: ${this.getDifficultyColor(term.difficulty)}; color: white; 
                                padding: 0.25rem 0.75rem; border-radius: 4px; font-size: 0.875rem;">
                        ${term.difficulty}
                    </span>
                </div>
            </div>
            <div style="color: #4A5568; line-height: 1.6;">
                <p style="margin: 0 0 1rem 0;">${term.definition}</p>
        `;

        if (term.analogy) {
            cardHTML += `
                <div style="background: #FFF9E6; padding: 1rem; border-radius: 6px; margin: 1rem 0;">
                    <h4 style="color: #E55A00; font-size: 0.875rem; margin: 0 0 0.5rem 0;">
                        💡 Think of it this way:
                    </h4>
                    <p style="margin: 0; color: #64748B;">${term.analogy}</p>
                </div>
            `;
        }

        if (term.example) {
            cardHTML += `
                <div style="background: #F8FAFC; padding: 1rem; border-radius: 6px; margin: 1rem 0;">
                    <h4 style="color: #64748B; font-size: 0.875rem; margin: 0 0 0.5rem 0;">Example:</h4>
                    <p style="margin: 0; color: #64748B;">${term.example}</p>
                </div>
            `;
        }

        if (term.related && term.related.length > 0) {
            cardHTML += `
                <div style="margin-top: 1rem;">
                    <h4 style="color: #64748B; font-size: 0.875rem; margin: 0 0 0.5rem 0;">Related:</h4>
                    <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
            `;
            
            term.related.forEach(relatedId => {
                const relatedTerm = this.dictionaryData.find(t => t.id === relatedId);
                if (relatedTerm) {
                    cardHTML += `
                        <span class="related-tag" data-related="${relatedId}" 
                              style="background: #E8F4FD; color: #00407A; padding: 0.25rem 0.5rem; 
                                     border-radius: 4px; font-size: 0.75rem; cursor: pointer;">
                            ${relatedTerm.term}
                        </span>
                    `;
                }
            });
            
            cardHTML += `
                    </div>
                </div>
            `;
        }

        cardHTML += '</div>';
        card.innerHTML = cardHTML;

        // Add hover effect
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-2px)';
            card.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
            card.style.boxShadow = '';
        });

        return card;
    }

    // Get Difficulty Color
    getDifficultyColor(difficulty) {
        const colors = {
            'Beginner': '#28A745',
            'Intermediate': '#FFC107',
            'Advanced': '#DC3545'
        };
        return colors[difficulty] || '#6C757D';
    }

    // Scroll to Term
    scrollToTerm(termId) {
        const termElement = document.querySelector(`[data-term-id="${termId}"]`);
        if (termElement) {
            termElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            // Highlight briefly
            termElement.style.background = '#FFF9E6';
            termElement.style.transition = 'background 0.3s';
            setTimeout(() => {
                termElement.style.background = '';
            }, 2000);
        }
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    window.reasonPathApp = new ReasonPathApp();
    console.log('ReasonPath™ platform initialized - Dictionary functionality fixed');
});