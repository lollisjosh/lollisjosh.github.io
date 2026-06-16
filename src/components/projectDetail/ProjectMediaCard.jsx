function ProjectMediaCard({ image, imageAlt, title }) {
    return (
        <article className="project-media-card">
            <h3>{title}</h3>

            <div className="project-media-frame">
                <img alt={imageAlt} src={image} />
            </div>
        </article>
    )
}

export default ProjectMediaCard
