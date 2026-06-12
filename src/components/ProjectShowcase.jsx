import ProjectPreviewList from './ProjectPreviewList'
import ProjectRail from './ProjectRail'
import { projects } from '../data/projects'

import './ProjectShowcase.css'

function ProjectShowcase({ projectIds = projects.map((project) => project.id) }) {
    const selectedProjects = projectIds
        .map((projectId) => projects.find((project) => project.id === projectId))
        .filter(Boolean)

    return (
        <section className="project-showcase" aria-labelledby="project-showcase-heading">
            <div className="project-showcase__content">
                <p className="project-showcase__eyebrow">Featured Work</p>
                <h2 id="project-showcase-heading">Projects</h2>
                <p>
                    A small collection of games, tools, experiments, and interface
                    work.
                </p>
            </div>

            <ProjectPreviewList projects={selectedProjects} />

            <ProjectRail
                projects={selectedProjects}
                attachTo="parent"
                side="right"
                revealDirection="left"
                label="Featured projects"
            />
        </section>
    )
}

export default ProjectShowcase
