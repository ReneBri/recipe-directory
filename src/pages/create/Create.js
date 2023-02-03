// hooks
import { useState, useRef } from 'react'
import { projectFirestore } from '../../firebase/config'
import { useHistory } from 'react-router-dom'

//Styles
import './Create.css'


export default function Create() {

  // sets initial states for user inouts
  const [ title, setTitle ] = useState("")
  const [ method, setMethod ] = useState("")
  const [ cookingTime, setCookingTime ] = useState("")
  const [ newIngredient, setNewIngredient ] = useState("")
  const [ ingredients, setIngredients ] = useState([])
  const ingredientInput = useRef(null) 
  const history = useHistory()

  // handles the submit by creating a document with the user input and adding it
  // to the firestore collection
  const handleSubmit = async (e) => {

    e.preventDefault()
    const doc = { title, ingredients, method, cookingTime: cookingTime + ' minutes'}

     //Post data & redirect user
    try {
      await projectFirestore.collection('recipes').add(doc)
      history.push("/")
    }catch(err){
      console.log(err)
    }
  }

 
  // handles adding a new ingredient to the list
  const handleAdd = (e) => { 

    //Prevents button from submitting
    e.preventDefault()
    //Makes a var out of the cleaned up New Ingredient
    const ing = newIngredient.trim()

    //Checks if new var matches any already existing ingredients & if there even is an ingredient in the first place
    if(ing && !ingredients.includes(ing)){
      setIngredients((prevIngredients) => {
        return [...prevIngredients, ing]
      })
    }
    setNewIngredient("")
    //This here is a good use for refs
    ingredientInput.current.focus()
    
  }


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
