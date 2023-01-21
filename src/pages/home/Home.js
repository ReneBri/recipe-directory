import { useFetch } from '../../hooks/useFetch'

//Styles
import './Home.css'

//Compenents
import RecipeList from '../../components/RecipeList'


export default function Home() {

    const url = 'http://localhost:3000/recipes'
    const { data: recipes, isPending, error } = useFetch(url)

  return (
    <div className="home">
        <div>Home</div>
        {isPending && <p className="loading">Loading...</p>}
        {error && <p className="error">{error}</p>}
        {recipes && <RecipeList recipes={recipes} />}
    </div>

  )
}
