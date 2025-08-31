import { GitHubIcon, ArrowLeftIcon, ExternalLinkIcon } from './icons.js';
import { cn } from '../lib/utils.js';

export default function ProjectDetail(project, onBack) {
    const element = document.createElement('div');
    element.className = "animate-fade-in-up pt-24 md:pt-32 pb-24";

    const { mainGalleryImages, landingPageImage } = (() => {
        const images = project.imageUrls || [];
        if (project.id === 'durga-tea-company' && images.length > 1) {
            return {
                mainGalleryImages: images.slice(0, -1),
                landingPageImage: images[images.length - 1],
            };
        }
        return {
            mainGalleryImages: images,
            landingPageImage: null,
        };
    })();

    let mainImageSrc = mainGalleryImages.length > 0 ? mainGalleryImages[0] : 'https://picsum.photos/seed/placeholder/1200/800';
    let isAnimating = false;
    
    element.innerHTML = `
        <button id="back-button" class="flex items-center gap-2 text-slate-500 dark:text-text-secondary hover:text-sky-500 dark:hover:text-accent transition-colors mb-8 font-semibold" aria-label="Back to projects">
            ${ArrowLeftIcon({ size: 20 })}
            <span>Back to Projects</span>
        </button>

        <div class="bg-white dark:bg-secondary/50 p-6 sm:p-8 rounded-lg shadow-2xl backdrop-blur-sm">
            <h1 class="text-4xl md:text-5xl font-bold text-slate-900 dark:text-text-primary mb-4">${project.title}</h1>
            <div class="flex flex-wrap gap-2 mb-8">
                ${project.tags.map(tag => `<span class="bg-sky-100 text-sky-700 dark:bg-primary dark:text-accent text-xs font-semibold px-2.5 py-1 rounded-full">${tag}</span>`).join('')}
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
                <!-- IMAGE GALLERY -->
                <div class="lg:col-span-3">
                    <div class="rounded-lg overflow-hidden shadow-lg mb-4 bg-slate-100 dark:bg-primary aspect-[4/3] flex items-center justify-center">
                        <img id="main-gallery-image" src="${mainImageSrc}" alt="${project.title}" class="w-full h-full object-contain animate-pop-in cursor-zoom-in" />
                    </div>
                    ${mainGalleryImages.length > 1 ? `
                        <div id="thumbnail-container" class="flex flex-wrap gap-2">
                            ${mainGalleryImages.map(url => `
                                <button data-url="${url}" class="${cn('w-20 h-16 rounded-md overflow-hidden border-2 transition-all duration-200', mainImageSrc === url ? 'border-sky-500 dark:border-accent scale-105' : 'border-transparent hover:border-slate-300 dark:hover:border-slate-600')}">
                                    <img src="${url}" alt="thumbnail" class="w-full h-full object-cover pointer-events-none" />
                                </button>
                            `).join('')}
                        </div>
                    ` : ''}
                </div>

                <!-- PROJECT INFO -->
                <div class="lg:col-span-2">
                    <h2 class="text-2xl font-bold text-slate-800 dark:text-text-primary mb-3">About this project</h2>
                    <div class="text-slate-600 dark:text-text-secondary text-base leading-relaxed space-y-4">
                        ${project.longDescription}
                    </div>
                    <div class="flex items-center space-x-4 mt-8">
                        ${project.liveUrl && project.liveUrlIcon ? `
                            <a href="${project.liveUrl}" target="_blank" rel="noopener noreferrer" class="text-slate-500 dark:text-text-secondary hover:opacity-80 transition-opacity transform hover:scale-110 duration-300" title="View Live Site">
                                <img src="${project.liveUrlIcon}" alt="Live site icon" class="w-9 h-9 rounded-lg shadow-md" />
                            </a>
                        ` : project.liveUrl ? `
                            <a href="${project.liveUrl}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 bg-sky-500 text-white dark:bg-accent dark:text-primary font-bold py-3 px-6 rounded-full hover:bg-sky-600 dark:hover:bg-accent-hover transform hover:scale-105 transition-all duration-300">Live Demo ${ExternalLinkIcon({ size: 18 })}</a>
                        ` : ''}
                        ${project.githubUrl ? `<a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" class="text-slate-500 dark:text-text-secondary hover:text-sky-600 dark:hover:text-accent transition-colors transform hover:scale-110" title="View on GitHub">${GitHubIcon({ className: "w-8 h-8" })}</a>` : ''}
                        ${project.pdfUrl ? `<a href="${project.pdfUrl}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 bg-sky-500 text-white dark:bg-accent dark:text-primary font-bold py-3 px-6 rounded-full hover:bg-sky-600 dark:hover:bg-accent-hover transform hover:scale-105 transition-all duration-300">View PDF ${ExternalLinkIcon({ size: 18 })}</a>` : ''}
                    </div>
                </div>
            </div>

            ${landingPageImage ? `
                <div class="mt-12 pt-8 border-t border-slate-200 dark:border-slate-700">
                    <h2 class="text-2xl md:text-3xl font-bold text-slate-800 dark:text-text-primary mb-2 text-center">Landing Page Preview</h2>
                    <p class="text-center text-slate-500 dark:text-text-secondary mb-6">Scroll inside the frame to see the full page design.</p>
                    <div class="w-full max-h-[300px] overflow-y-scroll rounded-lg border-4 border-slate-200 dark:border-slate-700 shadow-inner bg-slate-900/20 p-1">
                        <img src="${landingPageImage}" alt="${project.title} landing page mockup" class="w-full h-auto rounded-sm" />
                    </div>
                </div>
            ` : ''}
        </div>
    `;

    const mainImageElement = element.querySelector('#main-gallery-image');
    const thumbnailContainer = element.querySelector('#thumbnail-container');

    const handleThumbnailClick = (url) => {
        if (url === mainImageSrc || isAnimating) return;
        isAnimating = true;

        mainImageElement.classList.remove('animate-pop-in');
        mainImageElement.classList.add('animate-pop-out');

        const onPopOutEnd = () => {
            mainImageSrc = url;
            mainImageElement.src = url;
            
            // Update active state on thumbnails
            thumbnailContainer.querySelectorAll('button').forEach(btn => {
                const isActive = btn.dataset.url === url;
                btn.classList.toggle('border-sky-500', isActive);
                btn.classList.toggle('dark:border-accent', isActive);
                btn.classList.toggle('scale-105', isActive);
                btn.classList.toggle('border-transparent', !isActive);
            });

            mainImageElement.classList.remove('animate-pop-out');
            mainImageElement.classList.add('animate-pop-in');

            const onPopInEnd = () => {
                isAnimating = false;
                mainImageElement.removeEventListener('animationend', onPopInEnd);
            };
            mainImageElement.addEventListener('animationend', onPopInEnd, { once: true });
        };
        mainImageElement.addEventListener('animationend', onPopOutEnd, { once: true });
    };

    const openPhotoSwipe = async (index) => {
        // This assumes PhotoSwipe is loaded globally from a <script> tag.
        if (!window.PhotoSwipe || !window.PhotoSwipeUI_Default) {
            console.error('PhotoSwipe library not loaded. Please include it in your HTML.');
            return;
        }

        const pswpElement = document.querySelector('.pswp');
        if (!pswpElement) {
            console.error('PhotoSwipe root element (.pswp) not found in the DOM.');
            return;
        }

        // Note: Dynamically loading images to get their dimensions can be slow.
        // For better performance, consider storing image dimensions alongside their URLs in `constants.js`.
        const items = await Promise.all(mainGalleryImages.map(async (url) => {
            return new Promise((resolve) => {
                const img = new Image();
                img.onload = () => resolve({ src: url, w: img.naturalWidth, h: img.naturalHeight, title: project.title });
                img.onerror = () => resolve({ src: url, w: 1200, h: 800, title: `${project.title} (Image failed to load)` }); // Fallback
                img.src = url;
            });
        }));

        const options = {
            index: index,
            bgOpacity: 0.9,
            showHideOpacity: true,
            history: false,
            shareEl: false,
            fullscreenEl: true,
            zoomEl: true,
        };

        const gallery = new window.PhotoSwipe(pswpElement, window.PhotoSwipeUI_Default, items, options);
        gallery.init();
    };

    mainImageElement.addEventListener('click', () => {
        const currentIndex = mainGalleryImages.indexOf(mainImageSrc);
        openPhotoSwipe(currentIndex >= 0 ? currentIndex : 0);
    });

    let touchStartX = 0;
    let touchEndX = 0;

    mainImageElement.addEventListener('touchstart', (event) => {
        touchStartX = event.changedTouches[0].screenX;
    }, { passive: true });

    mainImageElement.addEventListener('touchend', (event) => {
        touchEndX = event.changedTouches[0].screenX;
        handleSwipeGesture();
    });

    const handleSwipeGesture = () => {
        const currentIndex = mainGalleryImages.indexOf(mainImageSrc);
        if (touchEndX < touchStartX && Math.abs(touchStartX - touchEndX) > 50) {
            const nextIndex = (currentIndex + 1) % mainGalleryImages.length;
            handleThumbnailClick(mainGalleryImages[nextIndex]);
        }

        if (touchEndX > touchStartX && Math.abs(touchStartX - touchEndX) > 50) {
            const prevIndex = (currentIndex - 1 + mainGalleryImages.length) % mainGalleryImages.length;
            handleThumbnailClick(mainGalleryImages[prevIndex]);
        }
    };

    element.querySelector('#back-button').addEventListener('click', onBack);
    if (thumbnailContainer) {
        thumbnailContainer.addEventListener('click', (e) => {
            const button = e.target.closest('button');
            if (button && button.dataset.url) {
                handleThumbnailClick(button.dataset.url);
            }
        });
    }

    return element;
}