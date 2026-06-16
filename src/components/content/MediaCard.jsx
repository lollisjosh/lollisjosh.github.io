function MediaCard({ image, imageAlt, title }) {
    return (
        <article className="media-card">
            <h3>{title}</h3>

            <div className="media-card__frame">
                <img alt={imageAlt} src={image} />
            </div>
        </article>
    )
}

export default MediaCard
