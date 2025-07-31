let currentTheme = 'dark'; // Default theme

/**
 * Applies the given theme to the document and saves it to localStorage.
 * @param {'light' | 'dark'} theme 
 */
function applyTheme(theme) {
  const root = document.documentElement;
  currentTheme = theme;

  if (theme === 'light') {
    root.classList.remove('dark');
  } else {
    root.classList.add('dark');
  }

  try {
    localStorage.setItem('theme', theme);
  } catch (e) {
    console.warn("Could not save theme preference to localStorage.");
  }
  
  // Dispatch a custom event to notify components of the theme change
  window.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme } }));
}

/**
 * Toggles the theme between 'light' and 'dark'.
 */
export function toggleTheme() {
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  applyTheme(newTheme);
};

/**
 * Initializes the theme based on localStorage or system preference.
 * Should be called once when the application loads.
 */
export function initTheme() {
  let initialTheme = 'dark';
  try {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'light' || storedTheme === 'dark') {
      initialTheme = storedTheme;
    }
  } catch (e) {
    console.warn("Could not access localStorage for theme preference.");
  }
  applyTheme(initialTheme);
}

/**
 * Returns the current theme.
 * @returns {'light' | 'dark'}
 */
export function getTheme() {
    return currentTheme;
}