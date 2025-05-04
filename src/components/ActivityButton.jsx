import { Link } from 'react-router-dom'

const ActivityButton = ({ to, user }) => {
    if (!user) {
        return (
            <div className="tooltip" data-tip="Debes iniciar sesión">
                <button className="btn btn-secondary btn-lg opacity-50" disabled>
                    Juega y Aprende
                </button>
            </div>
        )
    }

    return (
        <Link to={to} className="btn btn-secondary btn-lg animate-bounce">
            Juega y Aprende 🎮
        </Link>
    )
}

export default ActivityButton
