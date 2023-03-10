// hooks 
import { useTheme } from '../hooks/useTheme'

// styles and icons
import modeIcon from '../assets/mode-icon.svg'
import './ThemeSelector.css'

// sets colors to pick the navbar from
const themeColors = ['#58249c', '#249c6b', '#b70233']


export default function ThemeSelector() {

    const { changeColor, mode, changeMode } = useTheme()

    const toggleMode = () => {
        changeMode(mode === 'dark' ? 'light' : 'dark')
        console.log(mode)
    }

  return (
    <div className="theme-selector">
        <div className="mode-toggle">
            <img
                src={modeIcon}
                onClick={toggleMode}
                style={{ filter: mode === 'dark' ? 'invert(100%)' : 'invert(20%)' }}
                alt="dark/light toggle icon" />
            </div>
        <div className="theme-buttons">
            {themeColors.map(color => (
                <div 
                    key={color}
                    onClick={() => changeColor(color)}
                    style={{ background: color }}    
                />
            ))}
        </div>
    </div>
  )
}
