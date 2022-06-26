import { useState } from "react"
import TopNav from "./components/TopNav/TopNav"
import { MyThemeContext } from "./context/ThemeContext"
import "./scss/_main.scss"

function App() {

  const [theme, setTheme] = useState<string>(localStorage.getItem("theme") || "light")

  return (
    <MyThemeContext.Provider value={{ theme, setTheme }}>
      <div className={`${theme}`}>
        <div className="appBackground container">
          <TopNav />
        </div>
      </div>
    </MyThemeContext.Provider>
  )
}

export default App
