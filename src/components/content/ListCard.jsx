function ListCard({ items, title }) {
    return (
        <article className="content-card">
            <h3>{title}</h3>

            <ul>
                {items.map((item) => (
                    <li key={item}>{item}</li>
                ))}
            </ul>
        </article>
    )
}

export default ListCard
