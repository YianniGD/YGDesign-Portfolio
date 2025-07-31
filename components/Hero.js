import { PROFILE_INFO } from '../constants.js';

export default function Hero() {
    const element = document.createElement('div');
    element.className = "min-h-[60vh] flex items-center animate-fade-in-up";

    const handleScrollTo = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    };

    element.innerHTML = `
        <div class="flex flex-col md:flex-row items-center justify-between w-full">
            <div class="md:w-2/3 text-center md:text-left">
                <h1 class="text-4xl md:text-6xl font-bold leading-tight transition-all duration-300">
                    Yianni Galiatsatos
                </h1>
                <h2 class="text-2xl md:text-3xl font-semibold text-sky-500 dark:text-accent mt-2 transition-all duration-300">
                    ${PROFILE_INFO.title}
                </h2>
                <p class="mt-6 text-lg text-slate-600 dark:text-text-secondary max-w-xl mx-auto md:mx-0">
                    ${PROFILE_INFO.bio}
                </p>
                <div class="mt-8 flex justify-center md:justify-start space-x-4">
                    <button id="hero-contact-btn" class="bg-sky-500 text-white dark:bg-accent dark:text-primary font-bold py-3 px-8 rounded-full hover:bg-sky-600 dark:hover:bg-accent-hover transform hover:scale-105 transition-all duration-300">
                        Get In Touch
                    </button>
                    <a id="hero-projects-link" href="#projects" class="bg-slate-200 text-slate-700 dark:bg-secondary dark:text-text-primary font-bold py-3 px-8 rounded-full hover:bg-slate-300 dark:hover:bg-gray-700 transform hover:scale-105 transition-all duration-300">
                        View My Work
                    </a>
                </div>
            </div>
            <div class="mt-10 md:mt-0 md:w-1/3 flex justify-center">
                <div id="tiltDisc" class="tilt-disc">
                    <img
                        src="${PROFILE_INFO.avatarUrl}"
                        alt="Profile Photo"
                        onerror="this.onerror=null;this.src='https://placehold.co/300x300/cccccc/333333?text=Error';"
                    />
                    <div id="discHighlight" class="disc-highlight"></div>
                </div>
            </div>
        </div>
    `;

    element.querySelector('#hero-contact-btn').addEventListener('click', () => handleScrollTo('contact'));
    element.querySelector('#hero-projects-link').addEventListener('click', (e) => {
        e.preventDefault();
        handleScrollTo('projects');
    });

    // --- Tilt Disc Logic ---
    const tiltDisc = element.querySelector('#tiltDisc');
    const discHighlight = element.querySelector('#discHighlight');
    if (tiltDisc && discHighlight) {
        const maxTilt = 10;

        tiltDisc.addEventListener('mousemove', (e) => {
            const { left, top, width, height } = tiltDisc.getBoundingClientRect();
            const centerX = left + width / 2;
            const centerY = top + height / 2;

            const mouseX = e.clientX - centerX;
            const mouseY = e.clientY - centerY;

            const normalizedX = mouseX / (width / 2);
            const normalizedY = mouseY / (height / 2);

            const tiltX = -normalizedY * maxTilt;
            const tiltY = normalizedX * maxTilt;

            tiltDisc.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;

            const highlightX = e.clientX - left;
            const highlightY = e.clientY - top;

            discHighlight.style.left = `${highlightX}px`;
            discHighlight.style.top = `${highlightY}px`;
            discHighlight.classList.add('active');
        });

        tiltDisc.addEventListener('mouseleave', () => {
            tiltDisc.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
            discHighlight.classList.remove('active');
        });
    }

    return element;
}