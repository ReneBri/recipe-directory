// hooks 
import { Link } from 'react-router-dom'
import { useTheme } from '../hooks/useTheme'
import { projectFirestore } from '../firebase/config'

//Styles
import './RecipeList.css'
import Trashcan from '../assets/trashcan.svg'


export default function RecipeList({ recipes }) {

    const { mode } = useTheme()

    const handleClick = (id) => {
        projectFirestore.collection("recipes").doc(id).delete()
    }

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
                <img 
                    src={Trashcan}
                    className="delete"
                    onClick={() => handleClick(recipe.id)}
                />
            </div>
        ))}
    </div>
 )
}
