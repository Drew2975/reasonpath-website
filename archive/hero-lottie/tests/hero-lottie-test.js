/**
 * ReasonPath Hero Lottie Controller - Test Version
 * Fixed for testing from /tests/ directory
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
    
    // Fixed performance monitoring
    this.loadStart = performance.now();
    this.loadComplete = 0;
  }

  /**
   * Get correct asset paths for test environment
   */
  getAssetPaths() {
    // Detect if we're in test directory
    const isTestDir = window.location.pathname.includes('/tests/');
    const basePath = isTestDir ? '../assets/lottie/' : '/assets/lottie/';
    
    return {
      base: `${basePath}hero-glassbox.json`,
      structure: `${basePath}hero-structure.json`
    };
  }

  /**
   * Initialize and load animations with improved error handling
   */
  async loadAnimations() {
    if (this.isReduced || !this.okConn) {
      console.log('⚡ Using static fallback (reduced motion or slow connection)');
      return this.showStaticFallback();
    }

    console.log('🎬 Loading Lottie animations...');
    this.loadStart = performance.now();
    
    try {
      // Test file access first
      const paths = this.getAssetPaths();
      console.log(`📁 Testing paths: ${JSON.stringify(paths)}`);
      
      // Lazy load lottie-web
      console.log('📦 Loading Lottie library...');
      const lottieModule = await import('https://unpkg.com/lottie-web/build/player/lottie_light.min.js');
      const lottie = lottieModule.default || lottieModule;
      
      if (!lottie || typeof lottie.loadAnimation !== 'function') {
        throw new Error('Lottie library failed to load or missing loadAnimation method');
      }
      
      console.log('✅ Lottie library loaded and ready');
      
      // Load base animation first
      console.log('📦 Loading base particles...');
      const baseResponse = await fetch(paths.base);
      
      if (!baseResponse.ok) {
        throw new Error(`Base file failed: ${baseResponse.status} ${baseResponse.statusText}`);
      }
      
      const baseData = await baseResponse.json();
      console.log(`📊 Base data: ${baseData.layers?.length || 0} layers, ${baseData.op} frames`);
      
      this.base = lottie.loadAnimation({
        container: this.mountBase,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        animationData: baseData
      });

      console.log('✅ Base animation created');

      // Load structure animation
      const later = window.requestIdleCallback || ((fn) => setTimeout(fn, 120));
      later(async () => {
        try {
          console.log('🏗️ Loading structure lines...');
          const structResponse = await fetch(paths.structure);
          
          if (!structResponse.ok) {
            throw new Error(`Structure file failed: ${structResponse.status} ${structResponse.statusText}`);
          }
          
          const structData = await structResponse.json();
          console.log(`📊 Structure data: ${structData.layers?.length || 0} layers`);
          
          this.struct = lottie.loadAnimation({
            container: this.mountStruct,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData: structData
          });

          // Fix aspect ratio
          setTimeout(() => this.fixAspectRatio(), 100);
          
          this.loadComplete = performance.now();
          const loadTime = this.loadComplete - this.loadStart;
          console.log(`✅ Full load complete: ${loadTime.toFixed(1)}ms`);
          
        } catch (error) {
          console.error('❌ Structure animation failed:', error);
        }
      });

      this.wireLens();
      this.observeVisibility();
      
    } catch (error) {
      console.error('❌ Lottie loading failed:', error);
      console.error('Stack:', error.stack);
      this.showStaticFallback();
    }
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
    const svgs = document.querySelectorAll('#lottie-base svg, #lottie-struct svg');
    console.log(`🔧 Fixing aspect ratio for ${svgs.length} SVGs`);
    
    svgs.forEach(svg => {
      if (!svg.hasAttribute('data-aspect-fixed')) {
        svg.setAttribute('preserveAspectRatio', 'xMidYMid slice');
        svg.setAttribute('data-aspect-fixed', 'true');
        console.log('✅ SVG aspect ratio fixed');
      }
    });
  }

  /**
   * Wire lens interaction with enhanced debugging
   */
  wireLens() {
    const finePointer = matchMedia('(pointer: fine)').matches;
    console.log(`🖱️ Fine pointer support: ${finePointer}`);
    
    const setMask = (x, y, r) => {
      if (!this.mountStruct) {
        console.warn('⚠️ Structure mount not available for mask');
        return;
      }
      
      const rect = this.mountStruct.getBoundingClientRect();
      this.mountStruct.style.setProperty('--mx', `${x - rect.left}px`);
      this.mountStruct.style.setProperty('--my', `${y - rect.top}px`);
      this.mountStruct.style.setProperty('--mr', `${r}px`);
      
      console.log(`🎯 Mask set: (${x-rect.left}, ${y-rect.top}) r=${r}`);
    };

    const tick = (x, y) => {
      this._raf = 0;
      setMask(x, y, this._R);
    };

    // Fine pointer interactions
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
        this._R = 180;
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
        
        console.log(`🎛️ Structure toggle: ${!pressed ? 'ON' : 'OFF'} (radius: ${this._R}px)`);
      });
    }
  }

  /**
   * Battery optimization with intersection observer
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
      
      console.log(`🎬 Animations ${play ? 'playing' : 'paused'} (intersection: ${entry.intersectionRatio.toFixed(2)})`);
    }, { threshold: 0.01 });

    observer.observe(this.hero);
  }

  /**
   * Get performance metrics with proper timing
   */
  getPerformanceMetrics() {
    const loadTime = this.loadComplete > 0 ? this.loadComplete - this.loadStart : -1;
    
    return {
      loadTime: loadTime,
      isReduced: this.isReduced,
      connection: navigator.connection?.effectiveType || 'unknown',
      animationsLoaded: Boolean(this.base && this.struct),
      baseLoaded: Boolean(this.base),
      structLoaded: Boolean(this.struct)
    };
  }
}

/**
 * Initialize with enhanced debugging
 */
function initHeroLottie() {
  console.log('🎯 Initializing ReasonPath Hero Lottie (Test Version)...');
  console.log(`📍 Location: ${window.location.href}`);
  console.log(`📁 Path context: ${window.location.pathname}`);
  
  const controller = new HeroLottieController();
  controller.loadAnimations();
  
  // Expose controller globally for debugging
  window.heroLottieController = controller;
  
  // Log periodic status
  setInterval(() => {
    const metrics = controller.getPerformanceMetrics();
    console.log(`📊 Status check:`, metrics);
  }, 5000);
}

// Auto-initialize
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initHeroLottie);
} else {
  initHeroLottie();
}
