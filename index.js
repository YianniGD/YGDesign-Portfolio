import { initTheme } from './components/theme/theme.js';
import Header from './components/Header.js';
import Hero from './components/Hero.js';
import About from './components/About.js';
import Projects from './components/Projects.js';
import Skills from './components/Skills.js';
import Contact from './components/Contact.js';
import Footer from './components/Footer.js';
import createInteractiveCursor from './components/InteractiveCursor.js';
import createParticleBackground from './components/ParticleBackground.js';
import ProjectDetail from './components/ProjectDetail.js';

function App() {
    // This is the root container in the DOM
    const appRoot = document.getElementById('root');
    if (!appRoot) {
        console.error("Root element not found!");
        return;
    }
    appRoot.innerHTML = ''; // Clear any previous content

    // --- PhotoSwipe Root Element ---
    // This should be added once to the body.
    if (!document.querySelector('.pswp')) {
        const pswpElement = document.createElement('div');
        pswpElement.className = 'pswp';
        pswpElement.tabIndex = -1;
        pswpElement.setAttribute('role', 'dialog');
        pswpElement.setAttribute('aria-hidden', 'true');
        pswpElement.innerHTML = `
            <div class="pswp__bg"></div>
            <div class="pswp__scroll-wrap">
                <div class="pswp__container">
                    <div class="pswp__item"></div>
                    <div class="pswp__item"></div>
                    <div class="pswp__item"></div>
                </div>
                <div class="pswp__ui pswp__ui--hidden">
                    <div class="pswp__top-bar">
                        <div class="pswp__counter"></div>
                        <button class="pswp__button pswp__button--close" title="Close (Esc)"></button>
                        <button class="pswp__button pswp__button--share" title="Share"></button>
                        <button class="pswp__button pswp__button--fs" title="Toggle fullscreen"></button>
                        <button class="pswp__button pswp__button--zoom" title="Zoom in/out"></button>
                        <div class="pswp__preloader"><div class="pswp__preloader__icn"><div class="pswp__preloader__cut"><div class="pswp__preloader__donut"></div></div></div></div>
                    </div>
                    <div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap"><div class="pswp__share-tooltip"></div></div>
                    <button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)"></button>
                    <button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)"></button>
                    <div class="pswp__caption"><div class="pswp__caption__center"></div></div>
                </div>
            </div>
        `;
        document.body.appendChild(pswpElement);
    }

    // Main wrapper for the entire page
    const pageWrapper = document.createElement('div');
    pageWrapper.className = 'min-h-screen flex flex-col';

    // This is where main sections will be rendered
    const mainContentArea = document.createElement('main');
    mainContentArea.className = 'container mx-auto px-4 md:px-8 flex-grow';

    // --- State Management ---
    let selectedProject = null;

    // --- View Rendering Functions ---
    const renderProjectListView = () => {
        mainContentArea.innerHTML = ''; // Clear previous content

        const heroSection = document.createElement('section');
        heroSection.id = 'home';
        heroSection.className = 'pt-24 md:pt-32';
        heroSection.appendChild(Hero());
        
        const aboutSection = document.createElement('section');
        aboutSection.id = 'about';
        aboutSection.className = 'py-24';
        aboutSection.appendChild(About());
        
        const projectsSection = document.createElement('section');
        projectsSection.id = 'projects';
        projectsSection.className = 'py-24';
        projectsSection.appendChild(Projects(handleProjectSelect));
        
        const skillsSection = document.createElement('section');
        skillsSection.id = 'skills';
        skillsSection.className = 'py-24';
        skillsSection.appendChild(Skills());

        const contactSection = document.createElement('section');
        contactSection.id = 'contact';
        contactSection.className = 'py-24';
        contactSection.appendChild(Contact());

        mainContentArea.append(heroSection, aboutSection, projectsSection, skillsSection, contactSection);
    };

    const renderProjectDetailView = () => {
        mainContentArea.innerHTML = ''; // Clear previous content
        if (selectedProject) {
            mainContentArea.appendChild(ProjectDetail(selectedProject, handleCloseProject));

            // If the selected project is Kellarden Farms, add the switcher
            if (selectedProject.id === 'kellarden-farms-identity') {
                const switcherSection = document.createElement('section');
                switcherSection.className = 'flex w-full justify-center px-4 py-12';

                const switcherContainer = document.createElement('div');
                switcherContainer.id = 'kellarden-switcher-container';

                switcherSection.appendChild(switcherContainer);
                mainContentArea.appendChild(switcherSection);

                // The switcher.js script is loaded via index.html, so the function is globally available.
                initSvgLogoSwitcher('kellarden-switcher-container');
            }

            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    // --- Event Handlers ---
    const handleProjectSelect = (project) => {
        selectedProject = project;
        renderProjectDetailView();
    };

    const handleCloseProject = () => {
        selectedProject = null;
        renderProjectListView();
    };

    const handleNavigateHome = () => {
        if (selectedProject) {
            handleCloseProject();
        } else {
            const homeElement = document.getElementById('home');
            if (homeElement) {
                homeElement.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };


    // --- App Initialization ---
    initTheme();

    pageWrapper.appendChild(createParticleBackground());
    createInteractiveCursor();
    pageWrapper.appendChild(Header(handleNavigateHome));
    pageWrapper.appendChild(mainContentArea);
    pageWrapper.appendChild(Footer());

    appRoot.appendChild(pageWrapper);

    // Render the initial view
    renderProjectListView();
}

// Run the app when the DOM is ready
document.addEventListener('DOMContentLoaded', App);