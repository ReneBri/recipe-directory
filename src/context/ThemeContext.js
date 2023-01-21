import { createContext, useReducer } from 'react'

export const ThemeContext = createContext()

///////////////////////////////////////////////////////////////////////////////

//The state input is the original value of the state as declared by useReducer
//the action input is an object provided by the dispatch()
const themeReducer = (state, action) => {
    switch (action.type) {
        case 'CHANGE_COLOR':
            return { ...state, color: action.payload}
        case 'CHANGE_MODE':
            return { ...state, mode: action.payload}
        default:
            return state
    }
}

//Here's how I see this working. The state and the function changeColor() are 
//passed into the other components to be used. When changColor() is envoked in these 
//other components it fires the dispatch() function, which is assosiated with the 
//useReducer(). (It's easier to think of [state, dispatch] as [state, setState]) 
//Dispatch() causes the state to be changed to an object with a type and
//payload property. This change of state triggers the themeReducer(). ThemeReducer()
//uses a switch statement to check the action.type property. If there is one
//and its string matches that of the type property set in the dispatch() then
//the original state, the state declared by useReducer(), is returned with
//{...state} and its key value pairs are changed to those set in the actions'
//payload property
export function ThemeProvider({ children }) {

    //Input 1 is the function associated with the useReducer
    //Input 2 is the initial value of the state
    //This is basically [state, setState] 
    //but here we call it [state, dispatch]
    const [state, dispatch] = useReducer(themeReducer, {
        color: '#58249c',
        mode: 'light'
    })

    //This is what is passed through to the other components to change the state
    const changeColor = (color) => {
        dispatch({ type: 'CHANGE_COLOR', payload: color})
    }

    ///////////////////////////////////////////////////////////////////////////////
    //Change light/dark mode

    const changeMode = (mode) => {
            dispatch({ type: 'CHANGE_MODE', payload: mode})
    }
    
    //Custom logic


    return (
        <ThemeContext.Provider value={{...state, changeColor, changeMode}}>
            {children}
        </ThemeContext.Provider>
    )
}