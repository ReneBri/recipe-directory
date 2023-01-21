import { useFetch } from '../../hooks/useFetch'
import { useParams } from 'react-router-dom'
import { useTheme } from '../../hooks/useTheme'

//Styles
import './Recipe.css'

export default function Recipe() {

  const { mode } = useTheme()

    //Takes in params dynamically and sets to a url to fetch
    const queryParam = useParams()
    const { id } = queryParam
    const url = `http://localhost:3000/recipes/${id}`
    const { data: recipe, isPending, error } = useFetch(url)

  return (
    <div className={`recipe ${mode}`}>
        <div>Recipe</div>
        {isPending && <p className="loading">Loading...</p>}
        {error && <p className="error">{error}</p>}
        {recipe && (
            <>
                <h2 className="recipe-title">{recipe.title}</h2>
                <p>Takes {recipe.cookingTime} to cook.</p>
                <ul>
                  {recipe.ingredients.map((ing) => (
                    <li key={ing}>{ing}</li>
                  ))}
                </ul>
                <p className="method">{recipe.method}</p>
            </>)}
    </div>
  )
}
