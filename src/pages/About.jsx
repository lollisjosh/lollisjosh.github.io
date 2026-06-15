import './About.css'

import Layout from '../components/Layout'
import ProfileImage from '../components/ProfileImage'
import Bio from '../components/Bio'

const resumePdfPath = '/assets/pdf/Joshua-Lollis_Software-Engineer-Resume.pdf'

function About() {
    return (
        <Layout>
            <main className="about-page">
                <section className="about-card" aria-labelledby="about-heading">
                    <h1 id="about-heading">About Me</h1>

                    <ProfileImage />

                    <Bio />
                </section>

                <section className="resume-card" aria-labelledby="resume-heading">
                    <div className="resume-card__header">
                        <p className="resume-card__eyebrow">Resume</p>

                        <h2 id="resume-heading">PDF Resume</h2>

                        <p>
                            View my current software engineering resume below, or open it directly in a new tab.
                        </p>

                        <a
                            className="resume-card__link"
                            href={resumePdfPath}
                            target="_blank"
                            rel="noreferrer"
                        >
                            Open resume PDF
                        </a>
                    </div>

                    <object
                        className="resume-card__viewer"
                        data={resumePdfPath}
                        type="application/pdf"
                        title="Josh Lollis software engineer resume"
                    >
                        <p>
                            Unable to display PDF file.{' '}
                            <a href={resumePdfPath}>Open the resume PDF instead.</a>
                        </p>
                    </object>
                </section>
            </main>
        </Layout>
    )
}

export default About
