import PreviewLink from './PreviewLink'

import './ProjectPreviewList.css'

function ProjectPreviewList({ projects = [] }) {
    return (
        <div className="project-preview-list">
            {projects.map((project) => (
                <PreviewLink
                    key={project.id}
                    href={project.href}
                    thumbnail={project.image}
                    thumbnailAlt={project.imageAlt}
                    title={project.title}
                    description={project.description}
                    actionLabel="View Project"
                />
            ))}
        </div>
    )
}

export default ProjectPreviewList