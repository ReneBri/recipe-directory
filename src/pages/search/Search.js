//Styles
import './Search.css'

//Hooks
import { useLocation } from 'react-router-dom'
import { useFetch } from '../../hooks/useFetch'

//Components
import RecipeList from '../../components/RecipeList'

//Main
export default function Search() {

  const queryString = useLocation().search
  const queryParams = new URLSearchParams(queryString)
  const query = queryParams.get("q")

  const url = "http://localhost:3000/recipes?q=" + query

  const { data: recipes, isPending, error } = useFetch(url)
 
  return (
    <div>
      <h2 className="page-title">Recipes Including: "{query}"</h2>
      {isPending && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}
      {recipes && <RecipeList recipes={recipes}/>}
      {recipes && recipes.length === 0 && <p className="error">No recipies matching this search. Sorry :(</p>}
    </div>
  )
}
