import { useEffect, useState } from "react"
import SignUpDialog from "./components/SignUpDialog/SignUpDialog"
import TopNav from "./components/TopNav/TopNav"
import { CurrentUserContext } from "./context/CurrentUserContext"
import { MyThemeContext } from "./context/ThemeContext"
import "./scss/_main.scss"

function App() {

  const [theme, setTheme] = useState<string>(localStorage.getItem("theme") || "light")
  const [currentUser, setCurrentUser] = useState<{ username: string } | null>(null)
  const [signUpDialogOpen, setSignUpDialogOpen] = useState(false)

  useEffect(() => {
    const getLoggedInUser = async () => {
      const loggedInUser = await fetch("http://localhost:4000/auth/profile", {
        credentials: "include"
      })
      const loggedInUserResponse = await loggedInUser.json()
      setCurrentUser(loggedInUserResponse)
    }
    getLoggedInUser()
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
            <TopNav setSignUpDialogOpen={setSignUpDialogOpen} />
            <button style={{ marginTop: "100px" }} onClick={logOut}>Log out</button>
            <h1 style={{ marginTop: "100px" }}>{currentUser ? currentUser.username : ""}</h1>
          </div>
        </div>
      </MyThemeContext.Provider>
    </CurrentUserContext.Provider>
  )
}

export default App
