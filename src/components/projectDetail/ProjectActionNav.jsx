function ProjectActionNav({ links }) {
    return (
        <nav className="project-action-nav" aria-label="Portfolio project sections">
            {links.map((link) => (
                <a
                    className="project-action-card"
                    href={link.href}
                    key={link.href}
                    rel={link.isExternal ? 'noreferrer' : undefined}
                    target={link.isExternal ? '_blank' : undefined}
                >
                    {link.iconClassName ? (
                        <span
                            aria-hidden="true"
                            className={`project-action-card__icon ${link.iconClassName}`}
                        />
                    ) : null}

                    <span>{link.label}</span>
                </a>
            ))}
        </nav>
    )
}

export default ProjectActionNav
