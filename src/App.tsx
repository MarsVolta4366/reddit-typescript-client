import { LinearProgress } from "@mui/material"
import { useEffect, useState } from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import CreatePostLinkBox from "./components/CreatePostLinkBox/CreatePostLinkBox"
import CreatePostPage from "./components/CreatePostPage/CreatePostPage"
import LogInDialog from "./components/LogInDialog/LogInDialog"
import SignUpDialog from "./components/SignUpDialog/SignUpDialog"
import TopNav from "./components/TopNav/TopNav"
import { CurrentUserContext } from "./context/CurrentUserContext"
import { MyThemeContext } from "./context/ThemeContext"
import "./scss/_main.scss"
import { UserState } from "./context/CurrentUserContext"
import PostsGallery, { PostType } from "./components/PostsGallery/PostsGallery"

function App() {

  const [theme, setTheme] = useState<string>(localStorage.getItem("theme") || "light")
  const [currentUser, setCurrentUser] = useState<UserState>(null)
  const [posts, setPosts] = useState<PostType[]>([])
  const [signUpDialogOpen, setSignUpDialogOpen] = useState(false)
  const [logInDialogOpen, setLogInDialogOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  // Get user profile if session exists
  useEffect(() => {
    const getData = async () => {
      setLoading(true)

      // Fetch user information if currently logged in
      const userProfile = await (await fetch("http://localhost:4000/auth/profile", {
        credentials: "include"
      })).json()
      setCurrentUser(userProfile)
      // Fetch posts for PostsGallery
      const fetchedPosts = await (
        await fetch("http://localhost:4000/posts")
      ).json()
      setPosts(fetchedPosts)
      console.log(fetchedPosts)

      setLoading(false)
    }
    getData()
  }, [])

  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
      <MyThemeContext.Provider value={{ theme, setTheme }}>
        <Router>
          <div className={`${theme}`}>
            <div className="appBackground container">
              <SignUpDialog signUpDialogOpen={signUpDialogOpen} setSignUpDialogOpen={setSignUpDialogOpen} />
              <LogInDialog logInDialogOpen={logInDialogOpen} setLogInDialogOpen={setLogInDialogOpen} />
              {
                loading ?
                  <LinearProgress /> :
                  <TopNav setSignUpDialogOpen={setSignUpDialogOpen} setLogInDialogOpen={setLogInDialogOpen} />
              }
              <Routes>
                {/* Home page */}
                <Route path="/" element={
                  <div style={{ paddingTop: "60px" }}>
                    {currentUser && <CreatePostLinkBox />}
                    <PostsGallery posts={posts} loading={loading} />
                  </div>
                } />
                {/* Create a post page */}
                <Route path="/submit" element={
                  <div style={{ paddingTop: "60px" }}>
                    <CreatePostPage />
                  </div>
                } />
              </Routes>
            </div>
          </div>
        </Router>
      </MyThemeContext.Provider>
    </CurrentUserContext.Provider>
  )
}

export default App
