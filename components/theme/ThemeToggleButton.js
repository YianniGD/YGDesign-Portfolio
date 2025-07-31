import { toggleTheme, getTheme } from './theme.js';
import { MoonIcon, SunIcon } from '../icons.js';

export default function ThemeToggleButton() {
    const button = document.createElement('button');
    button.className = "relative inline-flex items-center justify-center w-10 h-10 rounded-full text-slate-500 dark:text-text-secondary hover:bg-slate-200 dark:hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent transition-all duration-300 transform hover:scale-110";
    
    const srOnlySpan = document.createElement('span');
    srOnlySpan.className = 'sr-only';
    srOnlySpan.textContent = 'Toggle theme';

    const sunContainer = document.createElement('div');
    const moonContainer = document.createElement('div');

    const updateIcons = (theme) => {
        button.setAttribute('aria-label', theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme');
        sunContainer.className = `transition-all duration-300 transform ${theme === 'light' ? 'rotate-0 scale-100' : '-rotate-90 scale-0'}`;
        moonContainer.className = `absolute transition-all duration-300 transform ${theme === 'dark' ? 'rotate-0 scale-100' : 'rotate-90 scale-0'}`;
    };

    sunContainer.innerHTML = SunIcon({ className: "h-6 w-6 text-sky-500" });
    moonContainer.innerHTML = MoonIcon({ className: "h-6 w-6 text-text-secondary" });

    button.append(srOnlySpan, sunContainer, moonContainer);

    button.addEventListener('click', toggleTheme);
    window.addEventListener('themeChanged', (e) => updateIcons(e.detail.theme));
    
    // Set initial state
    updateIcons(getTheme());

    return button;
}
