/**
 * @typedef {object} Project
 * @property {string} id
 * @property {string} title
 * @property {string} description
 * @property {string} longDescription - HTML string for the detailed description.
 * @property {string[]} tags
 * @property {string[]} imageUrls
 * @property {string} [liveUrl]
 * @property {string} [githubUrl]
 */

/**
 * @typedef {object} Skill
 * @property {string} name
 * @property {string} icon - HTML string for the icon.
 */

/**
 * @typedef {object} SkillCategory
 * @property {string} title
 * @property {Skill[]} skills
 */


export const PROFILE_INFO = {
    name: "YGDesign",
    title: "Graphic designer and Frontend Engineer",
    bio: "",
    avatarUrl: "https://storage.googleapis.com/ygportfolio/thumbnail.webp",
    email: "yianni.galiatsatos@email.com",
    linkedin: "https://www.linkedin.com/in/yiannigaliatsatos/",
    github: "https://github.com/YianniGD",
    dribbble: "https://dribbble.com/YianniG",
    bluesky: "https://bsky.app/profile/yiannig.bsky.social",
};

/** @type {Project[]} */
export const PROJECTS = [
    {
        id: "durga-tea-company",
        title: "Durga Tea Company",
        description: "Brand identity guidelines for 'Durga Tea",
        longDescription: `
            <p class="mb-4">Brand identity guidelines for 'Durga Tea', a conceptual tea company.</p>
            <p class="mb-4">This project explores the visual identity, color palettes, typography, and packaging concepts inspired by the strength, serenity, and symbolism associated with the deity Durga. </p>
            <ul class="list-disc list-inside mb-4 space-y-2">
                <li>The aim is to create a brand that evokes warmth, power, and tranquility, reflecting the essence of both the tea and its divine namesake</li>
            </ul>`,
        tags: ["branding", "logo design", "india", "tea", "chai", "tiger"],
        imageUrls: [
            "/images/D/D-01.webp",
            "/images/D/D-02.webp",
            "/images/D/D-03.webp",
            "/images/D/D-04.webp",
            "/images/D/D-05.webp",
            "/images/D/D-06.webp",
            "/images/D/D-07.webp",
            "/images/D/D-08.webp",
            "/images/D/D-09.webp",
            "/images/D/D-10.webp",
            "/images/D/D-13.webp",
            "/images/D/D-14.webp",
            "/images/D/D-15.webp",
            "/images/D/D-11.webp"
        ],
        liveUrl: "#",
        githubUrl: "#",
    },
    {
        id: "kellarden-farms-identity",
        title: "Kellarden Farms Identity Proposal",
        description: "A comprehensive branding and identity proposal for Kellarden Farms, featuring logo concepts, typography, and mockups.",
        longDescription: `
            <p class="mb-4">This project presents a complete brand identity proposal designed for Kellarden Farms. The objective was to craft a modern, clean, and memorable brand that communicates the farm's commitment to high-quality, natural products.</p>
            <p class="mb-4">The proposal covers multiple logo variations, a defined color palette, typographic guidelines, and mockups demonstrating how the branding translates across various materials, including packaging and business stationery.</p>
            <ul class="list-disc list-inside mb-4 space-y-2">
                <li>In-depth logo design exploration with multiple concepts.</li>
                <li>A versatile and natural color scheme for print and digital use.</li>
                <li>Curated typography to balance professionalism with an approachable feel.</li>
                <li>Real-world application mockups to visualize the brand's potential.</li>
            </ul>`,
        tags: ["Branding", "Identity Design", "Logo Design", "Graphic Design", "Figma"],
        imageUrls: [
            "/images/K/K_1.webp",
            "/images/K/K_2.webp",
            "/images/K/K_3.webp",
            "/images/K/K_4.webp",
            "/images/K/K_6.webp",
            "/images/K/K_7.webp",
            "/images/K/K_8.webp"
        ],
        embedUrl: "/switcher.html",
    },
    {
        id: "youth-society-logo",
        title: "Youth Society Logo",
        description: "A modern and energetic logo concept created for a local youth society, designed to be vibrant, approachable, and versatile for digital and print.",
        longDescription: `
            <p class="mb-4">This project involved designing a new logo for a community-based youth society. The goal was to create a brand mark that was modern, energetic, and appealing to a younger audience while still looking professional and trustworthy.</p>
            <p class="mb-4">I explored several concepts focusing on themes of community, growth, and positivity. The final design direction uses a clean, geometric style with a bright color palette to convey a sense of dynamism and inclusivity.</p>
            <ul class="list-disc list-inside mb-4 space-y-2">
                <li>Conceptual development and sketching.</li>
                <li>Multiple logo variations for different use cases.</li>
                <li>Color palette selection to evoke energy and youthfulness.</li>
                <li>Mockups showing the logo on merchandise and digital platforms.</li>
            </ul>`,
        tags: ["Logo Design", "Branding", "Graphic Design", "Illustration", "Figma"],
        imageUrls: [
            "https://storage.googleapis.com/ygportfolio/YS1",
            "https://storage.googleapis.com/ygportfolio/YS6",
            "https://storage.googleapis.com/ygportfolio/YS5",
            "https://storage.googleapis.com/ygportfolio/YS2",
            "https://storage.googleapis.com/ygportfolio/YS3",
            "https://storage.googleapis.com/ygportfolio/YS4"
        ],
    },
    {
        id: "silver-screen-zine",
        title: "Silver Screen Zine",
        description: "An editorial design project exploring classic cinema through the tactile and engaging format of a modern zine.",
        longDescription: `
            <p class="mb-4">"Silver Screen" is a zine created as a tribute to classic cinema, blending modern graphic design with timeless film history. This project showcases skills in editorial layout, typography, and image curation.</p>
            <p class="mb-4">The goal was to create a visually engaging piece of print media that feels both nostalgic and contemporary. Each spread is carefully designed to guide the reader through articles, reviews, and photo essays about iconic films and filmmakers.</p>
            <ul class="list-disc list-inside mb-4 space-y-2">
                <li>Dynamic editorial layouts that balance text and imagery.</li>
                <li>Thoughtful typographic choices to reflect the mood of classic cinema.</li>
                <li>Consistent visual language and grid system across the zine.</li>
                <li>Print-ready design with attention to color profiles and bleed.</li>
            </ul>`,
        tags: ["Editorial Design", "Zine", "Graphic Design", "Typography", "Print"],
        imageUrls: [
            "/images/SS/SS_1.webp",
            "/images/SS/SS_2.webp",
            "/images/SS/SS_3.webp",
            "/images/SS/SS_4.webp",
            "/images/SS/SS_5.webp",
            "/images/SS/SS_6.webp",
            "/images/SS/SS_7.webp",
            "/images/SS/SS_8.webp",
            "/images/SS/SS_9.webp",
            "/images/SS/SS_10.webp"
        ],
    },
    {
        id: "university-work",
        title: "University Work",
        description: "A collection of various design projects from my university studies, showcasing explorations in branding, packaging, and typography.",
        longDescription: `
            <p class="mb-4">This collection highlights key projects from my university coursework, demonstrating a range of design principles and software skills. It includes conceptual work for branding, packaging design, and typographic studies.</p>
            <p class="mb-4">The gallery below features work from three main projects:</p>
            <ul class="list-disc list-inside mb-4 space-y-2">
                <li><strong>Lego Mystery Box:</strong> A packaging design concept for a Lego 'mystery box' product, aimed at creating an exciting unboxing experience for collectors.</li>
                <li><strong>Sin and Virtue Soup Cans:</strong> A branding and packaging project exploring thematic dualism. Each soup can represents a 'sin' or a 'virtue', with the design reflecting these concepts through color and typography.</li>
                <li><strong>Typographic Explorations:</strong> A series of studies in typography, experimenting with form, layout, and hierarchy to convey different moods and messages.</li>
            </ul>`,
        tags: ["Graphic Design", "Branding", "Packaging", "Typography", "University Project"],
        imageUrls: [
            "/images/T/T_3.webp",
            "/images/T/T_4.webp",
            "/images/T/T_1.webp",
            "/images/T/T_2.webp",
            "/images/RC/RC_1.webp",
            "/images/RC/RC_2.webp",
            "/images/RC/RC_3.webp",
            "/images/L/LEGO_1.webp",
            "/images/L/LEGO_2.webp",
            "/images/SP/LSP_1.webp",
            "/images/SP/RSP_1.webp"
        ],
    },
    {
        id: "personal-projects",
        title: "Personal Projects",
        description: "A collection of personal works. Passion Projects and educational explorations alike",
        longDescription: `
            <p class="mb-4">This collection showcases personal explorations. It includes projects ranging from detailed product visualizations, like the classic N64 controller, to the creation of atmospheric interior scenes.</p>
            <p class="mb-4">Each piece has meaning behind it, and they're things I'd like to share.</p>
        `,
        tags: ["3D Modeling", "Rendering", "Personal Project","blender","illustrator", "Autodesk"],
        imageUrls: [
            "/images/P/3D_1.webp",
            "/images/P/N64.webp"
        ],
    },
];

