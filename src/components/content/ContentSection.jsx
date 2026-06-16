function ContentSection({ children, id, title }) {
    return (
        <section className="content-section" id={id}>
            <h2>{title}</h2>
            {children}
        </section>
    )
}

export default ContentSection
