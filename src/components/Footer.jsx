import './Footer.css'

const socialLinks = [
  {
    href: 'https://github.com/TelloViz',
    iconClass: 'fa-brands fa-github',
    label: 'GitHub',
  },
  {
    href: 'https://instagram.com/tello.vision',
    iconClass: 'fa-brands fa-instagram',
    label: 'Instagram',
  },
  {
    href: 'https://www.youtube.com/@tello-visiongames4464',
    iconClass: 'fa-brands fa-youtube',
    label: 'YouTube',
  },
  {
    href: 'https://www.linkedin.com/in/lollisjosh/',
    iconClass: 'fa-brands fa-linkedin',
    label: 'LinkedIn',
  },
]

function Footer() {
  return (
    <footer className="site-footer">
      <p className="site-footer__credit">
        Designed and Developed by Josh Lollis
      </p>

      <div className="site-footer__socials" aria-label="Social links">
        {socialLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className={`site-footer__social-link ${link.iconClass}`}
            aria-label={link.label}
            target="_blank"
            rel="noopener noreferrer"
          />
        ))}
      </div>

      <div className="site-footer__wakatime">
        <h5>Coding time (Since Aug '23)</h5>

        <a
          className="site-footer__wakatime-link"
          href="https://wakatime.com/@a45be745-6431-45a2-8c9d-c19040dcd283"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="https://wakatime.com/badge/user/a45be745-6431-45a2-8c9d-c19040dcd283.svg"
            alt="Total time coded since Aug 12 2023"
          />
        </a>
      </div>
    </footer>
  )
}

export default Footer