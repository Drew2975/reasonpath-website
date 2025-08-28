// Dictionary Fix - Target the specific issues
// 1. Category buttons not working
// 2. Dictionary loading failure  
// 3. "Browse all 150 terms" button dead

// Simple dictionary implementation that works
let dictionaryData = [];
let filteredData = [];
let currentCategory = 'all';

// Fix 1: Dictionary loading with proper error handling
async function loadDictionary() {
    console.log('Loading dictionary...');
    try {
        const response = await fetch('./data/dictionary.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        dictionaryData = data;
        filteredData = [...data];
        console.log(`Loaded ${data.length} dictionary terms`);
        displayDictionary();
        updateResultsCount();
    } catch (error) {
        console.error('Dictionary loading failed:', error);
        const grid = document.getElementById('dictionary-grid');
        if (grid) {
            grid.innerHTML = `
                <div class="no-results">
                    <p>Failed to load dictionary terms.</p>
                    <p>Error: ${error.message}</p>
                    <button onclick="loadDictionary()" class="btn btn-primary">Try Again</button>
                </div>
            `;
        }
    }
}

// Fix 2: Working category filter buttons
function setupCategoryButtons() {
    const categoryButtons = document.querySelectorAll('.category-filter');
    categoryButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const category = button.getAttribute('data-category');
            console.log('Category clicked:', category);
            
            // Update active button
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter dictionary
            filterByCategory(category);
        });
    });
}

// Category filtering logic
function filterByCategory(category) {
    currentCategory = category;
    const searchTerm = document.getElementById('dictionary-search')?.value.toLowerCase() || '';
    
    if (category === 'all') {
        filteredData = dictionaryData.filter(term => 
            !searchTerm || 
            term.term.toLowerCase().includes(searchTerm) ||
            term.definition.toLowerCase().includes(searchTerm) ||
            term.category.toLowerCase().includes(searchTerm)
        );
    } else {
        filteredData = dictionaryData.filter(term => {
            const matchesCategory = term.category === category;
            const matchesSearch = !searchTerm || 
                term.term.toLowerCase().includes(searchTerm) ||
                term.definition.toLowerCase().includes(searchTerm);
            return matchesCategory && matchesSearch;
        });
    }
    
    displayDictionary();
    updateResultsCount();
}

// Search functionality
function setupSearch() {
    const searchInput = document.getElementById('dictionary-search');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            console.log('Search term:', searchTerm);
            filterByCategory(currentCategory);
        });
    }
}

// Display dictionary terms
function displayDictionary() {
    const grid = document.getElementById('dictionary-grid');
    if (!grid) return;
    
    if (filteredData.length === 0) {
        grid.innerHTML = '<div class="no-results"><p>No terms found matching your criteria.</p></div>';
        return;
    }
    
    const termsHTML = filteredData.map(term => `
        <div class="dictionary-term" data-term-id="${term.id}">
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
                <h4>💡 Think of it this way:</h4>
                <p>${term.analogy}</p>
            </div>` : ''}
            ${term.example ? `<div class="term-example">
                <h4>Example:</h4>
                <p>${term.example}</p>
            </div>` : ''}
        </div>
    `).join('');
    
    grid.innerHTML = termsHTML;
}

// Update results count
function updateResultsCount() {
    const countElement = document.getElementById('results-count');
    if (countElement) {
        countElement.textContent = `Showing ${filteredData.length} of ${dictionaryData.length} terms`;
    }
}

// Fix 3: "Browse all 150 terms" button
function setupBrowseButton() {
    const browseButtons = document.querySelectorAll('.btn.btn-primary');
    browseButtons.forEach(button => {
        if (button.textContent.includes('Browse All 150')) {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('Browse all terms clicked');
                
                // Reset to show all terms
                const allButton = document.querySelector('.category-filter[data-category="all"]');
                if (allButton) {
                    allButton.click();
                }
                
                // Clear search
                const searchInput = document.getElementById('dictionary-search');
                if (searchInput) {
                    searchInput.value = '';
                }
                
                // Scroll to dictionary grid
                const grid = document.getElementById('dictionary-grid');
                if (grid) {
                    grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
                
                // Show feedback
                console.log('Showing all terms');
            });
        }
    });
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('Dictionary fix initializing...');
    
    // Only run if we're on the dictionary page or if dictionary elements exist
    const dictionaryGrid = document.getElementById('dictionary-grid');
    if (dictionaryGrid) {
        loadDictionary();
        setupCategoryButtons();
        setupSearch();
        setupBrowseButton();
        console.log('Dictionary fix complete');
    }
});

// Also initialize if page is already loaded
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    console.log('Page already loaded, initializing dictionary fix...');
    const dictionaryGrid = document.getElementById('dictionary-grid');
    if (dictionaryGrid) {
        loadDictionary();
        setupCategoryButtons();
        setupSearch();
        setupBrowseButton();
    }
}
