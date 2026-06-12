import '../App.css'
import Layout from '../components/Layout'
import ProjectRail from '../components/ProjectRail'
import Status from '../components/Status'
import ProfileImage from '../components/ProfileImage'
import Bio from '../components/Bio'

function Home() {
  return (
    <Layout>
      <div className="home-page">
        <main className="app-shell">
          <section className="intro-card">
            <h1>Welcome to My Portfolio</h1>

            <Status />

            <ProfileImage />

            <Bio />
          </section>

          <section className="project-showcase" aria-labelledby="project-showcase-heading">
            <div className="project-showcase__content">
              <p className="project-showcase__eyebrow">Featured Work</p>
              <h2 id="project-showcase-heading">Projects</h2>
              <p>
                A small collection of games, tools, experiments, and interface
                work. Hover over a project tab to open the panel.
              </p>
            </div>

            <ProjectRail
              attachTo="parent"
              side="right"
              revealDirection="left"
              label="Featured projects"
            />
          </section>
        </main>
      </div>
    </Layout>
  )
}

export default Home