function WakaTimeBadge({ badge }) {
    return (
        <div className="wakatime-badge">
            <a
                className="wakatime-badge__link"
                href={badge.href}
                rel="noreferrer"
                target="_blank"
            >
                <img
                    alt="WakaTime development hours"
                    src={badge.image}
                    title="Total development time tracked with WakaTime"
                />
            </a>
        </div>
    )
}

export default WakaTimeBadge
