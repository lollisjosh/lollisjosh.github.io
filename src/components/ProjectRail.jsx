import ProjectRailItem from './ProjectRailItem'
import { projects } from '../data/projects'

function ProjectRail() {
    return (
        <div className="sliding-projects">
            {projects.map((project) => (
                <ProjectRailItem key={project.id} project={project} />
            ))}
        </div>
    )
}

export default ProjectRail
