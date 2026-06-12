import Layout from '../components/Layout'
import ProjectPreviewList from '../components/ProjectPreviewList'
import { projectCategories, projects } from '../data/projects'

import './Projects.css'

function Projects() {
    return (
        <Layout>
            <main className="projects-page">
                <section className="projects-hero">
                    <p className="projects-hero__eyebrow">Project Index</p>

                    <h1>Projects</h1>

                    <p>
                        A categorized collection of active builds, completed work, and prototypes from my portfolio.
                    </p>
                </section>

                <nav className="projects-toc" aria-label="Projects categories">
                    {projectCategories.map((category) => (
                        <a key={category.id} href={`#${category.id}`}>
                            {category.title}
                        </a>
                    ))}
                </nav>

                <div className="projects-sections">
                    {projectCategories.map((category) => {
                        const categoryProjects = projects.filter(
                            (project) => project.category === category.id,
                        )

                        return (
                            <section
                                className="projects-section"
                                id={category.id}
                                key={category.id}
                            >
                                <div className="projects-section__header">
                                    <h2>{category.title}</h2>
                                    <p>{category.description}</p>
                                </div>

                                <ProjectPreviewList projects={categoryProjects} />
                            </section>
                        )
                    })}
                </div>
            </main>
        </Layout>
    )
}

export default Projects
