/**
 * ReasonPath™ Dictionary Module
 * Handles AI Glossary functionality - data loading, filtering, and display
 */

import { escapeHTML, showToast } from './utilities.js';

export class DictionaryManager {
    constructor() {
        this.dictionaryData = [];
        this.filteredDictionary = [];
        this.currentCategory = 'all';
    }

    /**
     * Load dictionary data from JSON file
     */
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
            showToast(`AI Glossary loaded: ${this.dictionaryData.length} terms ready`, 'success');
            
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
                        
                        <button class="btn btn-primary" onclick="window.reasonPathApp.dictionary.loadDictionaryData()" 
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

    /**
     * Update dictionary display
     */
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
                    <button class="btn btn-secondary" onclick="document.getElementById('dictionary-search').value=''; window.reasonPathApp.dictionary.filterDictionary('', 'all');" style="margin-top: 1rem;">
                        Clear Filters
                    </button>
                </div>
            `;
            return;
        }

        // Render dictionary terms with enhanced styling - SECURED AGAINST XSS
        const termsHTML = this.filteredDictionary.map(term => `
            <div class="dictionary-term" data-term-id="${escapeHTML(term.id)}" style="transition: all 0.3s ease;">
                <div class="term-header">
                    <h3 class="term-title">${escapeHTML(term.term)}</h3>
                    <div class="term-meta">
                        <span class="category-tag">${escapeHTML(term.category)}</span>
                        <span class="difficulty-tag difficulty-${escapeHTML(term.difficulty.toLowerCase())}">${escapeHTML(term.difficulty)}</span>
                    </div>
                </div>
                <div class="term-definition">
                    <p>${escapeHTML(term.definition)}</p>
                </div>
                ${term.analogy ? `<div class="term-analogy">
                    <h4 style="color: #0ea5e9; font-size: 0.875rem; margin: 0 0 0.5rem 0;">💡 Think of it this way:</h4>
                    <p style="font-style: italic;">${escapeHTML(term.analogy)}</p>
                </div>` : ''}
                ${term.example ? `<div class="term-example">
                    <h4 style="color: #64748b; font-size: 0.875rem; margin: 0 0 0.5rem 0;">Example:</h4>
                    <p><code style="background: #f1f5f9; padding: 2px 4px; border-radius: 3px; font-size: 0.9em;">${escapeHTML(term.example)}</code></p>
                </div>` : ''}
                ${term.related && term.related.length > 0 ? `<div class="term-related" style="margin-top: 1rem; padding-top: 1rem; border-top: 1px solid #e2e8f0;">
                    <h4 style="color: #64748b; font-size: 0.875rem; margin: 0 0 0.5rem 0;">Related terms:</h4>
                    <div class="related-tags">
                        ${term.related.map(relatedId => {
                            const relatedTerm = this.dictionaryData.find(t => t.id === relatedId);
                            return relatedTerm ? `<span class="related-tag" data-related="${escapeHTML(relatedId)}" style="cursor: pointer; transition: all 0.2s ease;">${escapeHTML(relatedTerm.term)}</span>` : '';
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

    /**
     * Filter dictionary based on search term and category
     * @param {string} searchTerm - Search query
     * @param {string} category - Category filter
     */
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

    /**
     * Filter by category
     * @param {string} category - Category to filter by
     */
    filterByCategory(category) {
        this.currentCategory = category;
        const searchInput = document.querySelector('#dictionary-search');
        const searchTerm = searchInput ? searchInput.value.toLowerCase().trim() : '';
        this.filterDictionary(searchTerm, category);
    }

    /**
     * Update results counter
     */
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

    /**
     * Update category filter buttons
     * @param {HTMLElement} activeButton - The active button element
     */
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
}