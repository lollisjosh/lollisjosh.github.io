function ProjectInfoCard({ items, title }) {
    return (
        <article className="project-detail-card">
            <h3>{title}</h3>

            <ul>
                {items.map((item) => (
                    <li key={item}>{item}</li>
                ))}
            </ul>
        </article>
    )
}

export default ProjectInfoCard
