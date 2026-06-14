import './Home.css'

import Layout from '../components/Layout'
import ProjectShowcase from '../components/ProjectShowcase'
import Status from '../components/Status'
import ProfileImage from '../components/ProfileImage'
import Bio from '../components/Bio'
import ContactSection from '../components/ContactSection'

const featuredProjectIds = [
  'antillery',
  'card_collection',
  'snake',
  'portfolio',
  'xb2midi',
]

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

          <ProjectShowcase projectIds={featuredProjectIds} />

          <ContactSection />
        </main>
      </div>
    </Layout>
  )
}

export default Home
