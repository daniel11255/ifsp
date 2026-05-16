/**
 * Portal 1INFO-2 — Dark Mode Toggle
 * Floating button, bottom-right, syncs across tabs
 */
(function () {
  'use strict';

  const initTheme = () => {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') document.documentElement.setAttribute('data-theme', 'dark');
  };

  const createToggleButton = () => {
    const existing = document.getElementById('theme-toggle-float');
    if (existing) existing.remove();

    const style = document.createElement('style');
    style.id = 'theme-toggle-styles';
    style.textContent = `
      #theme-toggle-float {
        position: fixed;
        bottom: 28px;
        right: 20px;
        z-index: 9999;
        background: var(--surface, #FDFBF8);
        border: 1px solid var(--border, #D9D0C3);
        border-radius: 50%;
        width: 46px;
        height: 46px;
        cursor: pointer;
        font-size: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 20px rgba(30,20,10,.14), 0 1px 4px rgba(30,20,10,.08);
        transition: transform 0.25s cubic-bezier(.34,1.56,.64,1), box-shadow 0.2s ease;
        line-height: 1;
      }
      #theme-toggle-float:hover {
        transform: scale(1.12) rotate(14deg);
        box-shadow: 0 8px 32px rgba(184,92,42,.22);
      }
      #theme-toggle-float:active {
        transform: scale(0.92);
      }
      @media (max-width: 640px) {
        #theme-toggle-float {
          bottom: 80px;
          right: 16px;
          width: 42px;
          height: 42px;
          font-size: 18px;
        }
      }
    `;
    document.head.appendChild(style);

    const btn = document.createElement('button');
    btn.id = 'theme-toggle-float';
    btn.type = 'button';
    btn.setAttribute('aria-label', 'Alternar tema claro/escuro');
    document.body.appendChild(btn);
    return btn;
  };

  const updateIcon = (btn) => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    btn.textContent = isDark ? '☀️' : '🌙';
  };

  const toggleTheme = (btn) => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    if (isDark) {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    }
    updateIcon(btn);
  };

  window.addEventListener('storage', (e) => {
    if (e.key === 'theme') {
      const btn = document.getElementById('theme-toggle-float');
      if (!btn) return;
      if (e.newValue === 'dark') document.documentElement.setAttribute('data-theme', 'dark');
      else document.documentElement.removeAttribute('data-theme');
      updateIcon(btn);
    }
  });

  const init = () => {
    initTheme();
    const btn = createToggleButton();
    updateIcon(btn);
    btn.addEventListener('click', () => toggleTheme(btn));
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
