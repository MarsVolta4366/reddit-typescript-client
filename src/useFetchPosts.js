import axios from "axios"
import { useEffect, useState } from "react"

const useFetchPosts = (pageNumber) => {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [posts, setPosts] = useState([])
    const [hasMore, setHasMore] = useState(false)

    // Do something like this with endPoint being passed in as an arguement to reset posts when endPoint changes
    // useEffect(() => {
    //     setPosts([])
    // }, [endPoint])

    useEffect(() => {
        setLoading(true)
        setError(false)

        const fetchData = async () => {
            try {
                const response = await axios({
                    method: "GET",
                    url: `http://localhost:4000/posts/`,
                    params: { page: pageNumber }
                })
                setPosts(prevPosts => {
                    const existingPostIds = prevPosts.map(post => post._id)

                    const newPosts = [...response.data.posts.filter(post => !existingPostIds.includes(post._id))]
                    return [...prevPosts, ...newPosts]
                })

                setHasMore(response.data.posts.length > 0)
                setLoading(false)
            } catch (e) {
                setError(true)
            }
        }
        fetchData()
    }, [pageNumber])

    return { loading, error, posts, setPosts, hasMore }
}

export default useFetchPosts