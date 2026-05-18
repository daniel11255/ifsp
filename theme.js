/**
 * Portal 1INFO-2 — Dark Mode Toggle
 * Floating button, bottom-right, syncs across tabs
 */
(function () {
  'use strict';

  const initTheme = () => {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') document.documentElement.setAttribute('data-theme', 'dark');
    else document.documentElement.removeAttribute('data-theme');
  };

  const sunIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>';
  const moonIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';

  const createToggleButton = () => {
    if (document.getElementById('theme-toggle-float')) return;
    const style = document.createElement('style');
    style.textContent = `
      #theme-toggle-float {
        position: fixed; top: 14px; right: 18px; z-index: 9999;
        width: 34px; height: 34px; border-radius: 50%;
        background: var(--surface, #FDFBF8); border: 1px solid var(--border, #D9D0C3);
        color: var(--text, #1E1711); display: flex; align-items: center;
        justify-content: center; cursor: pointer;
        box-shadow: var(--sh); transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        padding: 0; line-height: 0;
      }
      #theme-toggle-float span {
        display: flex; align-items: center; justify-content: center;
        width: 16px; height: 16px; will-change: transform, opacity;
      }
      .theme-jump {
        animation: iconJump 0.7s cubic-bezier(0.34, 1.56, 0.64, 1);
      }
      @keyframes iconJump {
        0% { transform: translateY(0) rotate(0); }
        50% { transform: translateY(40px) rotate(180deg) scale(1.4); }
        100% { transform: translateY(0) rotate(360deg) scale(1); }
      }
      #theme-toggle-float:active { transform: scale(0.9); }
    `;
    document.head.appendChild(style);

    const btn = document.createElement('button');
    btn.id = 'theme-toggle-float';
    const iconSpan = document.createElement('span');
    iconSpan.innerHTML = localStorage.getItem('theme') === 'dark' ? moonIcon : sunIcon;
    btn.appendChild(iconSpan);

    btn.onclick = () => {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      const newTheme = isDark ? 'light' : 'dark';
      
      // Correção da lógica de atributo
      if (newTheme === 'dark') document.documentElement.setAttribute('data-theme', 'dark');
      else document.documentElement.removeAttribute('data-theme');
      
      localStorage.setItem('theme', newTheme);

      // Gatilho da animação de pulo
      iconSpan.classList.remove('theme-jump');
      void iconSpan.offsetWidth; // Reflow
      iconSpan.classList.add('theme-jump');

      // Troca o ícone no ápice do pulo (metade da animação)
      setTimeout(() => {
        iconSpan.innerHTML = newTheme === 'dark' ? moonIcon : sunIcon;
      }, 350);
    };

    document.body.appendChild(btn);
  };

  window.addEventListener('storage', (e) => {
    if (e.key === 'theme') {
      if (e.newValue === 'dark') document.documentElement.setAttribute('data-theme', 'dark');
      else document.documentElement.removeAttribute('data-theme');
      const btn = document.getElementById('theme-toggle-float');
      if (btn) btn.querySelector('span').innerHTML = e.newValue === 'dark' ? moonIcon : sunIcon;
    }
  });

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => { initTheme(); createToggleButton(); });
  else { initTheme(); createToggleButton(); }
})();
