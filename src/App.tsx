import { useState } from "react"
import SignUpDialog from "./components/SignUpDialog/SignUpDialog"
import TopNav from "./components/TopNav/TopNav"
import { MyThemeContext } from "./context/ThemeContext"
import "./scss/_main.scss"

function App() {

  const [theme, setTheme] = useState<string>(localStorage.getItem("theme") || "light")
  const [signUpDialogOpen, setSignUpDialogOpen] = useState(false)

  return (
    <MyThemeContext.Provider value={{ theme, setTheme }}>
      <div className={`${theme}`}>
        <div className="appBackground container">
          <SignUpDialog signUpDialogOpen={signUpDialogOpen} setSignUpDialogOpen={setSignUpDialogOpen} />
          <TopNav setSignUpDialogOpen={setSignUpDialogOpen} />
        </div>
      </div>
    </MyThemeContext.Provider>
  )
}

export default App
