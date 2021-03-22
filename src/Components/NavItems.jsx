import routes from '../routes'
import { NavLink } from 'react-router-dom'

function NavItems() {
    return <nav className="nav">
        <NavLink
            exact
            to={routes.home}
            className="nav-link"
            activeClassName="active"
        >
            Home
        </NavLink>
        <NavLink
            to={routes.movies}
            className="nav-link"
            activeClassName="active"
        >
            Movies
        </NavLink>
    </nav>
}

export default NavItems