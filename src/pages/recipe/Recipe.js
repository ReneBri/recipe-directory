import { useParams } from 'react-router-dom'
import { useTheme } from '../../hooks/useTheme'
import { useEffect, useState } from 'react'

import { projectFirestore } from '../../firebase/config'

//Styles
import './Recipe.css'

export default function Recipe() {

  const { mode } = useTheme()

    //Takes in params dynamically and sets to a url to fetch
    const queryParam = useParams()
    const { id } = queryParam

    const [recipe, setRecipe] = useState(null)
    const [isPending, setIsPending] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
      projectFirestore.collection('recipes').doc(id).get()
      .then((snapshot) => {
        if(snapshot.empty){
          setIsPending(false)
          setError('No data to load')
        }else{
          setIsPending(false)
          setRecipe(snapshot.data())
        }
        console.log(snapshot)
      }).catch(err => {
        setError(err)
        setIsPending(false)
      })
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
