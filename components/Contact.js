import { PROFILE_INFO } from '../constants.js';
import { GitHubIcon, LinkedInIcon, EmailIcon, DribbbleIcon, BlueskyIcon } from './icons.js';
import SectionTitle from './SectionTitle.js';

export default function Contact() {
    const element = document.createElement('div');
    element.className = "flex flex-col items-center animate-fade-in-up";
    element.style.animationDelay = '400ms';
    element.appendChild(SectionTitle('Get In Touch'));
    
    const text = document.createElement('p');
    text.className = "text-center text-lg text-slate-600 dark:text-text-secondary max-w-2xl mb-8";
    text.textContent = "I'm currently open to new opportunities and collaborations. Feel free to reach out if you have a project in mind, want to connect, or just want to say hi!";

    const ctaWrapper = document.createElement('div');
    ctaWrapper.className = "flex flex-col items-center gap-y-12";

    const calendarButtonContainer = document.createElement('div');
    calendarButtonContainer.className = "transform hover:scale-105 transition-transform duration-300 h-[40px]";
    calendarButtonContainer.setAttribute('aria-live', 'polite');

    const socialLinks = document.createElement('div');
    socialLinks.className = "flex flex-wrap justify-center items-center gap-x-6 gap-y-4";
    socialLinks.innerHTML = `
        <a href="mailto:${PROFILE_INFO.email}" aria-label="Email ${PROFILE_INFO.name}" class="text-slate-400 dark:text-text-secondary hover:text-sky-600 dark:hover:text-accent transition-colors transform hover:scale-110 duration-300">
            ${EmailIcon({ className: "w-9 h-9" })}
        </a>
        <a href="${PROFILE_INFO.linkedin}" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile" class="text-slate-400 dark:text-text-secondary hover:text-sky-600 dark:hover:text-accent transition-colors transform hover:scale-110 duration-300">
            ${LinkedInIcon({ className: "w-9 h-9" })}
        </a>
        <a href="${PROFILE_INFO.github}" target="_blank" rel="noopener noreferrer" aria-label="GitHub profile" class="text-slate-400 dark:text-text-secondary hover:text-sky-600 dark:hover:text-accent transition-colors transform hover:scale-110 duration-300">
            ${GitHubIcon({ className: "w-9 h-9" })}
        </a>
        <a href="${PROFILE_INFO.dribbble}" target="_blank" rel="noopener noreferrer" aria-label="Dribbble profile" class="text-slate-400 dark:text-text-secondary hover:text-sky-600 dark:hover:text-accent transition-colors transform hover:scale-110 duration-300">
            ${DribbbleIcon({ className: "w-9 h-9" })}
        </a>
        <a href="${PROFILE_INFO.bluesky}" target="_blank" rel="noopener noreferrer" aria-label="Bluesky profile" class="text-slate-400 dark:text-text-secondary hover:text-sky-600 dark:hover:text-accent transition-colors transform hover:scale-110 duration-300">
            ${BlueskyIcon({ className: "w-9 h-9" })}
        </a>
    `;

    // Logic for Google Calendar button, which may load after the initial render
    const checkCalendar = () => {
        if (window.calendar && calendarButtonContainer) {
            calendarButtonContainer.innerHTML = ''; // Clear previous button before loading a new one
            try {
                window.calendar.schedulingButton.load({
                    url: 'https://calendar.google.com/calendar/appointments/AcZssZ12AveFFHhGNxAGRRoTFkeN8qhegPgiGv6eWd4=?gv=true',
                    color: '#F09300',
                    label: 'Book an appointment',
                    target: calendarButtonContainer,
                });
            } catch (e) {
                console.error("Failed to load Google Calendar button:", e);
                calendarButtonContainer.textContent = "Could not load appointment scheduler.";
            }
        } else {
            // If the script hasn't loaded yet, check again shortly
            setTimeout(checkCalendar, 100);
        }
    };
    checkCalendar();

    ctaWrapper.append(calendarButtonContainer, socialLinks);
    element.append(text, ctaWrapper);
    return element;
}
