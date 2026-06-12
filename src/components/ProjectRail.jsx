import ProjectRailItem from './ProjectRailItem'
import { projects } from '../data/projects'

import './ProjectRail.css'

function ProjectRail({ side = 'right', revealDirection = 'left' }) {
    return (
        <aside
            className="project-rail"
            data-side={side}
            data-reveal-direction={revealDirection}
            aria-label="Featured projects"
        >
            {projects.map((project) => (
                <ProjectRailItem key={project.id} project={project} />
            ))}
        </aside>
    )
}

export default ProjectRail