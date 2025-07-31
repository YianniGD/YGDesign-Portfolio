export default function createInteractiveCursor() {
    // This component should not run on touch devices
    let isTouchDevice = false;
    try {
        isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    } catch (e) {
        console.error("Could not check for touch support", e);
    }
    
    if (isTouchDevice) {
        return; // Do nothing on touch devices
    }

    const cursor = document.createElement('div');
    const follower = document.createElement('div');
    
    cursor.className = "fixed w-2.5 h-2.5 bg-sky-500 dark:bg-accent rounded-full pointer-events-none z-[9999] transition-all duration-150 ease-out opacity-0 scale-0";
    follower.className = "fixed w-10 h-10 bg-sky-500/20 dark:bg-accent/20 rounded-full pointer-events-none z-[9998] transition-all duration-200 ease-out opacity-0 scale-0";
    
    // Set initial off-screen position
    cursor.style.transform = 'translate3d(-100px, -100px, 0) translate(-50%, -50%)';
    follower.style.transform = 'translate3d(-100px, -100px, 0) translate(-50%, -50%)';

    document.body.appendChild(cursor);
    document.body.appendChild(follower);

    let coords = { x: -100, y: -100 };
    let followerCoords = { x: -100, y: -100 };
    let isVisible = false;
    let isPointer = false;
    let animationFrameId = null;

    const handleMouseMove = (event) => {
        // Show cursor if it's not visible
        if (!isVisible) {
            isVisible = true;
            cursor.classList.remove('opacity-0', 'scale-0');
            follower.classList.remove('opacity-0', 'scale-0');
        }
        coords = { x: event.clientX, y: event.clientY };

        let interactive = false;
        if (event.target instanceof HTMLElement) {
            const targetElement = event.target;
            // Check if the target or its ancestor is an interactive element
            if (
                targetElement.closest('a, button, [role="button"], [role="link"], input, select, textarea, summary, [data-radix-collection-item], [tabindex]:not([tabindex="-1"])') ||
                getComputedStyle(targetElement).cursor === 'pointer'
            ) {
                interactive = true;
            }
        }
        
        // Update styles if the interactive state has changed
        if (interactive !== isPointer) {
            isPointer = interactive;
            cursor.classList.toggle('scale-[2.5]', isPointer);
            cursor.classList.toggle('bg-sky-500/70', isPointer);
            cursor.classList.toggle('dark:bg-accent/70', isPointer);
            follower.classList.toggle('scale-[1.3]', isPointer);
            follower.classList.toggle('bg-sky-500/30', isPointer);
            follower.classList.toggle('dark:bg-accent/30', isPointer);
        }
    };
    
    const animateFollower = () => {
        followerCoords.x += (coords.x - followerCoords.x) * 0.12;
        followerCoords.y += (coords.y - followerCoords.y) * 0.12;
        
        follower.style.transform = `translate3d(${followerCoords.x}px, ${followerCoords.y}px, 0) translate(-50%, -50%)`;
        animationFrameId = requestAnimationFrame(animateFollower);
    };

    const moveCursor = () => {
        cursor.style.transform = `translate3d(${coords.x}px, ${coords.y}px, 0) translate(-50%, -50%)`;
        // Initialize follower position on first move
        if (followerCoords.x === -100) {
            followerCoords.x = coords.x;
            followerCoords.y = coords.y;
        }
    }

    const onMouseMove = (e) => {
        handleMouseMove(e);
        moveCursor();
    };

    const onMouseLeave = () => {
        isVisible = false;
        cursor.classList.add('opacity-0', 'scale-0');
        follower.classList.add('opacity-0', 'scale-0');
    };

    document.addEventListener('mousemove', onMouseMove);
    document.documentElement.addEventListener('mouseleave', onMouseLeave);
    
    animateFollower();
}
