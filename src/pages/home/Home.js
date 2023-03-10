// config
import { projectFirestore } from '../../firebase/config'
import { useEffect, useState } from 'react'

//Styles
import './Home.css'

//Components
import RecipeList from '../../components/RecipeList'


export default function Home() {

  // set initial statees for rendering
  const [recipes, setRecipes] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState(null)

  // fetches recipe collection data upon load
  useEffect(() => {
      
    setIsPending(true)

    const unsub = projectFirestore.collection('recipes').onSnapshot((snapshot) => {
        if (snapshot.empty) {
          setError('No recipes to load')
          setIsPending(false)
          setRecipes([])
        }else{
          let results = []
          snapshot.docs.forEach((doc) => {
            results.push({...doc.data(), id: doc.id})
          })
          setRecipes(results)
          setIsPending(false)
        }
      }, (err) => {
        setError(err.message)
        setIsPending(false)
      })

      //We use this as a clean up function
      return () => unsub()

  }, [])

  
  return (
    <div className="home">
        <div>Home</div>
        {isPending && <p className="loading">Loading...</p>}
        {error && <p className="error">{error}</p>}
        {recipes && <RecipeList recipes={recipes} />}
    </div>

  )
}
