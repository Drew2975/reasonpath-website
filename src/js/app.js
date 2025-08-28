import config from './config.js';

class ReasonPathApp {
    constructor() {
        this.mobileMenuOpen = false;
        this.currentPage = 'home';
        
        // Dictionary state
        this.dictionaryData = [];
        this.filteredDictionary = [];
        this.dictionaryDataLoaded = false;
        this.dictionaryCurrentPage = 1;
        this.dictionaryItemsPerPage = 10; // Show 10 terms per page
        this.currentCategory = 'all';

        // Debounce search
        this.searchDebounceTimer = null;

        this.init();
    }

    init() {
        if (config.logLevel === 'debug') {
            console.log('ReasonPath™ initializing in debug mode...');
        }
        this.bindEvents();
        this.updateNavigation();
        console.log('ReasonPath™ ready.');
    }

    bindEvents() {
        document.addEventListener('click', (e) => {
            const target = e.target;

            // Navigation clicks
            const navLink = target.closest('[data-page]');
            if (navLink) {
                e.preventDefault();
                const pageId = navLink.getAttribute('data-page');
                this.showPage(pageId);
                if (navLink.closest('.mobile-nav-link')) {
                    this.closeMobileMenu();
                }
                return;
            }

            // Mobile menu toggle
            if (target.closest('.mobile-menu-toggle')) {
                this.toggleMobileMenu();
                return;
            }

            // Mobile menu close
            if (target.closest('.mobile-menu-close') || target.matches('.mobile-menu-overlay')) {
                this.closeMobileMenu();
                return;
            }

            // Frame buttons
            const frameBtn = target.closest('.frame-btn');
            if (frameBtn) {
                this.handleFrameAction(frameBtn);
                return;
            }

            // Dictionary category filter
            const categoryFilter = target.closest('.category-filter');
            if (categoryFilter) {
                const category = categoryFilter.getAttribute('data-category') || 'all';
                this.filterByCategory(category);
                this.updateCategoryButtons(categoryFilter);
                return;
            }

            // Dictionary related term click
            const relatedTag = target.closest('.related-tag');
            if (relatedTag) {
                const termId = relatedTag.getAttribute('data-related');
                if (termId) this.scrollToTerm(termId);
                return;
            }

            // Dictionary pagination
            const pageLink = target.closest('[data-page-number]');
            if (pageLink) {
                const pageNumber = pageLink.getAttribute('data-page-number');
                if (pageNumber === 'prev') {
                    this.dictionaryCurrentPage--;
                } else if (pageNumber === 'next') {
                    this.dictionaryCurrentPage++;
                } else {
                    this.dictionaryCurrentPage = parseInt(pageNumber, 10);
                }
                this.updateDictionaryDisplay();
                return;
            }

            // General button animation
            if (target.closest('.btn')) {
                this.animateButton(target.closest('.btn'));
            }
        });

        // Debounced search input
        document.addEventListener('input', (e) => {
            if (e.target.matches('#dictionary-search')) {
                clearTimeout(this.searchDebounceTimer);
                this.searchDebounceTimer = setTimeout(() => {
                    const searchTerm = e.target.value.toLowerCase().trim();
                    this.filterDictionary(searchTerm, this.currentCategory);
                }, 300);
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
        }, { passive: true });
    }

    // --- Dictionary Logic (Lazy Loading & Pagination) ---

    async loadDictionaryData() {
        if (this.dictionaryDataLoaded) return;

        const dictionaryGrid = document.querySelector('#dictionary-grid');
        const countElement = document.querySelector('#results-count');
        
        if (dictionaryGrid) {
            dictionaryGrid.innerHTML = `<div class="loading-message"><p>Loading glossary...</p></div>`;
        }

        try {
            const response = await fetch(config.apiBasePath + config.dictionaryPath);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            
            this.dictionaryData = await response.json();
            this.dictionaryDataLoaded = true;
            this.filteredDictionary = [...this.dictionaryData];
            
            if (config.logLevel === 'debug') {
                console.log(`Successfully loaded ${this.dictionaryData.length} glossary terms`);
            }

            this.dictionaryCurrentPage = 1;
            this.updateDictionaryDisplay();
            this.updateResultsCount();
            this.showToast(`AI Glossary loaded: ${this.dictionaryData.length} terms ready`, 'success');

        } catch (error) {
            console.error('Glossary loading failed:', error);
            if (dictionaryGrid) {
                dictionaryGrid.innerHTML = `<div class="no-results"><p>🚫 AI Glossary Loading Failed. Please try again later.</p></div>`;
            }
            if (countElement) {
                countElement.textContent = 'Loading failed';
            }
        }
    }

    updateDictionaryDisplay() {
        const dictionaryGrid = document.querySelector('#dictionary-grid');
        if (!dictionaryGrid) return;

        if (!this.dictionaryDataLoaded) return;

        if (this.filteredDictionary.length === 0) {
            dictionaryGrid.innerHTML = `<div class="no-results"><p>🔍 No terms found. Try adjusting your search.</p></div>`;
            document.querySelector('#pagination-controls').innerHTML = ''; // Clear pagination
            return;
        }

        // Pagination Calculations
        const startIndex = (this.dictionaryCurrentPage - 1) * this.dictionaryItemsPerPage;
        const endIndex = startIndex + this.dictionaryItemsPerPage;
        const pageItems = this.filteredDictionary.slice(startIndex, endIndex);

        const termsHTML = pageItems.map(term => this.renderTerm(term)).join('');
        dictionaryGrid.innerHTML = termsHTML;

        this.renderPaginationControls();
    }

    renderTerm(term) {
        const escape = this.escapeHTML;
        const analogyHTML = term.analogy ? `<div class="term-analogy"><h4>💡 Think of it this way:</h4><p>${escape(term.analogy)}</p></div>` : '';
        const exampleHTML = term.example ? `<div class="term-example"><h4>Example:</h4><p><code>${escape(term.example)}</code></p></div>` : '';
        const relatedHTML = term.related && term.related.length > 0 ? `<div class="term-related"><h4>Related terms:</h4><div class="related-tags">${term.related.map(id => {
            const relatedTerm = this.dictionaryData.find(t => t.id === id);
            return relatedTerm ? `<span class="related-tag" data-related="${escape(id)}">${escape(relatedTerm.term)}</span>` : '';
        }).join('')}</div></div>` : '';

        return `
            <div class="dictionary-term" data-term-id="${escape(term.id)}">
                <div class="term-header">
                    <h3 class="term-title">${escape(term.term)}</h3>
                    <div class="term-meta">
                        <span class="category-tag">${escape(term.category)}</span>
                        <span class="difficulty-tag difficulty-${escape(term.difficulty.toLowerCase())}">${escape(term.difficulty)}</span>
                    </div>
                </div>
                <div class="term-definition"><p>${escape(term.definition)}</p></div>
                ${analogyHTML}
                ${exampleHTML}
                ${relatedHTML}
            </div>
        `;
    }

    renderPaginationControls() {
        const controlsContainer = document.querySelector('#pagination-controls');
        if (!controlsContainer) return;

        const totalPages = Math.ceil(this.filteredDictionary.length / this.dictionaryItemsPerPage);
        if (totalPages <= 1) {
            controlsContainer.innerHTML = '';
            return;
        }

        let html = '<div class="pagination-nav">';

        // Previous Button
        html += `<button class="pagination-btn" data-page-number="prev" ${this.dictionaryCurrentPage === 1 ? 'disabled' : ''}>&laquo; Prev</button>`;

        // Page Numbers
        for (let i = 1; i <= totalPages; i++) {
            html += `<button class="pagination-btn ${i === this.dictionaryCurrentPage ? 'active' : ''}" data-page-number="${i}">${i}</button>`;
        }

        // Next Button
        html += `<button class="pagination-btn" data-page-number="next" ${this.dictionaryCurrentPage === totalPages ? 'disabled' : ''}>Next &raquo;</button>`;

        html += '</div>';
        controlsContainer.innerHTML = html;
    }

    filterDictionary(searchTerm = '', category = 'all') {
        if (!this.dictionaryDataLoaded) return;

        this.filteredDictionary = this.dictionaryData.filter(term => {
            const matchesSearch = !searchTerm || 
                term.term.toLowerCase().includes(searchTerm) ||
                term.definition.toLowerCase().includes(searchTerm);
            const matchesCategory = category === 'all' || term.category === category;
            return matchesSearch && matchesCategory;
        });

        this.dictionaryCurrentPage = 1; // Reset to first page on new filter
        this.updateDictionaryDisplay();
        this.updateResultsCount();
    }

    filterByCategory(category) {
        this.currentCategory = category;
        const searchInput = document.querySelector('#dictionary-search');
        const searchTerm = searchInput ? searchInput.value.toLowerCase().trim() : '';
        this.filterDictionary(searchTerm, category);
    }

    updateResultsCount() {
        const countElement = document.querySelector('#results-count');
        if (countElement) {
            const count = this.filteredDictionary.length;
            const total = this.dictionaryData.length;
            countElement.textContent = total > 0 ? `Showing ${count} of ${total} terms` : 'Loading...';
        }
    }

    updateCategoryButtons(activeButton) {
        document.querySelectorAll('.category-filter').forEach(btn => btn.classList.remove('active'));
        activeButton.classList.add('active');
    }

    // --- General App Logic ---

    showPage(pageId) {
        if (!pageId || !document.getElementById(pageId)) {
            console.warn(`Page "${pageId}" not found`);
            return;
        }

        document.querySelectorAll('.page-section').forEach(page => page.classList.remove('active'));
        document.getElementById(pageId).classList.add('active');
        this.currentPage = pageId;

        if (pageId === 'ai-glossary') {
            this.loadDictionaryData(); // Lazy load data on demand
        }

        this.updateNavigation();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    updateNavigation() {
        document.querySelectorAll('[data-page]').forEach(link => {
            if (link.matches('.nav-link, .mobile-nav-link')) {
                link.classList.toggle('active', link.getAttribute('data-page') === this.currentPage);
            }
        });
    }

    toggleMobileMenu() {
        this.mobileMenuOpen = !this.mobileMenuOpen;
        document.body.classList.toggle('mobile-menu--open', this.mobileMenuOpen);
        document.querySelector('.mobile-menu-toggle').setAttribute('aria-expanded', this.mobileMenuOpen);
    }

    closeMobileMenu() {
        if (!this.mobileMenuOpen) return;
        this.mobileMenuOpen = false;
        document.body.classList.remove('mobile-menu--open');
        document.querySelector('.mobile-menu-toggle').setAttribute('aria-expanded', 'false');
    }

    handleFrameAction(button) { /* ... as before ... */ }
    handleShare() { /* ... as before ... */ }
    animateButton(button) { /* ... as before ... */ }
    scrollToTerm(termId) { /* ... as before ... */ }
    showToast(message, type = 'info') { /* ... as before ... */ }
    escapeHTML(str) {
        const p = document.createElement('p');
        p.appendChild(document.createTextNode(str));
        return p.innerHTML;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.reasonPathApp = new ReasonPathApp();
});
