function ProjectDetailSection({ children, id, title }) {
    return (
        <section className="project-detail-section" id={id}>
            <h2>{title}</h2>
            {children}
        </section>
    )
}

export default ProjectDetailSection
