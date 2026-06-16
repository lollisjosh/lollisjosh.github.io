import ContentCard from './ContentCard.jsx'

function ListCard({ items, title }) {
    return (
        <ContentCard title={title}>
            <ul>
                {items.map((item) => (
                    <li key={item}>{item}</li>
                ))}
            </ul>
        </ContentCard>
    )
}

export default ListCard
