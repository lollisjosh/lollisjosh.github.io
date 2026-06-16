import ContentCard from './ContentCard.jsx'

function ChallengeCard({ problem, solution, title }) {
    return (
        <ContentCard className="challenge-card" title={title}>
            <div className="challenge-card__item challenge-card__item--problem">
                <p>{problem}</p>
            </div>

            <div className="challenge-card__item challenge-card__item--solution">
                <p>{solution}</p>
            </div>
        </ContentCard>
    )
}

export default ChallengeCard
