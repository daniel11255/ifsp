/**
 * Portal 1INFO-2 — Dark Mode Toggle
 * Floating button, top-right, syncs across tabs via localStorage.
 */
(function () {
  'use strict';

  const ATTR = 'data-theme';
  const KEY  = 'theme';

  function applyTheme(dark) {
    if (dark) document.documentElement.setAttribute(ATTR, 'dark');
    else document.documentElement.removeAttribute(ATTR);
  }

  applyTheme(localStorage.getItem(KEY) === 'dark');

  const sunIcon  = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>';
  const moonIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';

  function playClick() {
    try {
      const ctx  = new (window.AudioContext || window.webkitAudioContext)();
      const osc  = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1200, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.15);
    } catch (_) {}
  }

  function createToggleButton() {
    if (document.getElementById('theme-toggle-float')) return;

    const style = document.createElement('style');
    style.textContent = `
      #theme-toggle-float {
        position: fixed; top: 14px; right: 18px; z-index: 9999;
        width: 34px; height: 34px; border-radius: 50%;
        background: var(--surface, #FDFBF8); border: 1px solid var(--border, #D9D0C3);
        color: var(--text, #1E1711);
        display: flex; align-items: center; justify-content: center;
        cursor: pointer; box-shadow: var(--sh); transition: all 0.3s cubic-bezier(0.4,0,0.2,1);
        padding: 0; line-height: 0;
      }
      #theme-toggle-float span {
        display: flex; align-items: center; justify-content: center;
        width: 16px; height: 16px; will-change: transform, opacity;
      }
      #theme-toggle-float:active { transform: scale(0.9); }
      .theme-jump { animation: iconJump 0.7s cubic-bezier(0.34,1.56,0.64,1); }
      @keyframes iconJump {
        0%   { transform: translateY(0)    rotate(0)      scale(1);   }
        50%  { transform: translateY(40px) rotate(180deg) scale(1.4); }
        100% { transform: translateY(0)    rotate(360deg) scale(1);   }
      }
    `;
    document.head.appendChild(style);

    const btn      = document.createElement('button');
    btn.id         = 'theme-toggle-float';
    btn.setAttribute('aria-label', 'Alternar tema claro/escuro');
    const iconSpan = document.createElement('span');
    iconSpan.innerHTML = localStorage.getItem(KEY) === 'dark' ? moonIcon : sunIcon;
    btn.appendChild(iconSpan);

    let throttled = false;
    btn.addEventListener('click', () => {
      if (throttled) return;
      throttled = true;
      setTimeout(() => { throttled = false; }, 900);

      const isDark   = document.documentElement.getAttribute(ATTR) === 'dark';
      const newTheme = isDark ? 'light' : 'dark';

      playClick();
      applyTheme(newTheme === 'dark');
      localStorage.setItem(KEY, newTheme);

      iconSpan.classList.remove('theme-jump');
      void iconSpan.offsetWidth;
      iconSpan.classList.add('theme-jump');

      setTimeout(() => {
        iconSpan.innerHTML = newTheme === 'dark' ? moonIcon : sunIcon;
      }, 350);
    });

    document.body.appendChild(btn);
  }

  window.addEventListener('storage', (e) => {
    if (e.key !== KEY) return;
    applyTheme(e.newValue === 'dark');
    const btn = document.getElementById('theme-toggle-float');
    if (btn) btn.querySelector('span').innerHTML = e.newValue === 'dark' ? moonIcon : sunIcon;
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createToggleButton);
  } else {
    createToggleButton();
  }
})();
