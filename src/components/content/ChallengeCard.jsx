function ChallengeCard({ problem, solution, title }) {
    return (
        <article className="content-card challenge-card">
            <h3>{title}</h3>

            <div className="challenge-card__item challenge-card__item--problem">
                <p>{problem}</p>
            </div>

            <div className="challenge-card__item challenge-card__item--solution">
                <p>{solution}</p>
            </div>
        </article>
    )
}

export default ChallengeCard
