import './Footer.css'

const socialLinks = [
  {
    href: 'https://github.com/TelloViz',
    className: 'footer-social-link fa-brands fa-github hover-transform-up',
    label: 'GitHub',
  },
  {
    href: 'https://instagram.com/tello.vision',
    className: 'footer-social-link fa-brands fa-instagram hover-transform-up',
    label: 'Instagram',
  },
  {
    href: 'https://www.youtube.com/@tello-visiongames4464',
    className: 'footer-social-link fa-brands fa-youtube hover-transform-up',
    label: 'YouTube',
  },
  {
    href: 'https://www.linkedin.com/in/lollisjosh/',
    className: 'footer-social-link fa-brands fa-linkedin hover-transform-up',
    label: 'LinkedIn',
  },
]

function Footer() {
  return (
    <footer id="site-footer">
      <p>Designed and Developed by Josh Lollis</p>

      <div id="social-div" aria-label="Social links">
        {socialLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className={link.className}
            aria-label={link.label}
            target="_blank"
            rel="noopener noreferrer"
          />
        ))}
      </div>

      <div id="wakatime-container">
        <h5>Coding time (Since Aug '23)</h5>

        <a
          id="wakatime-site-hours"
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