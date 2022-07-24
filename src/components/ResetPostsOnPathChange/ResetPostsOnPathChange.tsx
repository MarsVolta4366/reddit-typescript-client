import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import { usePostsContext } from "../../context/PostsContext"

const ResetPostsOnPathChange = () => {

    const location = useLocation()
    const { setPosts, setOffset } = usePostsContext()

    useEffect(() => {
        setPosts({ data: [], totalPosts: 0 })
        setOffset(0)

    }, [location, setOffset, setPosts])

    return <></>
}

export default ResetPostsOnPathChange