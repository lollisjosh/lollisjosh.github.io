import ProjectTab from './ProjectTab'
import { projects } from '../data/projects'

function ProjectTabs() {
    return (
        <div className="sliding-projects">
            {projects.map((project) => (
                <ProjectTab key={project.id} project={project} />
            ))}
        </div>
    )
}

export default ProjectTabs
