import { PROFILE_INFO } from '../constants.js';
import ThemeToggleButton from './theme/ThemeToggleButton.js';

export default function Header(onNavigateHome) {
    const header = document.createElement('header');
    // Start with transparent and add other classes, so transition works correctly on load.
    header.className = 'fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-transparent';
    
    const handleScroll = () => {
        if (window.scrollY > 10) {
            header.classList.add('bg-white/80', 'dark:bg-secondary/70', 'backdrop-blur-sm', 'shadow-lg');
            header.classList.remove('bg-transparent');
        } else {
            header.classList.remove('bg-white/80', 'dark:bg-secondary/70', 'backdrop-blur-sm', 'shadow-lg');
            header.classList.add('bg-transparent');
        }
    };

    // Listen for scroll events
    window.addEventListener('scroll', handleScroll, { passive: true });
    // Run on load as well
    handleScroll();

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const navLinks = ["About", "Projects", "Skills", "Contact"];

    const container = document.createElement('div');
    container.className = "container mx-auto px-4 md:px-8 flex justify-between items-center py-4";

    container.innerHTML = `
        <a href="#home" id="home-link" class="text-xl md:text-2xl font-bold text-sky-500 dark:text-accent hover:text-sky-600 dark:hover:text-accent-hover transition-colors">
            ${PROFILE_INFO.name}
        </a>
        <div class="flex items-center space-x-2 sm:space-x-4">
            <nav class="hidden md:flex items-center space-x-6">
                ${navLinks.map(linkText => `
                    <a href="#${linkText.toLowerCase()}" data-scroll-to="${linkText.toLowerCase()}" class="text-slate-500 dark:text-text-secondary hover:text-sky-500 dark:hover:text-accent transition-colors duration-300 font-medium">
                        ${linkText}
                    </a>
                `).join('')}
            </nav>
            <div id="theme-toggle-container"></div>
            <div class="md:hidden">
                <!-- Mobile menu button can be added here -->
            </div>
        </div>
    `;
    
    header.appendChild(container);

    const homeLink = header.querySelector('#home-link');
    if (homeLink) {
        homeLink.addEventListener('click', (e) => {
            e.preventDefault();
            if (onNavigateHome) {
                onNavigateHome();
            } else {
                scrollToSection('home');
            }
        });
    }

    header.querySelectorAll('[data-scroll-to]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            scrollToSection(e.currentTarget.dataset.scrollTo);
        });
    });

    header.querySelector('#theme-toggle-container').appendChild(ThemeToggleButton());

    return header;
}