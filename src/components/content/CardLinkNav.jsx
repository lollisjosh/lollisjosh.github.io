function CardLinkNav({ links }) {
    return (
        <nav className="card-link-nav" aria-label="Portfolio project sections">
            {links.map((link) => (
                <a
                    className="card-link"
                    href={link.href}
                    key={link.href}
                    rel={link.isExternal ? 'noreferrer' : undefined}
                    target={link.isExternal ? '_blank' : undefined}
                >
                    {link.iconClassName ? (
                        <span
                            aria-hidden="true"
                            className={`card-link__icon ${link.iconClassName}`}
                        />
                    ) : null}

                    <span>{link.label}</span>
                </a>
            ))}
        </nav>
    )
}

export default CardLinkNav
