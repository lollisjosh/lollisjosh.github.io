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
        </main>

        <ProjectRail side="right" revealDirection="left" />
      </div>
    </Layout>
  )
}

export default Home