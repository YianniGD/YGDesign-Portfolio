import { PROJECTS } from '../constants.js';
import { GitHubIcon } from './icons.js';
import SectionTitle from './SectionTitle.js';

function ProjectCard(project, onProjectSelect) {
    const element = document.createElement('div');
    element.className = "bg-slate-50 dark:bg-secondary rounded-lg overflow-hidden shadow-xl transform hover:-translate-y-2 transition-transform duration-300 group border border-slate-200 dark:border-transparent cursor-pointer";
    element.setAttribute('role', 'button');
    element.setAttribute('tabindex', '0');
    element.setAttribute('aria-label', `View details for ${project.title}`);

    const githubLink = project.githubUrl ? `<a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" class="github-link text-slate-400 dark:text-text-secondary hover:text-sky-600 dark:hover:text-accent transition-colors">${GitHubIcon({className: 'w-6 h-6'})}</a>` : '';
    
    let liveLink = '';
    if (project.liveUrl) {
        if (project.liveUrlIcon) {
            liveLink = `<a href="${project.liveUrl}" target="_blank" rel="noopener noreferrer" class="live-link"><img src="${project.liveUrlIcon}" alt="Live demo icon" class="w-8 h-8"></a>`;
        } else {
            liveLink = `<a href="${project.liveUrl}" target="_blank" rel="noopener noreferrer" class="live-link text-sky-600 dark:text-accent font-semibold hover:text-sky-700 dark:hover:text-accent-hover transition-colors">Live Demo</a>`;
        }
    }

    element.innerHTML = `
        <div class="overflow-hidden">
            <img src="${project.imageUrls[0]}" alt="${project.title}" class="w-full h-48 object-cover group-hover:opacity-90 group-hover:scale-105 transition-all duration-300" />
        </div>
        <div class="p-6">
            <h3 class="text-xl font-bold text-slate-900 dark:text-text-primary mb-2">${project.title}</h3>
            <p class="text-slate-600 dark:text-text-secondary mb-4 text-sm">${project.description}</p>
            <div class="flex flex-wrap gap-2 mb-4">
                ${project.tags.map(tag => `<span class="bg-sky-100 text-sky-700 dark:bg-primary dark:text-accent text-xs font-semibold px-2.5 py-1 rounded-full">${tag}</span>`).join('')}
            </div>
            <div class="flex items-center space-x-4 mt-4">
                ${liveLink}
                ${githubLink}
            </div>
        </div>
    `;

    const handleSelect = () => onProjectSelect(project);

    element.addEventListener('click', handleSelect);
    element.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleSelect();
        }
    });

    // Prevent card click when clicking on links within it
    element.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', e => e.stopPropagation());
    });

    return element;
}


export default function Projects(onProjectSelect) {
    const element = document.createElement('div');
    element.className = "flex flex-col items-center animate-fade-in-up";
    element.style.animationDelay = '200ms';
    
    element.appendChild(SectionTitle('My Projects'));

    const grid = document.createElement('div');
    grid.className = "grid gap-8 w-full max-w-7xl";
    grid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(300px, 1fr))';

    PROJECTS.forEach(project => {
        grid.appendChild(ProjectCard(project, onProjectSelect));
    });

    element.appendChild(grid);
    return element;
}