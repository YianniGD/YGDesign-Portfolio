/**
 * Initializes an SVG logo switcher component for the Kellarden Farms identity proposal.
 * This script dynamically creates controls to switch between different logo variations
 * and displays them within a specified container. It is styled using Tailwind CSS
 * and supports dark mode.
 *
 * @param {string} containerId The ID of the DOM element to render the switcher into.
 */
function initSvgLogoSwitcher(containerId) {
    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`Switcher container with id "${containerId}" not found.`);
        return;
    }

    // Placeholder SVG logos for Kellarden Farms.
    // In a real project, these would be the final SVG assets.
    const svgs = {
        'mark-color': `
            <svg width="200" height="200" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-labelledby="mark-color-title">
                <title id="mark-color-title">Kellarden Farms Mark - Color</title>
                <path d="M10 90 L10 40 L50 10 L90 40 L90 90 L60 90 L60 60 L40 60 L40 90 Z" fill="#8B4513" stroke="#5A2D0C" stroke-width="2"/>
                <circle cx="75" cy="30" r="10" fill="#FFD700" />
            </svg>
        `,
        'mark-bw': `
            <svg width="200" height="200" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-labelledby="mark-bw-title">
                <title id="mark-bw-title">Kellarden Farms Mark - Black and White</title>
                <path d="M10 90 L10 40 L50 10 L90 40 L90 90 L60 90 L60 60 L40 60 L40 90 Z" fill="#333" stroke="#000" stroke-width="2"/>
                <circle cx="75" cy="30" r="10" fill="#ccc" />
            </svg>
        `,
        'logotype-color': `
            <svg width="400" height="100" viewBox="0 0 400 100" xmlns="http://www.w3.org/2000/svg" aria-labelledby="logotype-color-title">
                <title id="logotype-color-title">Kellarden Farms Logotype - Color</title>
                <style>
                    .text { font-family: 'Georgia', serif; font-size: 40px; fill: #5A2D0C; }
                    .dark .text { fill: #D2B48C; }
                </style>
                <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" class="text">KELLARDEN FARMS</text>
            </svg>
        `,
        'logotype-bw': `
             <svg width="400" height="100" viewBox="0 0 400 100" xmlns="http://www.w3.org/2000/svg" aria-labelledby="logotype-bw-title">
                <title id="logotype-bw-title">Kellarden Farms Logotype - Black and White</title>
                <style>
                    .text { font-family: 'Georgia', serif; font-size: 40px; fill: #333; }
                    .dark .text { fill: #ccc; }
                </style>
                <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" class="text">KELLARDEN FARMS</text>
            </svg>
        `
    };

    // Style the main container using Tailwind classes
    // Increased width, centered it, and added background transparency with a blur effect.
    container.className = 'w-full max-w-6xl mx-auto p-4 md:p-8 bg-slate-100/80 dark:bg-secondary/80 backdrop-blur-sm rounded-lg shadow-lg animate-fade-in-up';

    const title = document.createElement('h2');
    title.textContent = 'Kellarden Farms - Logo Variations';
    title.className = 'text-2xl md:text-3xl font-bold mb-6 text-center text-slate-700 dark:text-text-primary';
    container.appendChild(title);

    const logoDisplay = document.createElement('div');
    logoDisplay.id = 'logo-display';
    logoDisplay.className = 'min-h-[250px] flex items-center justify-center bg-white dark:bg-primary p-6 rounded-md mb-6 transition-colors duration-300 shadow-inner';
    container.appendChild(logoDisplay);

    const controlsContainer = document.createElement('div');
    controlsContainer.className = 'flex flex-wrap justify-center gap-2 md:gap-4';
    container.appendChild(controlsContainer);

    const buttons = [
        { id: 'mark-color', text: 'Mark (Color)' },
        { id: 'mark-bw', text: 'Mark (B&W)' },
        { id: 'logotype-color', text: 'Logotype (Color)' },
        { id: 'logotype-bw', text: 'Logotype (B&W)' },
    ];

    let activeButton = null;

    const updateLogo = (key) => {
        const svgContent = svgs[key];
        // Add a 'dark' class to the SVG root element if dark mode is active
        // This allows for internal SVG styles to adapt to dark mode.
        const modifiedSvg = document.documentElement.classList.contains('dark')
            ? svgContent.replace('<svg', '<svg class="dark"')
            : svgContent;
        logoDisplay.innerHTML = modifiedSvg;

        const newActiveButton = document.getElementById(`btn-${key}`);
        if (activeButton) {
            activeButton.classList.remove('bg-accent', 'text-white', 'dark:text-white');
            activeButton.classList.add('bg-slate-200', 'dark:bg-slate-600', 'hover:bg-slate-300', 'dark:hover:bg-slate-500');
        }
        if (newActiveButton) {
            newActiveButton.classList.add('bg-accent', 'text-white', 'dark:text-white');
            newActiveButton.classList.remove('bg-slate-200', 'dark:bg-slate-600', 'hover:bg-slate-300', 'dark:hover:bg-slate-500');
            activeButton = newActiveButton;
        }
    };

    buttons.forEach(buttonInfo => {
        const button = document.createElement('button');
        button.id = `btn-${buttonInfo.id}`;
        button.textContent = buttonInfo.text;
        button.className = 'px-4 py-2 rounded-md font-semibold transition-all duration-200 text-sm md:text-base bg-slate-200 dark:bg-slate-600 text-slate-700 dark:text-text-primary hover:bg-slate-300 dark:hover:bg-slate-500 focus:outline-none focus:ring-2 focus:ring-accent';
        button.addEventListener('click', () => updateLogo(buttonInfo.id));
        controlsContainer.appendChild(button);
    });

    // Set the initial logo
    updateLogo('mark-color');
}