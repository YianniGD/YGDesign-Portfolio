import SectionTitle from './SectionTitle.js';

export default function About() {
    const element = document.createElement('div');
    element.className = "flex flex-col items-center animate-fade-in-up";
    element.style.animationDelay = '100ms';
    
    element.appendChild(SectionTitle('About Me'));

    const content = document.createElement('div');
    content.className = "max-w-3xl text-center text-slate-600 dark:text-text-secondary text-lg leading-relaxed";
    content.innerHTML = `
        <p class="mb-4">
            With years of experience behind me, I've built a rich set of skills to tackle all manners of problems. What began as a deep fascination for how things work, has now evolved into a passion for crafting elegant solutions to complex problems. As a leader, I stand by the principle to "Lead by Example". and to "Empower Others to Succeed". A leader should never ask those around them to do things they are not willing to do themselves. I believe in creating an environment where everyone can thrive, contribute, and educate others.
        </p>
        <p class="mb-4">
            I thrive both in collaborative environments and working alone. Working closely with fellow designers, product managers, and backend engineers to bring ideas to life. I'm a firm believer in lifelong learning and constantly explore new technologies to stay at the forefront of Art and Design and the intersection of technology.
        </p>
        </p>
    `;

    element.appendChild(content);
    return element;
}
