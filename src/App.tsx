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

  // Get user profile if session exists
  useEffect(() => {
    const getCurrentUser = async () => {
      const userProfile = await (await fetch("http://localhost:4000/auth/profile", {
        credentials: "include"
      })).json()
      setCurrentUser(userProfile)
    }
    getCurrentUser()
  }, [])

  const logOut = async () => {
    const logOutFetch = await fetch("http://localhost:4000/auth/logout", {
      credentials: "include"
    })
    await logOutFetch.json()
    setCurrentUser(null)
  }

  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
      <MyThemeContext.Provider value={{ theme, setTheme }}>
        <div className={`${theme}`}>
          <div className="appBackground container">
            <SignUpDialog signUpDialogOpen={signUpDialogOpen} setSignUpDialogOpen={setSignUpDialogOpen} />
            <LogInDialog logInDialogOpen={logInDialogOpen} setLogInDialogOpen={setLogInDialogOpen} />
            <TopNav setSignUpDialogOpen={setSignUpDialogOpen} setLogInDialogOpen={setLogInDialogOpen} />
            <button style={{ marginTop: "100px" }} onClick={logOut}>Log out</button>
            <h1 style={{ marginTop: "100px" }}>{currentUser ? currentUser.username : ""}</h1>
          </div>
        </div>
      </MyThemeContext.Provider>
    </CurrentUserContext.Provider>
  )
}

export default App
