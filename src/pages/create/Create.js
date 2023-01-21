import { useState, useRef, useEffect } from 'react'
import { useFetch } from '../../hooks/useFetch'
import { useHistory } from 'react-router-dom'

//Styles
import './Create.css'

export default function Create() {
  const [ title, setTitle ] = useState("")
  const [ method, setMethod ] = useState("")
  const [ cookingTime, setCookingTime ] = useState("")
  const [ newIngredient, setNewIngredient ] = useState("")
  const [ ingredients, setIngredients ] = useState([])
  const ingredientInput = useRef(null) 
  const history = useHistory()

  const { postData, data, error } = useFetch("http://localhost:3000/recipes", "POST")

  const handleSubmit = (e) => {
    e.preventDefault()
    postData({ title, ingredients, method, cookingTime: cookingTime + ' minutes'})
  }

  //Redirect user when we get a data response from the POST request
  useEffect(() => {
    if(data){
    history.push("/")
    }
  }, [data])

  const handleAdd = (e) => { 
    //Prevents button from submitting
    e.preventDefault()
    //Makes a var out of the cleaned up New Ingredient
    const ing = newIngredient.trim()

    //Checks if new var matches any already existing ingredients & if there even is a ingredient in the first place
    if(ing && !ingredients.includes(ing)){
      setIngredients((prevIngredients) => {
        return [...prevIngredients, ing]
      })
    }
    setNewIngredient("")
    //This here is a good use for refs
    ingredientInput.current.focus()
    
  }

  console.log(ingredients)

  return (
    <div className="create">

      <h2 className="page-title">Add a New Recipe</h2>

      <form onSubmit={handleSubmit}>
        {/* ------------------------------- */}
        <label>
          <span>Recipe Title</span>
          <input 
            type='text' 
            value={title}
            onChange={(e) => {
              setTitle(e.target.value) 
            }} 
            required
          />
        </label>

        {/* ------------------------------- */}
        <label>
          <span>Recipe Ingredients:</span>
          <div className="ingredients">
          <input 
            type='text' 
            value={newIngredient}
            onChange={(e) => {
              setNewIngredient(e.target.value) 
            }} 
            ref={ingredientInput}
          />
            <button className="btn" onClick={handleAdd}>add</button>
          </div>
        </label>
        <p>Current Ingredients: {ingredients.map(i => <em key={i}>{i},</em>)}</p>

        {/* ------------------------------- */}
        <label>
          <span>Cooking Time (Minutes)</span>
          <input 
            type='number' 
            value={cookingTime}
            onChange={(e) => {
              setCookingTime(e.target.value)               
            }} 
            required
          />
        </label>

        {/* ------------------------------- */}
        <label>
          <span>Method</span>
          <input 
            type='text' 
            value={method}
            onChange={(e) => {
              setMethod(e.target.value)
            }} 
            required
          />
        </label>

        <button className="btn">submit</button>

      </form>
    </div>
  )
}
