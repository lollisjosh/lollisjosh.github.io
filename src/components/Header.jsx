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
  { href: '/contact.html', label: 'Contact' },
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
    <header>
      <div className="navbar-container">
        <nav id="navbar" aria-label="Main navigation">
          <button
            id="mobile-menu"
            className="menu-toggle"
            type="button"
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
            onClick={toggleMenu}
          >
            <span>☲</span>
          </button>

          <a
            href="/index.html"
            className="home-button"
            aria-label="Home"
            onClick={closeMenu}
          >
            <span>⌂</span>
          </a>
        </nav>
      </div>

      <ul className={`header-list${isMenuOpen ? ' active' : ''}`}>
        {navLinks.map((link) => (
          <li className="header-list-item" key={link.href}>
            <a
              className="header-list-item-a"
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
