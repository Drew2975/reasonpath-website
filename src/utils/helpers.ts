// Utility Functions - Shared helper functions for security and UI feedback
// Contains security utilities and user interface helpers

export type ToastType = 'info' | 'success' | 'error';

/**
 * Security: HTML escape function to prevent XSS attacks
 * Escapes dangerous HTML characters in user-generated content
 */
export function escapeHTML(str: unknown): string {
    if (typeof str !== 'string') return String(str);
    
    return str.replace(/[&<>"']/g, function(match) {
        const escapeMap: Record<string, string> = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;'
        };
        return escapeMap[match];
    });
}

/**
 * Toast notification system for user feedback
 * Creates temporary notifications with different styles based on message type
 */
export function showToast(message: string, type: ToastType = 'info'): void {
    const toast = document.createElement('div');
    
    const colors = {
        success: '#10B981',
        error: '#EF4444',
        info: '#00407A'
    };
    
    toast.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${colors[type]};
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

    // Slide in animation
    setTimeout(() => {
        toast.style.transform = 'translateX(0)';
    }, 100);

    // Slide out and remove after delay
    setTimeout(() => {
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }, 3000);
}
