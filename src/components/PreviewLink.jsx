import './PreviewLink.css'

function PreviewLink({
    href,
    thumbnail,
    thumbnailAlt = '',
    title,
    description,
    actionLabel = 'View',
}) {
    return (
        <a href={href} className="preview-link">
            {thumbnail && (
                <div className="preview-link__thumbnail">
                    <img src={thumbnail} alt={thumbnailAlt} />
                </div>
            )}

            <div className="preview-link__body">
                <h3>{title}</h3>

                {description && <p>{description}</p>}

                <span className="preview-link__action">{actionLabel}</span>
            </div>
        </a>
    )
}

export default PreviewLink
