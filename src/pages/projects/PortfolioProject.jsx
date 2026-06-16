import Layout from '../../components/Layout'
import ContentSection from '../../components/content/ContentSection.jsx'
import CardLinkNav from '../../components/content/CardLinkNav.jsx'
import WakaTimeBadge from '../../components/content/WakaTimeBadge.jsx'
import ListCard from '../../components/content/ListCard.jsx'
import MediaCard from '../../components/content/MediaCard.jsx'
import ChallengeCard from '../../components/content/ChallengeCard.jsx'

import './ProjectDetail.css'

const wakatimeBadge = {
    href: 'https://wakatime.com/badge/user/a45be745-6431-45a2-8c9d-c19040dcd283/project/22b9f1bf-fc78-4b34-a031-c769df92a570',
    image: 'https://wakatime.com/badge/user/a45be745-6431-45a2-8c9d-c19040dcd283/project/22b9f1bf-fc78-4b34-a031-c769df92a570.svg?style=for-the-badge',
}

const projectLinks = [
    {
        href: '#overview',
        label: 'Overview',
    },
    {
        href: '#implementation',
        label: 'Implementation',
    },
    {
        href: '#challenges',
        label: 'Challenges',
    },
    {
        href: '#features',
        label: 'Features',
    },
    {
        href: 'https://lollisjosh.github.io/',
        label: 'Live Site',
        isExternal: true,
    },
    {
        href: 'https://github.com/lollisjosh/lollisjosh.github.io',
        label: 'Repository',
        iconClassName: 'fab fa-github',
        isExternal: true,
    },
]

const overviewCards = [
    {
        title: 'Core Technologies',
        items: [
            'HTML5',
            'CSS3 with Media Queries',
            'Vanilla JavaScript',
            'Chart.js for Data Visualization',
        ],
    },
    {
        title: 'Design Approach',
        items: [
            'Mobile-First Responsive Design',
            'Consistent Color Scheme',
            'Custom Typography',
            'Modular Component Structure',
        ],
    },
]

const implementationCards = [
    {
        title: 'Site Architecture',
        items: [
            'Template-Based Page Generation',
            'Custom Layouts for Different Content Types',
            'Component-Based Structure',
            'Content/Code Separation',
        ],
    },
    {
        title: 'Responsive Design',
        items: [
            'Separate mobile/desktop CSS files',
            'Device-specific component layouts',
            'Adaptive chart displays on Skills page',
            'Thoughtful space utilization across viewports',
        ],
    },
]

const implementationMedia = [
    {
        title: 'Desktop Layout',
        image: '/assets/gifs/desktop_skills.gif',
        imageAlt: 'Skills page on desktop',
    },
    {
        title: 'Mobile Layout',
        image: '/assets/gifs/mobile_skills.gif',
        imageAlt: 'Skills page on mobile',
    },
]

const challengeCards = [
    {
        title: 'Responsive Navigation',
        problem:
            'Creating a navigation system that works seamlessly on both mobile and desktop',
        solution:
            'Implemented separate mobile and desktop CSS files with device-specific navigation patterns that maintain consistent user experience',
    },
    {
        title: 'Content Organization',
        problem:
            'Structuring diverse content including projects, blogs, and artwork in a cohesive way',
        solution:
            'Developed a unified card-based interface with consistent styling but flexible content display options',
    },
    {
        title: 'Performance Optimization',
        problem:
            'Ensuring fast page loads despite numerous images and interactive elements',
        solution:
            'Utilized optimized images, modern CSS techniques, and efficient JavaScript to maintain responsive performance',
    },
]

const featureCards = [
    {
        title: 'User Experience',
        items: [
            'Interactive Hover Effects',
            'Smooth Scrolling Navigation',
            'Consistent Design Language',
            'Accessible Color Scheme',
        ],
    },
    {
        title: 'Technical Features',
        items: [
            'Dynamic Data Visualization',
            'Modular Code Structure',
            'Content Component Reuse',
            'Custom Table of Contents System',
        ],
    },
    {
        title: 'Future Enhancements',
        items: [
            'Dark Mode Toggle',
            'Progressive Web App Features',
            'Blog Post Search Functionality',
            'Interactive Project Demos',
        ],
    },
]

function PortfolioProject() {
    return (
        <Layout>
            <main className="project-detail-page">
                <section className="project-detail-hero">
                    <p className="project-detail-hero__eyebrow">
                        Project Case Study
                    </p>

                    <h1>Portfolio Website</h1>

                    <p>
                        A responsive developer portfolio site built to showcase
                        projects, technical skills, and development process.
                    </p>
                </section>

                <CardLinkNav links={projectLinks} />

                <ContentSection id="overview" title="Project Overview">
                    <WakaTimeBadge badge={wakatimeBadge} />

                    <p>
                        This portfolio website is a comprehensive showcase of my
                        skills, projects, and experience as a developer. Built
                        as a semester-long project for my Web Development
                        Engineering class at CSUF, it features responsive
                        design, interactive elements, and an organized structure
                        to effectively communicate my work to potential
                        employers and collaborators.
                    </p>

                    <h3>Technologies Used</h3>

                    <div className="card-grid">
                        {overviewCards.map((card) => (
                            <ListCard
                                items={card.items}
                                key={card.title}
                                title={card.title}
                            />
                        ))}
                    </div>
                </ContentSection>
                <ContentSection id="implementation" title="Implementation Details">
                    <div className="card-grid">
                        {implementationCards.map((card) => (
                            <ListCard
                                items={card.items}
                                key={card.title}
                                title={card.title}
                            />
                        ))}
                    </div>

                    <h3>Responsive Design Highlight</h3>

                    <p>
                        One achievement I&apos;m particularly proud of is the mobile/desktop
                        responsiveness implementation on the Skills page. Rather than simply
                        rearranging elements, I created completely separate HTML structures
                        with tailored interaction models for each device type. Desktop charts
                        use hover interactions with “Hover to see data” prompts, while mobile
                        versions use touch interactions with “Select to see data” instructions.
                        This device-specific approach delivers truly optimized experiences
                        without requiring JavaScript to restructure the page based on screen
                        size.
                    </p>

                    <div className="media-grid">
                        {implementationMedia.map((item) => (
                            <MediaCard
                                image={item.image}
                                imageAlt={item.imageAlt}
                                key={item.title}
                                title={item.title}
                            />
                        ))}
                    </div>
                </ContentSection>

                <ContentSection id="challenges" title="Challenges Faced">
                    <div className="card-grid card-grid--three">
                        {challengeCards.map((card) => (
                            <ChallengeCard
                                key={card.title}
                                problem={card.problem}
                                solution={card.solution}
                                title={card.title}
                            />
                        ))}
                    </div>
                </ContentSection>

                <ContentSection id="features" title="Key Features">
                    <div className="card-grid card-grid--three">
                        {featureCards.map((card) => (
                            <ListCard
                                items={card.items}
                                key={card.title}
                                title={card.title}
                            />
                        ))}
                    </div>
                </ContentSection>
            </main>
        </Layout>
    )
}

export default PortfolioProject