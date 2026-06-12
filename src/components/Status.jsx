import './Status.css'

const statusMessage = 'Currently migrating this site to React. Many pages are still in transition.'

function Status() {
    return (
        <aside
            className="status"
            aria-label={`Current site status: ${statusMessage}`}
        >
            <span className="status__indicator" aria-hidden="true">
                ●
            </span>

            <div className="status__ticker" aria-hidden="true">
                <span className="status__message">
                    {statusMessage}
                </span>
            </div>
        </aside>
    )
}

export default Status