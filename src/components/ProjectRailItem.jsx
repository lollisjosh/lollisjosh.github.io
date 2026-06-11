function ProjectRailItem({ project }) {
    return (
        <div className="project-rail__item" data-project={project.id}>
            <div className="project-rail__preview">
                <img src={project.image} alt={project.imageAlt} />
            </div>

            <div className="project-rail__content">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <span className="project-rail__view-more">View Project</span>
            </div>

            <a href={project.href} className="project-rail__link"></a>
        </div>
    )
}

export default ProjectRailItem
