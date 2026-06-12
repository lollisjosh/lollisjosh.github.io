import ProjectRailItem from './ProjectRailItem'

import './ProjectRail.css'

function ProjectRail({
    projects = [],
    attachTo = 'viewport',
    side = 'right',
    revealDirection = 'left',
    label = 'Featured projects',
}) {
    return (
        <aside
            className="project-rail"
            data-attach-to={attachTo}
            data-side={side}
            data-reveal-direction={revealDirection}
            aria-label={label}
        >
            {projects.map((project) => (
                <ProjectRailItem key={project.id} project={project} />
            ))}
        </aside>
    )
}

export default ProjectRail