import { PROFILE_INFO } from '../constants.js';

export default function Footer() {
    const footer = document.createElement('footer');
    footer.className = "bg-slate-100 dark:bg-secondary mt-24";
    footer.innerHTML = `
        <div class="container mx-auto px-4 md:px-8 py-6 text-center text-slate-500 dark:text-text-secondary">
            <p>&copy; ${new Date().getFullYear()} ${PROFILE_INFO.name}. All Rights Reserved.</p>
        </div>
    `;
    return footer;
}
