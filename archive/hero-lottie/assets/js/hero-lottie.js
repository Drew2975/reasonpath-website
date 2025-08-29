/**
 * ReasonPath Hero Lottie Controller
 * Production-grade implementation with performance optimization and accessibility
 */
class HeroLottieController {
  constructor() {
    this.base = null;
    this.struct = null;
    this.isReduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.okConn = !navigator.connection?.saveData &&
                  /(4g|wifi)/i.test(navigator.connection?.effectiveType || '4g');
    this.mountBase = document.getElementById('lottie-base');
    this.mountStruct = document.getElementById('lottie-struct');
    this.hero = document.querySelector('.hero-section');
    this.toggle = document.querySelector('.reveal-toggle');
    this._raf = 0;
    this._show = false;
    this._R = 0;
    
    // Performance monitoring
    this.loadStart = 0;
    this.loadComplete = 0;
  }

  /**
   * Initialize and load animations with connection-aware strategy
   */
  async loadAnimations() {
    if (this.isReduced || !this.okConn) {
      console.log('Using static fallback (reduced motion or slow connection)');
      return this.showStaticFallback();
    }

    console.log('Loading Lottie animations...');
    this.loadStart = performance.now();
    
    try {
      // Use script tag approach (ES6 imports fail with empty objects)
      const lottie = await this.loadLottieScript();
      
      if (!lottie || typeof lottie.loadAnimation !== 'function') {
        throw new Error('Lottie library failed to load or missing loadAnimation method');
      }
      
      // Load base animation first for faster paint
      console.log('Loading base particles...');
      const baseData = await fetch('/assets/lottie/hero-glassbox.json', {
        cache: 'no-store',
        credentials: 'same-origin'
      }).then(r => {
        if (!r.ok) throw new Error(`HTTP ${r.status} for ${r.url}`);
        return r.json();
      });
      
      this.base = lottie.loadAnimation({
        container: this.mountBase,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        animationData: baseData
      });

      // Load structure animation after idle callback
      const later = window.requestIdleCallback || ((fn) => setTimeout(fn, 120));
      later(async () => {
        try {
          console.log('Loading structure lines...');
          const structData = await fetch('/assets/lottie/hero-structure.json', {
            cache: 'no-store',
            credentials: 'same-origin'
          }).then(r => {
            if (!r.ok) throw new Error(`HTTP ${r.status} for ${r.url}`);
            return r.json();
          });
          
          this.struct = lottie.loadAnimation({
            container: this.mountStruct,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData: structData
          });

          // Ensure SVGs use slice behavior for responsive scaling
          setTimeout(() => this.fixAspectRatio(), 0);
          
          this.loadComplete = performance.now();
          console.log(`Lottie load complete: ${(this.loadComplete - this.loadStart).toFixed(1)}ms`);
          
        } catch (error) {
          console.error('Structure animation failed:', error);
        }
      });

      this.wireLens();
      this.observeVisibility();
      
    } catch (error) {
      console.error('Lottie loading failed:', error);
      this.showStaticFallback();
    }
  }
  
  /**
   * Load Lottie via script tag (working method)
   */
  loadLottieScript() {
    return new Promise((resolve, reject) => {
      // Check if already loaded
      if (typeof window.lottie !== 'undefined') {
        resolve(window.lottie);
        return;
      }
      
      // Remove any existing script
      const existing = document.querySelector('script[src*="lottie"]');
      if (existing) existing.remove();
      
      // Load via script tag
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/lottie-web@5.12.2/build/player/lottie.min.js';
      script.onload = () => {
        if (typeof window.lottie !== 'undefined') {
          resolve(window.lottie);
        } else {
          reject(new Error('Lottie not found in window after script load'));
        }
      };
      script.onerror = () => reject(new Error('Lottie script failed to load'));
      document.head.appendChild(script);
    });
  }

  /**
   * Show static poster fallback
   */
  showStaticFallback() {
    const poster = document.querySelector('.hero-poster');
    if (poster) {
      poster.classList.add('is-visible');
      console.log('🖼️ Static poster fallback activated');
    }
  }

  /**
   * Fix SVG aspect ratio for responsive behavior
   */
  fixAspectRatio() {
    document.querySelectorAll('#lottie-base svg, #lottie-struct svg')
      .forEach(svg => {
        if (!svg.hasAttribute('data-aspect-fixed')) {
          svg.setAttribute('preserveAspectRatio', 'xMidYMid slice');
          svg.setAttribute('data-aspect-fixed', 'true');
        }
      });
  }

  /**
   * Wire lens interaction with RAF optimization
   */
  wireLens() {
    const finePointer = matchMedia('(pointer: fine)').matches;
    
    const setMask = (x, y, r) => {
      if (!this.mountStruct) return;
      
      const rect = this.mountStruct.getBoundingClientRect();
      this.mountStruct.style.setProperty('--mx', `${x - rect.left}px`);
      this.mountStruct.style.setProperty('--my', `${y - rect.top}px`);
      this.mountStruct.style.setProperty('--mr', `${r}px`);
    };

    const tick = (x, y) => {
      this._raf = 0;
      setMask(x, y, this._R);
    };

    // Fine pointer interactions (mouse)
    if (finePointer && this.hero) {
      this.hero.addEventListener('pointermove', (e) => {
        if (!this._show) return;
        
        const { clientX: x, clientY: y } = e;
        if (!this._raf) {
          this._raf = requestAnimationFrame(() => tick(x, y));
        }
      }, { passive: true });

      this.hero.addEventListener('pointerenter', () => {
        this._show = true;
        this._R = 180; // Lens radius
        console.log('👁️ Lens activated');
      });

      this.hero.addEventListener('pointerleave', () => {
        this._show = false;
        this._R = 0;
        setMask('50%', '50%', 0);
        console.log('👁️ Lens deactivated');
      });
    }

    // Accessibility toggle
    if (this.toggle) {
      this.toggle.addEventListener('click', () => {
        const pressed = this.toggle.getAttribute('aria-pressed') === 'true';
        this.toggle.setAttribute('aria-pressed', String(!pressed));
        this._show = !pressed;
        this._R = pressed ? 0 : 180;
        setMask('50%', '50%', this._R);
        
        console.log(`🎛️ Structure toggle: ${!pressed ? 'ON' : 'OFF'}`);
      });
    }
  }

  /**
   * Optimize battery usage with intersection observer
   */
  observeVisibility() {
    if (!this.hero) return;
    
    const observer = new IntersectionObserver(([entry]) => {
      const play = entry.isIntersecting;
      
      if (this.base) {
        play ? this.base.play() : this.base.pause();
      }
      
      if (this.struct) {
        play ? this.struct.play() : this.struct.pause();
      }
      
      console.log(`🎬 Animations ${play ? 'playing' : 'paused'}`);
    }, { threshold: 0.01 });

    observer.observe(this.hero);
  }

  /**
   * Get performance metrics
   */
  getPerformanceMetrics() {
    return {
      loadTime: this.loadComplete - this.loadStart,
      isReduced: this.isReduced,
      connection: navigator.connection?.effectiveType || 'unknown',
      animationsLoaded: Boolean(this.base && this.struct)
    };
  }
}

/**
 * Initialize when DOM is ready
 */
function initHeroLottie() {
  console.log('🎯 Initializing ReasonPath Hero Lottie...');
  const controller = new HeroLottieController();
  controller.loadAnimations();
  
  // Expose controller for debugging
  if (typeof window !== 'undefined') {
    window.heroLottieController = controller;
  }
}

// Auto-initialize
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initHeroLottie);
} else {
  initHeroLottie();
}
