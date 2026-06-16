import ContentCard from './ContentCard.jsx'

function MediaCard({ image, imageAlt, title }) {
    return (
        <ContentCard className="media-card" title={title}>
            <div className="media-card__frame">
                <img alt={imageAlt} src={image} />
            </div>
        </ContentCard>
    )
}

export default MediaCard
