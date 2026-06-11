const tags = ['Front-End', 'Interactive Apps', 'Creative Tools']

function Bio() {
    return (
        <>
            <h2 className="intro-greeting">Hi, I'm Josh!</h2>

            <div id="bio-container" className="hover-transform-up">
                <div id="role-tags">
                    <nav className="tags-list" aria-label="Professional focus areas">
                        {tags.map((tag, index) => (
                            <span key={tag}>
                                <span className="tag">{tag}</span>
                                {index < tags.length - 1 && (
                                    <span className="tag-separator">•</span>
                                )}
                            </span>
                        ))}
                    </nav>
                </div>

                <article id="bio">
                    <p>
                        Software engineer focused on front-end development, interactive
                        interfaces, and creative tools. I have 10+ years of personal and
                        academic project experience across websites, desktop apps, games,
                        and music-related utilities. Recently graduated Cum Laude with a
                        B.S. in Computer Science from California State University,
                        Fullerton after a non-traditional educational path.
                    </p>
                </article>
            </div>
        </>
    )
}

export default Bio
