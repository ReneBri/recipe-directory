import { Link } from 'react-router-dom'
import { useTheme } from '../hooks/useTheme'

//Styles
import './NavBar.css'

export default function NavBar() {

  const { color } = useTheme()

  return (
    <div className="navbar" style={{ background: color }}>
        <nav>
            
            <Link to="/" className="brand">
                <h1>Recipe Directory</h1>
            </Link>

            <Link to="/create">Create Recipe</Link>

        </nav>
    </div>
  )
}
