/**
 * ReasonPath™ Utilities Module
 * Shared utility functions for the application
 */

/**
 * Security: HTML escape function to prevent XSS
 * @param {string} str - String to escape
 * @returns {string} - Escaped HTML string
 */
export function escapeHTML(str) {
    if (typeof str !== 'string') return str;
    return str.replace(/[&<>"']/g, function(match) {
        return {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;'
        }[match];
    });
}

/**
 * Show toast notification
 * @param {string} message - Message to display
 * @param {string} type - Type of notification (info, success, error)
 */
export function showToast(message, type = 'info') {
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

/**
 * Animate button click
 * @param {HTMLElement} button - Button element to animate
 */
export function animateButton(button) {
    button.style.transform = 'scale(0.95)';
    setTimeout(() => {
        button.style.transform = 'scale(1)';
    }, 150);
}

/**
 * Handle share functionality
 */
export function handleShare() {
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

/**
 * Scroll to specific term in dictionary
 * @param {string} termId - ID of term to scroll to
 */
export function scrollToTerm(termId) {
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