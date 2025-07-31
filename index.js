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