import './Bio.css'

const tags = ['Front-End', 'Interactive Apps', 'Creative Tools']

function Bio() {
    return (
        <section className="bio" aria-labelledby="bio-heading">
            <h2 id="bio-heading" className="bio__greeting">
                Hi, I'm Josh!
            </h2>

            <div className="bio__tags" aria-label="Professional focus areas">
                {tags.map((tag, index) => (
                    <span key={tag} className="bio__tag-group">
                        <span className="bio__tag">{tag}</span>
                        {index < tags.length - 1 && (
                            <span className="bio__separator" aria-hidden="true">
                                •
                            </span>
                        )}
                    </span>
                ))}
            </div>

            <div className="bio__content">
                <p>
                    Software engineer focused on front-end development, interactive
                    interfaces, and creative tools. I have 10+ years of personal and
                    academic project experience across websites, desktop apps, games,
                    and music-related utilities. Recently graduated Cum Laude with a
                    B.S. in Computer Science from California State University,
                    Fullerton after a non-traditional educational path.
                </p>
            </div>
        </section>
    )
}

export default Bio
