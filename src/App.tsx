import { LinearProgress } from "@mui/material"
import { useEffect, useState } from "react"
import LogInDialog from "./components/LogInDialog/LogInDialog"
import SignUpDialog from "./components/SignUpDialog/SignUpDialog"
import TopNav from "./components/TopNav/TopNav"
import { CurrentUserContext } from "./context/CurrentUserContext"
import { MyThemeContext } from "./context/ThemeContext"
import "./scss/_main.scss"

function App() {

  const [theme, setTheme] = useState<string>(localStorage.getItem("theme") || "light")
  const [currentUser, setCurrentUser] = useState<{ username: string } | null>(null)
  const [signUpDialogOpen, setSignUpDialogOpen] = useState(false)
  const [logInDialogOpen, setLogInDialogOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  // Get user profile if session exists
  useEffect(() => {
    const getCurrentUser = async () => {
      setLoading(true)
      const userProfile = await (await fetch("http://localhost:4000/auth/profile", {
        credentials: "include"
      })).json()
      setCurrentUser(userProfile)
      setLoading(false)
    }
    getCurrentUser()
  }, [])

  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
      <MyThemeContext.Provider value={{ theme, setTheme }}>
        <div className={`${theme}`}>
          <div className="appBackground container">
            <SignUpDialog signUpDialogOpen={signUpDialogOpen} setSignUpDialogOpen={setSignUpDialogOpen} />
            <LogInDialog logInDialogOpen={logInDialogOpen} setLogInDialogOpen={setLogInDialogOpen} />
            {
              loading ?
                <LinearProgress /> :
                <TopNav setSignUpDialogOpen={setSignUpDialogOpen} setLogInDialogOpen={setLogInDialogOpen} />
            }
          </div>
        </div>
      </MyThemeContext.Provider>
    </CurrentUserContext.Provider>
  )
}

export default App
