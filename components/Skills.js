import { SKILLS } from '../constants.js';
import SectionTitle from './SectionTitle.js';

export default function Skills() {
    const element = document.createElement('div');
    element.className = "flex flex-col items-center animate-fade-in-up";
    element.style.animationDelay = '300ms';
    element.appendChild(SectionTitle('Skills & Expertise'));
    
    const container = document.createElement('div');
    container.className = "w-full max-w-4xl space-y-12";

    SKILLS.forEach(category => {
        const categoryDiv = document.createElement('div');
        
        const categoryTitle = document.createElement('h3');
        categoryTitle.className = "text-2xl font-semibold text-sky-600 dark:text-accent mb-6 text-center";
        categoryTitle.textContent = category.title;
        
        const skillsGrid = document.createElement('div');
        skillsGrid.className = "flex flex-wrap justify-center gap-6";

        category.skills.forEach(skill => {
            const skillDiv = document.createElement('div');
            skillDiv.className = "flex flex-col items-center gap-2 p-4 bg-slate-100 dark:bg-secondary rounded-lg w-32 h-32 justify-center transform hover:scale-110 transition-transform duration-300 shadow-lg";
            
            const iconWrapper = document.createElement('div');
            // The icon from constants is an HTML string, so we can set it directly
            iconWrapper.innerHTML = skill.icon;
            
            const skillName = document.createElement('span');
            skillName.className = "text-slate-700 dark:text-text-primary font-medium";
            skillName.textContent = skill.name;

            skillDiv.append(iconWrapper, skillName);
            skillsGrid.appendChild(skillDiv);
        });
        
        categoryDiv.append(categoryTitle, skillsGrid);
        container.appendChild(categoryDiv);
    });

    element.appendChild(container);
    return element;
}
