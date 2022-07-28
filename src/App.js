import { LinearProgress } from "@mui/material"
import { useCallback, useEffect, useRef, useState } from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import CreatePostLinkBox from "./components/CreatePostLinkBox/CreatePostLinkBox"
import LogInDialog from "./components/LogInDialog/LogInDialog"
import SignUpDialog from "./components/SignUpDialog/SignUpDialog"
import TopNav from "./components/TopNav/TopNav"
import { CurrentUserContext } from "./context/CurrentUserContext"
import { MyThemeContext } from "./context/ThemeContext"
import "./scss/_main.scss"
import { MyScrollPositionContext } from "./context/ScrollPositionContext"
import useFetchPosts from "./useFetchPosts"
import { PostsContext } from "./context/PostsContext"
import PostsGallery from "./components/PostsGallery/PostsGallery"
import ShowPostPage from "./components/ShowPostPage/ShowPostPage"

function App() {

  const [currentUser, setCurrentUser] = useState(null)
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light")
  const [scrollPosition, setScrollPosition] = useState(0)
  const [signUpDialogOpen, setSignUpDialogOpen] = useState(false)
  const [logInDialogOpen, setLogInDialogOpen] = useState(false)
  const [loadingProfile, setLoadingProfile] = useState(true)
  const [pageNumber, setPageNumber] = useState(1)

  const { loading, error, posts, setPosts, hasMore } = useFetchPosts(pageNumber)
  console.log(posts)

  const observer = useRef()
  const lastBookElementRef = useCallback(node => {
    if (loading) {
      return
    }
    if (observer.current) {
      observer.current.disconnect()
    }
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPageNumber(prevPageNumber => prevPageNumber + 1)
      }
    })
    if (node) {
      observer.current.observe(node)
    }
  }, [loading, hasMore])

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
          <PostsContext.Provider
            value={{ posts, setPosts, lastBookElementRef }}
          >
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
                        {loading && <p>Loading...</p>}
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
          </PostsContext.Provider>
        </MyScrollPositionContext.Provider>
      </MyThemeContext.Provider>
    </CurrentUserContext.Provider>
  )
}

export default App
