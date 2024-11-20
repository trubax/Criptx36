import { useEffect } from 'react';

export const useStandaloneMode = () => {
  useEffect(() => {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const isStandalone = window.navigator.standalone || 
                        window.matchMedia('(display-mode: standalone)').matches;

    if (isIOS && isStandalone) {
      // Previeni il comportamento "Fine" di Safari
      document.addEventListener('touchend', (e) => {
        const target = e.target as HTMLElement;
        if (target.tagName === 'A' || target.tagName === 'BUTTON') {
          e.preventDefault();
        }
      }, { passive: false });

      // Gestisci lo scroll
      document.addEventListener('touchmove', (e) => {
        const target = e.target as HTMLElement;
        if (!target.closest('.pwa-content, .scroll-container')) {
          e.preventDefault();
        }
      }, { passive: false });
    }
  }, []);
}; 