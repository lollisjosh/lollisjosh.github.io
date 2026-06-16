function ProjectChallengeCard({ problem, solution, title }) {
    return (
        <article className="project-detail-card project-challenge-card">
            <h3>{title}</h3>

            <div className="project-challenge-card__item project-challenge-card__item--problem">
                <p>{problem}</p>
            </div>

            <div className="project-challenge-card__item project-challenge-card__item--solution">
                <p>{solution}</p>
            </div>
        </article>
    )
}

export default ProjectChallengeCard
