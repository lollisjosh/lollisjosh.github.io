function ProjectRailItem({ project }) {
    return (
        <div className="project-tab" data-project={project.id}>
            <div className="tab-preview">
                <img src={project.image} alt={project.imageAlt} />
            </div>

            <div className="tab-content">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <span className="view-more">View Project</span>
            </div>

            <a href={project.href} className="project-link"></a>
        </div>
    )
}

export default ProjectRailItem
