import '../App.css'
import Layout from '../components/Layout'

function Home() {
  return (
    <Layout>
      <main className="app-shell">
        <section className="intro-card">
          <h1>Welcome to My Portfolio</h1>

          <p>
            This is the first React/Vite proof page using my existing portfolio assets.
          </p>

          <img
            src="/assets/images/pfp.png"
            alt="Josh Lollis profile"
            className="profile-image"
          />
        </section>
      </main>
    </Layout>
  )
}

export default Home
