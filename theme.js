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

  const sunIcon  = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:14px;height:14px;"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>';
  const moonIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:14px;height:14px;"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';

  function initSidebarThemeSelector() {
    const nav = document.querySelector('.sidebar-nav');
    if (!nav || document.getElementById('theme-selector-item')) return;

    const style = document.createElement('style');
    style.textContent = `
      html[data-theme="dark"] {
        --bg: #0A0A0A; --surface: #171717; --surface-2: #262626;
        --border: #333333; --text: #EDEDED; --muted: #A1A1A1;
        --accent: #F97316; --accent-lt: rgba(255, 255, 255, 0.05);
        --accent-dk: #EA580C; --green: #22C55E;
        --green-lt: rgba(16, 185, 129, 0.12); --sh: 0 10px 40px -10px rgba(0, 0, 0, 0.8);
      }
      /* Estilização dos links da Sidebar para combinar com o Tema */
      .sidebar-link { margin: 2px 12px; border-radius: 10px; transition: all 0.2s; }
      .sidebar-link.active {
        background: var(--accent) !important;
        color: #fff !important;
        box-shadow: 0 4px 12px rgba(249, 115, 22, 0.25);
      }
      .sidebar-link.active svg {
        stroke: #fff !important;
      }
      .theme-section { margin-top: 16px; padding-top: 12px; border-top: 1px solid var(--border); }
      .theme-label { 
        padding: 0 16px; margin-bottom: 8px;
        color: var(--muted); font-size: 11px; font-weight: 700; 
        text-transform: uppercase; letter-spacing: 0.05em;
      }
      .theme-options { 
        display: flex; gap: 6px; padding: 6px; margin: 0 12px 12px;
        background: var(--surface-2); border-radius: 12px; border: 1px solid var(--border);
      }
      .theme-opt-btn {
        flex: 1; height: 32px; border-radius: 8px; border: 0;
        background: transparent; color: var(--muted); font-size: 11px;
        font-weight: 600; cursor: pointer; transition: all 0.2s;
        display: flex; align-items: center; justify-content: center; gap: 6px;
      }
      .theme-opt-btn:hover { border-color: var(--accent); color: var(--text); }
      .theme-opt-btn.active { 
        background: var(--accent); border-color: var(--accent); color: #fff; 
        box-shadow: 0 4px 12px rgba(249, 115, 22, 0.2);
      }
    `;
    document.head.appendChild(style);

    const isDark = localStorage.getItem(KEY) === 'dark';
    const container = document.createElement('div');
    container.id = 'theme-selector-item';
    container.className = 'theme-section';
    container.innerHTML = `
      <div class="theme-label">Tema</div>
      <div class="theme-options">
        <button class="theme-opt-btn ${!isDark ? 'active' : ''}" data-theme-val="light">
          ${sunIcon} Claro
        </button>
        <button class="theme-opt-btn ${isDark ? 'active' : ''}" data-theme-val="dark">
          ${moonIcon} Escuro
        </button>
      </div>
    `;

    const buttons = container.querySelectorAll('.theme-opt-btn');

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const val = btn.dataset.themeVal;
        applyTheme(val === 'dark');
        localStorage.setItem(KEY, val);
        
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      });
    });

    nav.appendChild(container);
  }

  window.addEventListener('storage', (e) => {
    if (e.key !== KEY) return;
    applyTheme(e.newValue === 'dark');
    const buttons = document.querySelectorAll('.theme-opt-btn');
    buttons.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.themeVal === e.newValue);
    });
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSidebarThemeSelector);
  } else {
    initSidebarThemeSelector();
  }
})();
