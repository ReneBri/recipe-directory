// hooks
import { useParams } from 'react-router-dom'
import { useTheme } from '../../hooks/useTheme'
import { useEffect, useState } from 'react'

// config file
import { projectFirestore } from '../../firebase/config'

//Styles
import './Recipe.css'


export default function Recipe() {

  const { mode } = useTheme()

    // takes in params dynamically and sets to a url to fetch
    const queryParam = useParams()
    const { id } = queryParam

    // sets initial fetching values
    const [recipe, setRecipe] = useState(null)
    const [isPending, setIsPending] = useState(true)
    const [error, setError] = useState(null)

    // fetches the exact recipe
    useEffect(() => {
      const unsub = projectFirestore.collection('recipes').doc(id).onSnapshot((snapshot) => {
        if(!snapshot.exists){
          setIsPending(false)
          setError('Could not find that recipe')
        }else if(snapshot.empty){
          setIsPending(false)
          setError('Could not find this recipe')
          setRecipe({})
        }else{
          setIsPending(false)
          setRecipe(snapshot.data())
        }
        console.log(snapshot)
      })
      // clean up function
      return () => unsub()

    }, (err) => {
      if(err){
        setError(err.message)
        setIsPending(false)
      }

    }, [])
   
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
