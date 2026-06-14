// Ripple effect component
'use client';

import { useEffect } from 'react';

export default function RippleEffect() {
  useEffect(() => {
    const createRipple = (e: MouseEvent) => {
      const ripple = document.createElement('div');
      ripple.className = 'ripple';
      ripple.style.left = `${e.clientX}px`;
      ripple.style.top = `${e.clientY}px`;
      ripple.style.width = '40px';
      ripple.style.height = '40px';

      document.body.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 800);
    };

    document.addEventListener('click', createRipple);

    return () => {
      document.removeEventListener('click', createRipple);
    };
  }, []);

  return null;
}
