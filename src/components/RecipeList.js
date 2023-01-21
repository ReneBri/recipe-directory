import { Link } from 'react-router-dom'
import { useTheme } from '../hooks/useTheme'
//Styles
import './RecipeList.css'

export default function RecipeList({ recipes }) {

    const { mode } = useTheme()
  return (
    <div className="recipe-list">
        {recipes.map((recipe) => (
            <div key={recipe.id} className={`card ${mode}`}>
                <h3>{recipe.title}</h3>
                <p>{recipe.cookingTime} to make. No of Ingredients: {recipe.ingredients.length}</p>
                <div>
                    <p>{recipe.method.substring(0, 100) + '....'}</p>
                </div>
                <Link to={`/recipes/${recipe.id}`}>Cook This</Link>
            </div>
        ))}
    </div>
 )
}
