/**
 * A simple utility to concatenate CSS class names.
 * Filters out any falsy values.
 * @param {...(string | undefined | null | boolean)} classes - A list of class names.
 * @returns {string} A single string of space-separated class names.
 */
export function cn(...classes) {
    return classes.filter(Boolean).join(' ');
}

/**
 * Creates a debounced function that delays invoking the provided function
 * until after `wait` milliseconds have elapsed since the last time the
 * debounced function was invoked.
 * @param {Function} func The function to debounce.
 * @param {number} wait The number of milliseconds to delay.
 * @returns {Function} A new debounced function.
 */
export function debounce(func, wait) {
  let timeout = null;

  return function(...args) {
    const context = this;
    if (timeout !== null) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      timeout = null;
      func.apply(context, args);
    }, wait);
  };
}