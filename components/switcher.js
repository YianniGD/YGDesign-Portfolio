// svgLogoSwitcher.js

/**
 * Initializes and renders the SVG Logo Switcher into a specified container element.
 * @param {string} containerId The ID of the HTML element where the switcher should be rendered.
 */
function initSvgLogoSwitcher(containerId) {
    // --- Utility Functions ---

    // Helper for conditionally joining class names (mimics `cn` from `clsx` or `class-variance-authority`)
    function cn(...inputs) {
        const classes = [];
        for (const input of inputs) {
            if (typeof input === 'string' && input.trim() !== '') {
                classes.push(input.trim());
            } else if (typeof input === 'object' && input !== null) {
                if (Array.isArray(input)) {
                    classes.push(cn(...input)); // Recursively handle arrays
                } else {
                    for (const key in input) {
                        if (input[key]) {
                            classes.push(key.trim());
                        }
                    }
                }
            }
        }
        return classes.filter(Boolean).join(' ');
    }

    // Simple check icon SVG string
    function getCheckIconSvg(color = "currentColor") {
        return `
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="${color}"
                stroke-width="3"
                stroke-linecap="round"
                stroke-linejoin="round"
            >
                <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
        `;
    }

    // Calculate luminance for checkmark color decision
    function getLuma(hex) {
        const r = parseInt(hex.substring(1, 3), 16);
        const g = parseInt(hex.substring(3, 5), 16);
        const b = parseInt(hex.substring(5, 7), 16);
        return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    }

    // --- Theme Management (Simplified) ---
    let currentTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

    function applyTheme(theme) {
        document.body.classList.toggle('dark', theme === 'dark');
        localStorage.setItem('theme', theme);
        currentTheme = theme;
        updateUI(); // Re-render UI based on new theme
    }

    // --- SVG Logo Definitions ---
    const TaplowVariantLogoSvg = `
        <svg id="Layer_1_Taplow_Main" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 289.15 57.05" class="w-auto h-auto max-h-24 max-w-full">
            <path fill="currentColor" d="M163.53,5.76V0h-26.76v3.15h5.26v5.75l-9.96-5.75h2.59V0h-12.9v3.15h4l8.91,5.13-6.28,6.29c-.41.36-.89.65-1.42.85-.54.2-1.13.31-1.76.31h-3.44v3.15h3.52c1.04-.02,2.03-.21,2.94-.57s1.7-.87,2.38-1.51l6.87-6.9,4.55,2.63v3.19h-5.26v3.15h13.66v-3.15h-5.26v-3.44s13.12,0,13.12,0v-3.15h-13.13V3.15h15.24v2.61h3.13Z"/>
            <rect fill="currentColor" x="16.16" y="27.86" width="6.73" height="6.73" transform="translate(-16.36 22.95) rotate(-45)"/>
            <rect fill="currentColor" x="16.16" y="44.56" width="6.73" height="6.73" transform="translate(-28.17 27.84) rotate(-45)"/>
            <rect fill="currentColor" x="7.93" y="35.91" width="6.73" height="6.73" transform="translate(-24.47 19.49) rotate(-45)"/>
            <rect fill="currentColor" x="265.83" y="44.37" width="6.73" height="6.73" transform="translate(45.09 204.33) rotate(-45)"/>
            <rect fill="currentColor" x="265.95" y="27.61" width="6.73" height="6.73" transform="translate(56.98 199.51) rotate(-45)"/>
            <rect fill="currentColor" x="274.11" y="36.08" width="6.73" height="6.73" transform="translate(53.38 207.76) rotate(-45)"/>
            <path fill="currentColor" d="M41.24,30.36h1.74l-5.89,3.4v-3.4h2.77v-1.38h-6.91v1.38h2.77v6.89h-2.77v1.39h6.91v-1.39h-2.77v-1.9l2.56-1.48,3.69,3.7c.34.33.75.58,1.21.76.46.18.96.28,1.5.29h1.71v-1.39h-1.67c-.35,0-.68-.06-.98-.17-.3-.11-.56-.27-.79-.48l-3.44-3.44,4.88-2.81h2v-1.38h-6.51v1.38Z"/>
            <polygon fill="currentColor" points="59.34 30.36 62.11 30.36 62.11 37.25 59.34 37.25 59.34 38.64 73.15 38.64 73.15 35.88 71.77 35.88 71.77 37.25 63.48 37.25 63.48 34.5 70.39 34.5 70.39 33.11 63.48 33.11 63.48 30.36 71.77 30.36 71.77 31.73 73.15 31.73 73.15 28.97 59.34 28.97 59.34 30.36"/>
            <polygon fill="currentColor" points="97.17 37.25 88.87 37.25 88.87 30.36 91.64 30.36 91.64 28.97 84.73 28.97 84.73 30.36 87.5 30.36 87.5 37.25 84.73 37.25 84.73 38.63 98.54 38.63 98.54 35.88 97.17 35.88 97.17 37.25"/>
            <polygon fill="currentColor" points="122.56 37.25 114.27 37.25 114.27 30.36 117.03 30.36 117.03 28.97 110.13 28.97 110.13 30.36 112.89 30.36 112.89 37.25 110.13 37.25 110.13 38.63 123.93 38.63 123.93 35.88 122.56 35.88 122.56 37.25"/>
            <path fill="currentColor" d="M141.46,34.5l2.31-4.13,2.29,4.13h-4.6ZM145.23,30.36h2.72v-1.38h-8.29v1.38h2.64l-4.02,6.89h-2.76v1.39h6.91v-1.39h-2.51l.78-1.37h6.14l.76,1.37h-2.42v1.39h6.91v-1.39h-2.83l-4.02-6.89Z"/>
            <path fill="currentColor" d="M173.41,34.5h-5.6v-4.14h5.6c.33,0,.64.06.93.16.29.11.53.26.74.44.21.18.38.4.49.65.12.25.18.52.18.81s-.06.56-.18.81c-.12.25-.28.47-.49.65s-.46.33-.74.44c-.29.11-.6.16-.93.16M175.46,37.08c-.3-.11-.56-.27-.79-.47l-.75-.75c.48-.05.92-.18,1.33-.38.41-.2.76-.45,1.07-.75s.54-.65.71-1.05c.17-.4.26-.81.26-1.25,0-.48-.1-.92-.3-1.35-.2-.42-.47-.79-.81-1.1-.34-.31-.75-.56-1.21-.74-.46-.18-.96-.27-1.48-.27h-9.82v1.38h2.77v6.9h-2.77v1.38h6.91v-1.38h-2.77v-1.37h4.19l1.7,1.7c.34.33.75.58,1.21.76s.96.28,1.49.29h1.46v-1.38h-1.42c-.35,0-.68-.06-.97-.17"/>
            <path fill="currentColor" d="M201.93,35.15c-.22.42-.51.78-.89,1.09-.38.31-.82.56-1.32.74-.5.18-1.04.27-1.61.27h-4.54v-6.89h4.54c.57,0,1.11.09,1.61.27s.94.43,1.32.74c.38.31.67.68.89,1.1.21.42.32.87.32,1.34s-.11.92-.32,1.34M202.09,30.39c-.5-.44-1.08-.78-1.75-1.04-.67-.25-1.39-.38-2.15-.38h-8.75v1.39h2.77v6.89h-2.77v1.38h8.75c.76,0,1.48-.13,2.15-.38.67-.25,1.25-.6,1.75-1.03.5-.44.89-.94,1.18-1.53.29-.58.43-1.21.43-1.88s-.15-1.3-.43-1.88c-.29-.59-.68-1.1-1.18-1.54"/>
            <polygon fill="currentColor" points="214.24 30.36 217 30.36 217 37.25 214.24 37.25 214.24 38.64 228.04 38.64 228.04 35.88 226.67 35.88 226.67 37.25 218.38 37.25 218.38 34.5 225.28 34.5 225.28 33.11 218.38 33.11 218.38 30.36 226.67 30.36 226.67 31.73 228.04 31.73 228.04 28.97 214.24 28.97 214.24 30.36"/>
            <polygon fill="currentColor" points="249.29 30.36 252.06 30.36 252.06 36.7 244.33 28.97 239.63 28.97 239.63 30.36 242.4 30.36 242.4 37.25 239.63 37.25 239.63 38.64 246.54 38.64 246.54 37.25 243.77 37.25 243.77 30.36 252.05 38.64 253.43 38.64 253.43 30.36 256.2 30.36 256.2 28.97 249.29 28.97 249.29 30.36"/>
            <polygon fill="currentColor" points="88.23 46.14 90.08 46.14 90.08 50.74 88.23 50.74 88.23 51.66 92.84 51.66 92.84 50.74 90.99 50.74 90.99 48.9 95.6 48.9 95.6 47.98 90.99 47.98 90.99 46.14 96.52 46.14 96.52 47.06 97.44 47.06 97.44 45.22 88.23 45.22 88.23 46.14"/>
            <path fill="currentColor" d="M115.49,48.9l1.54-2.75,1.53,2.75h-3.07ZM118.01,46.14h1.81v-.92h-5.53v.92h1.76l-2.68,4.6h-1.84v.92h4.61v-.92h-1.67l.52-.91h6.14l.51.91h-1.62v.92h4.61v-.92h-1.89l-2.68-4.6Z"/>
            <path fill="currentColor" d="M145.48,48.9h-3.74v-2.89h3.74c.22,0,.43.04.62.11s.36.17.5.29c.14.12.25.27.33.44.08.17.12.35.12.54s-.04.37-.12.54c-.08.17-.19.31-.33.43-.14.12-.31.22-.5.3-.19.07-.4.11-.62.11M146.85,50.62c-.2-.08-.38-.18-.53-.32l-.5-.5c.32-.04.61-.12.88-.25.27-.13.51-.3.71-.5s.36-.44.47-.7c.12-.26.17-.54.17-.83,0-.32-.07-.62-.2-.9-.13-.28-.31-.53-.54-.73-.23-.21-.5-.37-.8-.49-.31-.12-.64-.18-.99-.18h-6.55v.92h1.85v4.6h-1.85v.92h4.61v-.92h-1.85v-.91h2.79l1.13,1.13c.23.22.5.39.81.51.31.12.64.19.99.19h.97v-.92h-.95c-.23,0-.45-.04-.65-.11"/>
            <polygon fill="currentColor" points="170.89 49.94 168.17 45.22 164.85 45.22 164.85 46.14 166.7 46.14 166.7 50.74 164.85 50.74 164.85 51.66 169 51.66 169 50.74 167.61 50.74 167.61 46.12 170.82 51.66 170.96 51.66 173.62 46.12 173.62 50.74 172.78 50.74 172.78 51.66 176.92 51.66 176.92 50.74 175.09 50.74 175.09 46.14 176.92 46.14 176.92 45.22 173.62 45.22 170.89 49.94"/>
            <path fill="currentColor" d="M200.23,48.5c-.24-.13-.49-.21-.75-.27-.25-.05-.46-.09-.62-.1l-3-.29c-.42-.03-.75-.13-.99-.29-.24-.15-.36-.37-.36-.64,0-.13.05-.26.15-.39.1-.13.26-.24.48-.33.22-.1.5-.17.85-.23.35-.06.77-.09,1.26-.09.59,0,1.12.05,1.6.14.48.1.86.22,1.14.37v.67h.91v-1.84h-.91v.22c-.38-.13-.8-.24-1.27-.31-.46-.07-.95-.11-1.47-.11-.46,0-.91.03-1.36.09-.45.06-.85.16-1.21.31-.35.15-.64.34-.87.59-.22.25-.33.56-.33.94s.09.67.26.9c.18.23.39.41.63.53.24.13.49.21.74.27.25.05.46.09.62.11l3.01.29c.42.04.75.13.99.29.24.16.36.37.36.64,0,.14-.06.27-.17.39-.11.13-.28.24-.51.33s-.53.17-.88.23c-.36.06-.78.09-1.27.09-.64,0-1.22-.05-1.75-.15-.53-.1-.94-.22-1.24-.38v-.66h-.92v1.84h.92v-.25c.41.14.87.25,1.38.33.51.08,1.04.12,1.61.12.46,0,.92-.03,1.38-.09.46-.06.88-.16,1.25-.31.37-.15.67-.34.91-.59.23-.25.35-.56.35-.95s-.09-.67-.26-.9c-.18-.23-.39-.41-.63-.53"/>
            <polygon fill="currentColor" points="33.5 48.57 34.39 48.57 34.39 47.97 33.5 47.97 33.5 46.94 34.65 46.94 34.65 46.34 32.81 46.34 32.81 50.35 34.73 50.35 34.73 49.75 33.5 49.75 33.5 48.57"/>
            <path fill="currentColor" d="M37.67,47.28c0-.25.12-.39.34-.39.15,0,.34.1.37.44l.65-.07c-.06-.57-.39-.97-.95-.97-.68,0-1.06.36-1.06,1,0,1.15,1.4,1.36,1.4,2.15,0,.24-.16.37-.4.37-.22,0-.38-.2-.41-.6l-.65.09c.03.6.39,1.11,1.03,1.11s1.09-.37,1.09-1.03c0-1.09-1.4-1.41-1.4-2.09"/>
            <polygon fill="currentColor" points="41.24 46.94 41.9 46.94 41.9 50.35 42.59 50.35 42.59 46.94 43.26 46.94 43.26 46.34 41.24 46.34 41.24 46.94"/>
            <path fill="currentColor" d="M46.95,49.22c0,.42-.13.56-.49.56h-.24v-2.87h.24c.37,0,.49.14.49.56v1.75ZM46.55,46.34h-1.02v4h1.02c.71,0,1.09-.39,1.09-1.21v-1.58c0-.82-.38-1.21-1.09-1.21"/>
            <path fill="currentColor" d="M241.23,45.54c-.77,0-1.21.54-1.21,1.24v.22h.78v-.32c0-.29.13-.49.4-.49.22,0,.37.16.37.54,0,.7-.55,1.52-1.57,3v.64h2.28v-.67h-1.44c1.28-1.79,1.52-2.35,1.52-3.1,0-.55-.44-1.06-1.11-1.06"/>
            <path fill="currentColor" d="M245.91,49.33c0,.31-.14.46-.38.46s-.38-.15-.38-.46v-2.69c0-.31.14-.46.38-.46s.38.15.38.46v2.69ZM245.53,45.54c-.82,0-1.16.41-1.16,1.31v2.28c0,.9.34,1.31,1.16,1.31s1.16-.41,1.16-1.31v-2.28c0-.9-.34-1.31-1.16-1.31"/>
            <path fill="currentColor" d="M249.94,45.54c-.77,0-1.21.54-1.21,1.24v.22h.78v-.32c0-.29.13-.49.4-.49.22,0,.37.16.37.54,0,.7-.55,1.52-1.57,3v.64h2.28v-.67h-1.44c1.28-1.79,1.52-2.35,1.52-3.1,0-.55-.44-1.06-1.11-1.06"/>
            <path fill="currentColor" d="M254.2,48.61h-.81l.8-1.86h.01v1.86ZM254.93,45.61h-.79l-1.39,3.01v.61h1.42v1.15h.75v-1.15h.44v-.61h-.44v-3.01Z"/>
        </svg>
    `;

    const EmblemLogoSvg = `
        <svg id="Layer_1_Emblem" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 51.09 109.07" class="w-auto h-auto max-h-24 max-w-full">
            <path fill="currentColor" d="M51.09,50.04v-7.04H18.35v3.86h6.43v7.03l-12.18-7.03h3.17v-3.86H0v3.86h4.89l10.9,6.27-7.69,7.69c-.5.44-1.09.79-1.74,1.04-.66.25-1.38.38-2.15.38H0v3.86h4.31c1.28-.02,2.49-.25,3.59-.7,1.11-.44,2.08-1.06,2.91-1.85l8.41-8.44,5.57,3.22v3.91h-6.43v3.86h16.71v-3.86h-6.43v-4.2s16.04,0,16.04,0v-3.86h-16.05v-7.33h18.65v3.19h3.83Z"/>
            <rect fill="currentColor" x="34.63" y="18.73" width="13.63" height="13.63" transform="translate(-5.92 36.79) rotate(-45)"/>
            <rect fill="currentColor" x="2.82" y="18.73" width="13.63" height="13.63" transform="translate(-15.24 14.3) rotate(-45)"/>
            <rect fill="currentColor" x="18.73" y="2.82" width="13.63" height="13.63" transform="translate(.67 20.89) rotate(-45)"/>
            <rect fill="currentColor" x="2.85" y="76.73" width="13.63" height="13.63" transform="translate(-56.24 31.3) rotate(-45)"/>
            <rect fill="currentColor" x="34.64" y="76.73" width="13.63" height="13.63" transform="translate(-46.93 53.78) rotate(-45)"/>
            <rect fill="currentColor" x="18.74" y="92.62" width="13.63" height="13.63" transform="translate(-62.83 47.2) rotate(-45)"/>
        </svg>
    `;

    const PatchLogoSvg = `
        <svg id="Layer_1_Patch" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60.64 108.9" class="w-auto h-auto max-h-24 max-w-full">
            <rect fill="currentColor" x="39.7" y="21.47" width="15.63" height="15.63" transform="translate(-6.79 42.18) rotate(-45)"/>
            <rect fill="currentColor" x="3.24" y="21.47" width="15.63" height="15.63" transform="translate(-17.47 16.39) rotate(-45)"/>
            <rect fill="currentColor" x="21.47" y="3.24" width="15.63" height="15.63" transform="translate(.76 23.95) rotate(-45)"/>
            <path fill="currentColor" d="M9.49,47.98h1.99l-6.75,3.89v-3.89h3.17v-1.58H0v1.58h3.17v7.89H0v1.58h7.91v-1.58h-3.17v-2.17l2.93-1.69,4.23,4.24c.39.37.85.66,1.38.88.53.21,1.1.32,1.71.33h1.96v-1.58h-1.92c-.4,0-.78-.07-1.12-.2-.34-.13-.64-.31-.91-.54l-3.94-3.94,5.59-3.22h2.29v-1.58h-7.46v1.58Z"/>
            <polygon fill="currentColor" points="21.91 47.98 25.08 47.98 25.08 55.87 21.91 55.87 21.91 57.46 37.71 57.46 37.71 54.3 36.14 54.3 36.14 55.87 26.65 55.87 26.65 52.72 34.56 52.72 34.56 51.13 26.65 51.13 26.65 47.98 36.14 47.98 36.14 49.55 37.71 49.55 37.71 46.39 21.91 46.39 21.91 47.98"/>
            <polygon fill="currentColor" points="57.48 55.87 47.99 55.87 47.99 47.98 51.16 47.98 51.16 46.39 43.25 46.39 43.25 47.98 46.42 47.98 46.42 55.87 43.25 55.87 43.25 57.46 59.05 57.46 59.05 54.3 57.48 54.3 57.48 55.87"/>
            <polygon fill="currentColor" points="15.24 77.21 5.74 77.21 5.74 69.31 8.91 69.31 8.91 67.73 1 67.73 1 69.31 4.17 69.31 4.17 77.21 1 77.21 1 78.79 16.81 78.79 16.81 75.64 15.24 75.64 15.24 77.21"/>
            <path fill="currentColor" d="M27.13,74.05l2.64-4.72,2.63,4.72h-5.27ZM31.45,69.31h3.11v-1.58h-9.49v1.58h3.02l-4.6,7.89h-3.15v1.58h7.91v-1.58h-2.87l.89-1.57h7.03l.88,1.57h-2.78v1.58h7.91v-1.58h-3.25l-4.6-7.89Z"/>
            <path fill="currentColor" d="M54.18,74.05h-6.42v-4.74h6.42c.38,0,.74.06,1.06.19.33.13.61.29.85.5.24.21.43.46.57.75.14.29.2.6.2.93s-.07.64-.2.93c-.14.29-.32.54-.57.75-.24.21-.53.38-.85.51-.33.13-.68.19-1.06.19M56.53,77.01c-.34-.13-.64-.31-.91-.54l-.86-.86c.54-.06,1.05-.2,1.52-.43.47-.23.88-.51,1.22-.86.35-.35.62-.75.82-1.2.2-.45.29-.93.29-1.43,0-.54-.11-1.06-.34-1.54-.23-.48-.54-.9-.93-1.26-.39-.36-.85-.64-1.38-.85-.53-.21-1.09-.31-1.7-.31h-11.25v1.59h3.17v7.89h-3.17v1.59h7.91v-1.58h-3.17v-1.57h4.8l1.95,1.95c.39.37.86.66,1.39.88.53.21,1.1.32,1.71.33h1.68v-1.58h-1.63c-.4,0-.78-.07-1.12-.2"/>
            <path fill="currentColor" d="M15.04,95.33c-.25.48-.59.9-1.02,1.25-.43.36-.94.64-1.51.85-.57.21-1.19.31-1.84.31h-5.19v-7.89h5.19c.65,0,1.27.1,1.84.31.57.21,1.08.49,1.51.85.43.36.77.78,1.02,1.26.25.48.37,1,.37,1.54s-.12,1.05-.37,1.53M15.22,89.88c-.57-.5-1.24-.89-2-1.19-.76-.29-1.59-.44-2.46-.44H.74v1.58h3.17v7.89H.74v1.59h10.02c.88,0,1.7-.15,2.46-.44.76-.29,1.43-.69,2-1.19.57-.5,1.02-1.08,1.35-1.75.33-.67.5-1.39.5-2.15s-.17-1.48-.5-2.16c-.33-.67-.78-1.26-1.35-1.76"/>
            <polygon fill="currentColor" points="21.91 89.84 25.08 89.84 25.08 97.74 21.91 97.74 21.91 99.32 37.71 99.32 37.71 96.17 36.14 96.17 36.14 97.74 26.65 97.74 26.65 94.58 34.56 94.58 34.56 93 26.65 93 26.65 89.84 36.14 89.84 36.14 91.41 37.71 91.41 37.71 88.26 21.91 88.26 21.91 89.84"/>
            <polygon fill="currentColor" points="52.73 89.84 55.9 89.84 55.9 97.1 47.05 88.26 41.66 88.26 41.66 89.84 44.83 89.84 44.83 97.74 41.66 97.74 41.66 99.32 49.57 99.32 49.57 97.74 46.4 97.74 46.4 89.84 55.88 99.32 57.47 99.32 57.47 89.84 60.64 89.84 60.64 88.26 52.73 88.26 52.73 89.84"/>
            <polygon fill="currentColor" points=".74 105.37 .74 105.86 1.72 105.86 1.72 108.3 .74 108.3 .74 108.79 3.18 108.79 3.18 108.3 2.2 108.3 2.2 107.32 4.65 107.32 4.65 106.83 2.2 106.83 2.2 105.86 5.14 105.86 5.14 106.35 5.62 106.35 5.62 105.37 .74 105.37"/>
            <path fill="currentColor" d="M16.02,105.86l.81,1.46h-1.63l.82-1.46ZM14.56,105.37v.49h.93l-1.42,2.44h-.97v.49h2.44v-.49h-.89l.27-.49h2.17l.27.49h-.86v.49h2.44v-.49h-1l-1.42-2.44h.96v-.49h-2.93Z"/>
            <path fill="currentColor" d="M31.11,107.32h-1.98v-1.46h1.98c.12,0,.23.02,.33.06.1.04.19.09.26.16.07.07.13.14.18.23.04.09.06.18.06.29s-.02.2-.06.29c-.04.09-.1.17-.18.23-.07.07-.16.12-.26.16-.1.04-.21.06-.33.06M31.84,108.24c-.11-.04-.2-.1-.28-.17l-.27-.27c.17-.02.32-.06.47-.13.14-.07.27-.16.38-.27.11-.11.19-.23.25-.37.06-.14.09-.29.09-.44,0-.17-.04-.33-.11-.48-.07-.15-.17-.28-.29-.39-.12-.11-.26-.2-.43-.26-.16-.06-.34-.1-.52-.1h-3.47v.49h.98v2.44h-.98v.49h2.44v-.49h-.98v-.49h1.48l.6.6c.12.11.26.21.43.27.16.07.34.1.53.1h.52v-.49h-.5c-.12,0-.24-.02-.35-.06"/>
            <polygon fill="currentColor" points="46.04 105.37 44.6 107.87 43.15 105.37 41.39 105.37 41.39 105.86 42.37 105.86 42.37 108.3 41.39 108.3 41.39 108.79 43.59 108.79 43.59 108.3 42.86 108.3 42.86 105.85 44.56 108.79 44.63 108.79 46.33 105.85 46.33 108.3 45.6 108.3 45.6 108.79 47.8 108.79 47.8 108.3 46.82 108.3 46.82 105.86 47.8 105.86 47.8 105.37 46.04 105.37"/>
            <path fill="currentColor" d="M60.16,107.11c-.13-.07-.26-.11-.4-.14-.14-.03-.25-.05-.33-.06l-1.59-.15c-.22-.02-.4-.07-.53-.15-.13-.08-.19-.2-.19-.34,0-.07.03-.14.08-.21.05-.07.14-.13.25-.18.12-.05.27-.09.45-.12.18-.03.41-.05.67-.05.31,0,.59.03.85.08.25.05.45.12.6.2v.35h.49v-.97h-.49v.12c-.2-.07-.43-.13-.67-.17-.25-.04-.51-.06-.78-.06-.24,0-.48.02-.72.05-.24.03-.45.09-.64.16-.19.08-.34.18-.46.32s-.18.3-.18.5.05.35.14.48c.09.12.2.22.33.28.13.07.26.11.39.14.13.03.24.05.33.06l1.6.15c.22.02.4.07.52.15.13.08.19.2.19.34,0,.07-.03.14-.09.21-.06.07-.15.13-.27.18-.12.05-.28.09-.47.12-.19.03-.42.05-.68.05-.34,0-.65-.03-.93-.08-.28-.05-.5-.12-.66-.2v-.35h-.49v.97h.49v-.13c.22.07.46.13.73.17.27.04.55.06.86.06.24,0,.49-.02.73-.05.24-.03.46-.09.66-.16.2-.08.36-.18.48-.32.12-.13.18-.3.18-.5s-.05-.35-.14-.48-.2-.21-.33-.28"/>
        </svg>
    `;

    // --- State Variables ---
    let activeLogo = 'taplow';
    let currentColor;
    let selectedColorName;

    const paletteColors = [
        {
            name: "Satin",
            value: 'satin-dynamic',
            isDynamic: true,
            lightValue: '#303b37',
            darkValue: '#e8e8e8',
            checkColorLight: '#e8e8e8',
            checkColorDark: '#303b37'
        },
        {
            name: "Honeyed Glow",
            value: '#e7c78d',
            checkColorLight: '#000000',
            checkColorDark: '#000000'
        },
        {
            name: "Golden Brown",
            value: '#a27035',
            checkColorLight: '#FFFFFF',
            checkColorDark: '#FFFFFF'
        },
        {
            name: "Amazon",
            value: '#307d5c',
            checkColorLight: '#FFFFFF',
            checkColorDark: '#FFFFFF'
        },
    ];

    const satinOption = paletteColors.find(c => c.name === "Satin");
    const serverDefaultSatinColor = satinOption.darkValue;

    // --- DOM Elements (will be created dynamically) ---
    let rootContainer; // The container specified by containerId
    let logoDisplay;
    let logoVariantName;
    let toggleLogoBtn;
    let emblemLogoElement; // Renamed to avoid conflict with SVG string
    let patchLogoElement;  // Renamed to avoid conflict with SVG string
    let colorPaletteContainer;
    let selectedColorNameDisplay;

    /**
     * Creates the main HTML structure for the SVG Logo Switcher.
     * @returns {HTMLElement} The root div element of the switcher.
     */
    function createSwitcherHtml() {
        const switcherDiv = document.createElement('div');
        switcherDiv.className = "w-full max-w-2xl"; // Matches original app-container width

        switcherDiv.innerHTML = `
            <div class="card mt-6">
                <div class="p-6">
                    <!-- SVG display -->
                    <div id="${containerId}-logo-display" class="flex justify-center items-center p-4 bg-muted/30 rounded-md min-h-[100px]" aria-live="polite">
                        <!-- SVG will be injected here by JavaScript -->
                    </div>

                    <!-- Variant Name and Switcher Button -->
                    <div class="flex justify-center items-center gap-3 mt-4 mb-4">
                        <p id="${containerId}-logo-variant-name" class="text-lg font-semibold text-foreground">Taplow Variant</p>
                        <button id="${containerId}-toggle-logo-btn" class="btn btn-outline btn-icon h-8 w-8" aria-label="Switch logo variant">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4">
                                <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"></path>
                                <path d="M21 3v5h-5"></path>
                            </svg>
                        </button>
                    </div>

                    <div class="separator my-6"></div>

                    <!-- Emblem and Patch Section -->
                    <div class="pt-0">
                        <div class="flex flex-col sm:flex-row gap-4">
                            <!-- Emblem Preview -->
                            <div class="w-full sm:w-1/2">
                                <div class="flex justify-center items-center p-4 bg-muted/30 rounded-md min-h-[100px]">
                                    ${EmblemLogoSvg}
                                </div>
                                <h3 class="text-lg font-semibold text-foreground text-center mt-2">Emblem</h3>
                            </div>
                            <!-- Patch Preview -->
                            <div class="w-full sm:w-1/2">
                                <div class="flex justify-center items-center p-4 bg-muted/30 rounded-md min-h-[100px]">
                                    ${PatchLogoSvg}
                                </div>
                                <h3 class="text-lg font-semibold text-foreground text-center mt-2">Patch</h3>
                            </div>
                        </div>
                    </div>

                    <div class="separator my-6"></div>

                    <!-- Color Palette -->
                    <div class="flex flex-col items-center space-y-3 pt-0">
                        <div id="${containerId}-color-palette-container" class="flex items-center justify-center space-x-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5 text-muted-foreground mr-2">
                                <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.08a2 2 0 0 1 1 1.73v.44a2 2 0 0 1-1 1.73l-.15.08a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.43-.25a2 2 0 0 1 1-1.73v.18a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.73v-.44a2 2 0 0 1 1-1.73l.15-.08a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.43.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
                                <circle cx="12" cy="12" r="3"></circle>
                            </svg>
                            <!-- Color swatch buttons will be injected here -->
                        </div>
                        <p id="${containerId}-selected-color-name" class="text-xs text-muted-foreground">Selected: Satin</p>
                    </div>
                </div>
            </div>
        `;
        return switcherDiv;
    }

    /**
     * Injects the necessary CSS styles into the document's head.
     */
    function injectStyles() {
        const styleId = 'svg-logo-switcher-styles';
        if (document.getElementById(styleId)) {
            return; // Styles already injected
        }

        const style = document.createElement('style');
        style.id = styleId;
        style.textContent = `
            body {
                font-family: 'Inter', sans-serif;
                -webkit-font-smoothing: antialiased;
                -moz-osx-font-smoothing: grayscale;
                /* Base theme colors are handled by dynamic class toggle */
                transition: background-color 0.3s ease, color 0.3s ease;
            }
            body.light {
                background-color: #f8f8f8;
                color: #1a1a1a;
            }
            body.dark {
                background-color: #1a1a1a;
                color: #f8f8f8;
            }
            /* Mimic Shadcn Card */
            .card {
                background-color: white;
                border-radius: 0.5rem;
                border: 1px solid #e5e7eb; /* border-gray-200 */
                box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
            }
            body.dark .card {
                background-color: #262626; /* Darker background for card in dark mode */
                border-color: #4a4a4a; /* Darker border */
                box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
            }
            /* Mimic Shadcn Button */
            .btn {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                white-space: nowrap;
                border-radius: 0.375rem; /* rounded-md */
                font-size: 0.875rem; /* text-sm */
                font-weight: 500; /* font-medium */
                height: 2.5rem; /* h-10 */
                padding: 0 1rem; /* px-4 py-2 */
                transition: all 0.2s ease-in-out;
            }
            .btn-outline {
                border: 1px solid #e5e7eb; /* border-input */
                background-color: white; /* bg-background */
                color: #1a1a1a; /* text-foreground */
            }
            body.dark .btn-outline {
                border-color: #4a4a4a;
                background-color: #262626;
                color: #f8f8f8;
            }
            .btn-outline:hover {
                background-color: #f3f4f6; /* hover:bg-accent */
                color: #1a1a1a; /* hover:text-accent-foreground */
            }
            body.dark .btn-outline:hover {
                background-color: #333333;
                color: #f8f8f8;
            }
            .btn-icon {
                height: 2rem; /* h-8 */
                width: 2rem; /* w-8 */
                padding: 0;
            }
            /* Ring for active color swatch */
            .ring-2 {
                box-shadow: 0 0 0 2px var(--ring-color); /* Custom property for ring color */
            }
            .ring-offset-2 {
                outline-offset: 2px;
            }
            /* Separator */
            .separator {
                height: 1px;
                background-color: #e5e7eb; /* bg-muted-foreground/20 */
            }
            body.dark .separator {
                background-color: #4a4a4a;
            }
            /* Text styles */
            .text-foreground { color: #1a1a1a; }
            body.dark .text-foreground { color: #f8f8f8; }
            .text-muted-foreground { color: #6b7280; }
            body.dark .text-muted-foreground { color: #9ca3af; }
            .bg-muted\\/30 { background-color: rgba(229, 231, 235, 0.3); } /* bg-gray-200 with opacity */
            body.dark .bg-muted\\/30 { background-color: rgba(75, 85, 99, 0.3); } /* bg-gray-600 with opacity */
        `;
        document.head.appendChild(style);

        // Also ensure Inter font is loaded
        const fontLink = document.createElement('link');
        fontLink.href = "https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap";
        fontLink.rel = "stylesheet";
        document.head.appendChild(fontLink);

        // Load Tailwind CSS if not already present (optional, assume it's there for simplicity)
        // For a truly embeddable solution without external dependencies, you'd include all Tailwind classes
        // directly in the injected style or use a different CSS approach.
        // For this example, we'll assume the host page either loads Tailwind or you manually add the CDN script.
        // If you want to include it dynamically:
        /*
        const tailwindScript = document.createElement('script');
        tailwindScript.src = "https://cdn.tailwindcss.com";
        document.head.appendChild(tailwindScript);
        */
    }

    // --- Functions to update UI ---

    function updateLogoDisplay() {
        logoDisplay.innerHTML = activeLogo === 'taplow' ? TaplowVariantLogoSvg : BarrowVariantLogoSvg;
        const currentLogoSvg = logoDisplay.querySelector('svg');
        if (currentLogoSvg) {
            currentLogoSvg.style.color = currentColor;
        }
        logoVariantName.textContent = activeLogo === 'taplow' ? 'Taplow Variant' : 'Barrow Variant';
    }

    function updateSvgColors() {
        const currentLogoSvg = logoDisplay.querySelector('svg');
        if (currentLogoSvg) {
            currentLogoSvg.style.color = currentColor;
        }
        if (emblemLogoElement) {
            emblemLogoElement.style.color = currentColor;
        }
        if (patchLogoElement) {
            patchLogoElement.style.color = currentColor;
        }
    }

    function renderColorPalette() {
        const existingButtons = colorPaletteContainer.querySelectorAll('.color-swatch-button');
        existingButtons.forEach(btn => btn.remove());

        paletteColors.forEach(colorOpt => {
            const isActive = selectedColorName === colorOpt.name;

            let displayHex;
            if (colorOpt.isDynamic) {
                displayHex = currentTheme === 'light' ? colorOpt.lightValue : colorOpt.darkValue;
            } else {
                displayHex = colorOpt.value;
            }

            let checkMarkColor = "currentColor";
            if (isActive) {
                if (colorOpt.isDynamic && colorOpt.name === "Satin") {
                    checkMarkColor = currentTheme === 'light' ? colorOpt.checkColorLight : colorOpt.checkColorDark;
                } else if (colorOpt.checkColorLight && colorOpt.checkColorDark) {
                    const luma = getLuma(displayHex);
                    checkMarkColor = luma < 128 ? colorOpt.checkColorDark : colorOpt.checkColorLight;
                    if (colorOpt.value === '#e7c78d' && colorOpt.checkColorLight) checkMarkColor = colorOpt.checkColorLight;
                }
            }

            const button = document.createElement('button');
            button.className = cn(
                "btn", "btn-outline", "btn-icon",
                "h-8 w-8 rounded-full border-2 hover:opacity-80 transition-all",
                isActive ? 'ring-2 ring-offset-2' : 'border-muted-foreground/20',
                'color-swatch-button'
            );
            button.style.backgroundColor = displayHex;

            if (isActive) {
                button.style.borderColor = displayHex;
                button.style.boxShadow = `0 0 0 2px ${displayHex}`;
            }

            button.setAttribute('aria-label', `Set color to ${colorOpt.name}`);
            button.setAttribute('title', colorOpt.name);
            button.dataset.colorName = colorOpt.name;

            if (isActive) {
                const checkIconDiv = document.createElement('div');
                checkIconDiv.innerHTML = getCheckIconSvg(checkMarkColor);
                button.appendChild(checkIconDiv);
            }

            colorPaletteContainer.appendChild(button);
        });
        selectedColorNameDisplay.textContent = `Selected: ${selectedColorName}`;
    }

    // Main update function that re-renders all dynamic parts
    function updateUI() {
        updateLogoDisplay();
        updateSvgColors();
        renderColorPalette();
    }

    // --- Event Handlers ---

    function toggleLogo() {
        activeLogo = activeLogo === 'taplow' ? 'barrow' : 'taplow';
        updateUI();
    }

    function handleColorChange(colorOpt) {
        selectedColorName = colorOpt.name;
        if (colorOpt.isDynamic) {
            currentColor = currentTheme === 'light' ? colorOpt.lightValue : colorOpt.darkValue;
        } else {
            currentColor = colorOpt.value;
        }
        updateUI();
    }

    // --- Initialization ---

    // Find the root container element
    rootContainer = document.getElementById(containerId);
    if (!rootContainer) {
        console.error(`Error: Container element with ID "${containerId}" not found.`);
        return;
    }

    // Inject styles once
    injectStyles();

    // Append the switcher HTML to the root container
    const switcherHtml = createSwitcherHtml();
    rootContainer.appendChild(switcherHtml);

    // Get references to the dynamically created DOM elements
    logoDisplay = rootContainer.querySelector(`#${containerId}-logo-display`);
    logoVariantName = rootContainer.querySelector(`#${containerId}-logo-variant-name`);
    toggleLogoBtn = rootContainer.querySelector(`#${containerId}-toggle-logo-btn`);
    emblemLogoElement = rootContainer.querySelector('#Layer_1_Emblem'); // IDs are unique globally
    patchLogoElement = rootContainer.querySelector('#Layer_1_Patch');   // IDs are unique globally
    colorPaletteContainer = rootContainer.querySelector(`#${containerId}-color-palette-container`);
    selectedColorNameDisplay = rootContainer.querySelector(`#${containerId}-selected-color-name`);

    // Initialize state based on theme and default color
    selectedColorName = satinOption.name;
    currentColor = currentTheme === 'light' ? satinOption.lightValue : satinOption.darkValue;

    // Apply initial theme and set up listener
    applyTheme(currentTheme);
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        applyTheme(e.matches ? 'dark' : 'light');
    });

    // Attach event listeners
    toggleLogoBtn.addEventListener('click', toggleLogo);

    colorPaletteContainer.addEventListener('click', (event) => {
        const button = event.target.closest('.color-swatch-button');
        if (button) {
            const colorName = button.dataset.colorName;
            const colorOpt = paletteColors.find(c => c.name === colorName);
            if (colorOpt) {
                handleColorChange(colorOpt);
            }
        }
    });
}

// You would call this function in your existing HTML page like this:
// <div id="my-logo-switcher-container"></div>
// <script src="svgLogoSwitcher.js"></script>
// <script>
//   initSvgLogoSwitcher('my-logo-switcher-container');
// </script>
