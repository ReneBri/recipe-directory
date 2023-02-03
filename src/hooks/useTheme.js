// hooks
import { useContext } from 'react'

// context API
import { ThemeContext } from '../context/ThemeContext'

export const useTheme = () => {
    
    const context = useContext(ThemeContext)

    //use this if only wrapping a certain part of the application
    if(context === undefined){
        throw new Error("useTheme() must be used inside a ThemeProvider")
    }

    return context
}