/** @type {SkillCategory[]} */
export const SKILLS = [
    {
        title: "Frontend",
        skills: [
            { name: "HTML5", icon: '<img src="/images/icons/html5.svg" alt="HTML5 Icon" class="w-8 h-8">' },
            { name: "JavaScript", icon: '<img src="/images/icons/js.svg" alt="JavaScript Icon" class="w-8 h-8">' },
            { name: "React", icon: '<img src="/images/icons/react.svg" alt="React Icon" class="w-8 h-8">' },
            { name: "Tailwind CSS", icon: '<img src="Public/images/icons/tailwind.svg" alt="Tailwind CSS Icon" class="w-8 h-8">' },
            { name: "Node.js", icon: '<img src="/images/icons/node.svg" alt="Node.js Icon" class="w-8 h-8">' },
            { name: "Python", icon: '<img src="Public/images/icons/Python.svg" alt="Python Icon" class="w-8 h-8">' },
        ],
    },
    {
        title: "Tools & Design",
        skills: [
            { name: "Git & GitHub", icon: '<img src="/images/icons/github.svg" alt="Github Icon" class="w-8 h-8">' },
            { name: "Adobe Suite", icon: '<img src="/images/icons/adobe.svg" alt="Adobe Suite Icon" class="w-8 h-8">' },
            { name: "Autodesk", icon: '<img src="/images/icons/auto.svg" alt="Autodesk Icon" class="w-8 h-8">' },
            { name: "Figma", icon: '<img src="/images/icons/figma.svg" alt="Figma Icon" class="w-8 h-8">' },
            { name: "Procreate", icon: '<img src="/images/icons/procreate.svg" alt="Procreate Icon" class="w-8 h-8">' },
            { name: "Blender", icon: '<img src="/images/icons/Blender.svg" alt="Blender Icon" class="w-8 h-8">' },
        ],
    },
    {
        title: "Operating Systems",
        skills: [
            { name: "iOS/MacOS", icon: '<img src="/images/icons/apple.svg" alt="Apple Icon" class="w-8 h-8">' },
            { name: "Windows", icon: '<img src="/images/icons/ms.svg" alt="Windows Icon" class="w-8 h-8">' },
            { name: "Android", icon: '<img src="/images/icons/android.svg" alt="Android Icon" class="w-8 h-8">' },
        ],
    },
];