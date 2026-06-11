import ProjectRailItem from './ProjectRailItem'
import { projects } from '../data/projects'

import './ProjectRail.css'

function ProjectRail() {
    return (
        <div className="project-rail">
            {projects.map((project) => (
                <ProjectRailItem key={project.id} project={project} />
            ))}
        </div>
    )
}

export default ProjectRail
