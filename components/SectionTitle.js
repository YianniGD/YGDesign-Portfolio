export default function SectionTitle(title) {
    const titleWrapper = document.createElement('h2');
    titleWrapper.className = "text-3xl md:text-4xl font-bold text-center mb-12 text-slate-800 dark:text-text-primary relative inline-block transition-all duration-300";
    
    // Use textContent for security and performance
    titleWrapper.textContent = title;
    
    const underline = document.createElement('span');
    underline.className = "absolute -bottom-2 left-1/2 -translate-x-1/2 w-2/3 h-1 bg-sky-500 dark:bg-accent rounded-full";

    titleWrapper.appendChild(underline);
    
    return titleWrapper;
}
