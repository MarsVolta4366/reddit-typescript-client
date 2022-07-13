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
import PostsGallery from "./components/PostsGallery/PostsGallery"
import ShowPostPage from "./components/ShowPostPage/ShowPostPage"
import { MyScrollPositionContext } from "./context/ScrollPositionContext"
import { MyPostsContext, PostsState } from "./context/PostsContext"

function App() {

  const [currentUser, setCurrentUser] = useState<UserState>(null)
  const [theme, setTheme] = useState<string>(localStorage.getItem("theme") || "light")
  const [scrollPosition, setScrollPosition] = useState(0)
  const [posts, setPosts] = useState<PostsState>({ data: [], totalPosts: 0 })
  const [offset, setOffset] = useState(0)
  const [signUpDialogOpen, setSignUpDialogOpen] = useState(false)
  const [logInDialogOpen, setLogInDialogOpen] = useState(false)
  const [loadingProfile, setLoadingProfile] = useState(true)

  // Get user profile if session exists
  useEffect(() => {
    const fetchProfile = async () => {
      setLoadingProfile(true)

      // Fetch user information if currently logged in
      const userProfile = await (await fetch("http://localhost:4000/auth/profile", {
        credentials: "include"
      })).json()
      setCurrentUser(userProfile)

      setLoadingProfile(false)
    }
    fetchProfile()
  }, [])

  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
      <MyThemeContext.Provider value={{ theme, setTheme }}>
        <MyScrollPositionContext.Provider value={{ scrollPosition, setScrollPosition }}>
          <MyPostsContext.Provider value={{ posts, setPosts, offset, setOffset }}>
            <Router>
              <div className={`${theme}`}>
                <div className="appBackground container">
                  <SignUpDialog signUpDialogOpen={signUpDialogOpen} setSignUpDialogOpen={setSignUpDialogOpen} />
                  <LogInDialog logInDialogOpen={logInDialogOpen} setLogInDialogOpen={setLogInDialogOpen} />
                  {
                    loadingProfile ?
                      <LinearProgress /> :
                      <TopNav setSignUpDialogOpen={setSignUpDialogOpen} setLogInDialogOpen={setLogInDialogOpen} />
                  }
                  <Routes>
                    {/* Home page */}
                    <Route path="/" element={
                      <div className="centerContainer">
                        {currentUser && <CreatePostLinkBox />}
                        <PostsGallery />
                      </div>
                    } />
                    {/* Create a post page */}
                    <Route path="/submit" element={
                      <div style={{ paddingTop: "60px" }}>
                        <CreatePostPage />
                      </div>
                    } />
                    {/* Show post page */}
                    <Route path="/showPost/:postId" element={
                      <div style={{ paddingTop: "60px" }}>
                        <ShowPostPage />
                      </div>
                    } />
                  </Routes>
                </div>
              </div>
            </Router>
          </MyPostsContext.Provider>
        </MyScrollPositionContext.Provider>
      </MyThemeContext.Provider>
    </CurrentUserContext.Provider>
  )
}

export default App
