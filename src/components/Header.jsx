import { useState } from 'react'

import './Header.css'

const navLinks = [
  { href: '/index.html', label: 'Home' },
  { href: '/about.html', label: 'About' },
  { href: '/skills.html', label: 'Skills' },
  { href: '/projects.html', label: 'Projects' },
  { href: '/blog.html', label: 'Blogs' },
  { href: '/band.html', label: 'Band' },
  { href: '/interests.html', label: 'Other' },
]

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  function toggleMenu() {
    setIsMenuOpen((current) => !current)
  }

  function closeMenu() {
    setIsMenuOpen(false)
  }

  return (
    <header className="site-header">
      <div className="site-header__bar-wrap">
        <nav className="site-header__bar" aria-label="Main navigation">
          <button
            className="site-header__menu-toggle"
            type="button"
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
            onClick={toggleMenu}
          >
            <span>☲</span>
          </button>

          <a
            href="/index.html"
            className="site-header__home-button"
            aria-label="Home"
            onClick={closeMenu}
          >
            <span>⌂</span>
          </a>
        </nav>
      </div>

      {isMenuOpen && (
        <button
          className="site-header__menu-backdrop"
          type="button"
          aria-label="Close navigation menu"
          onClick={closeMenu}
        />
      )}

      <ul
        className={`site-header__nav-list${
          isMenuOpen ? ' site-header__nav-list--open' : ''
        }`}
      >
        {navLinks.map((link) => (
          <li className="site-header__nav-item" key={link.href}>
            <a
              className="site-header__nav-link"
              href={link.href}
              onClick={closeMenu}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </header>
  )
}

export default Header
