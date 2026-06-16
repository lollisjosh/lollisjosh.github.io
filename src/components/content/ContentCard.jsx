function ContentCard({ children, className = '', title }) {
    const cardClassName = ['content-card', className]
        .filter(Boolean)
        .join(' ')

    return (
        <article className={cardClassName}>
            <h3>{title}</h3>

            {children}
        </article>
    )
}

export default ContentCard
