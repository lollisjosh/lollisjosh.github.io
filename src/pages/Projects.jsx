import { useState } from 'react'

import Layout from '../components/Layout'
import ProjectPreviewList from '../components/ProjectPreviewList'
import { projectCategories, projects } from '../data/projects'

import './Projects.css'

const allCategoryIds = projectCategories.map((category) => category.id)

function Projects() {
  const [selectedCategoryIds, setSelectedCategoryIds] = useState(allCategoryIds)

  const isShowingAll = selectedCategoryIds.length === allCategoryIds.length

  const visibleCategories = projectCategories.filter((category) =>
    selectedCategoryIds.includes(category.id),
  )

  function showAllCategories() {
    setSelectedCategoryIds(allCategoryIds)
  }

  function toggleCategory(categoryId) {
    setSelectedCategoryIds((currentCategoryIds) => {
      if (currentCategoryIds.length === allCategoryIds.length) {
        return [categoryId]
      }

      if (currentCategoryIds.includes(categoryId)) {
        const nextCategoryIds = currentCategoryIds.filter(
          (currentCategoryId) => currentCategoryId !== categoryId,
        )

        return nextCategoryIds.length > 0 ? nextCategoryIds : allCategoryIds
      }

      return [...currentCategoryIds, categoryId]
    })
  }

  return (
    <Layout>
      <main className="projects-page">
        <section className="projects-hero">
          <p className="projects-hero__eyebrow">Project Index</p>

          <h1>Projects</h1>

          <p>
            A categorized collection of active builds, completed work, and
            prototypes from my portfolio.
          </p>
        </section>

        <div className="projects-filter" aria-label="Filter project categories">
          <button
            className="projects-filter__button"
            type="button"
            aria-pressed={isShowingAll}
            onClick={showAllCategories}
          >
            All
          </button>

          {projectCategories.map((category) => {
            const isSelected = selectedCategoryIds.includes(category.id)

            return (
              <button
                className="projects-filter__button"
                type="button"
                aria-pressed={isSelected && !isShowingAll}
                key={category.id}
                onClick={() => toggleCategory(category.id)}
              >
                {category.title}
              </button>
            )
          })}
        </div>

        <div className="projects-sections">
          {visibleCategories.map((category) => {
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
