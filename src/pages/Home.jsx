import '../App.css'
import Layout from '../components/Layout'
import ProjectTabs from '../components/ProjectTabs'
import Status from '../components/Status'

function Home() {
  return (
    <Layout>
      <main className="app-shell">
        <section className="intro-card">
          <h1>Welcome to My Portfolio</h1>

          <Status />

          <p>
            This is the first React/Vite proof page using my existing portfolio assets.
          </p>

          <img
            src="/assets/images/pfp.png"
            alt="Josh Lollis profile"
            className="profile-image"
          />
        </section>

        <ProjectTabs />

      </main>
    </Layout>
  )
}

export default Home
