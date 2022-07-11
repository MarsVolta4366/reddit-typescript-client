import { CircularProgress } from "@mui/material"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { usePostsContext } from "../../context/PostsContext"
import { PostType } from "../PostsGalleryItem/PostsGalleryItem"

const ShowPostPage = () => {

    const { postId } = useParams()
    const [postData, setPostData] = useState<PostType>()
    const [loadingPost, setLoadingPost] = useState(true)
    const { setPosts } = usePostsContext()
    const navigate = useNavigate()

    useEffect(() => {
        const fetchPost = async () => {
            setLoadingPost(true)
            const fetchedPost = await (
                await fetch(`http://localhost:4000/posts/showPost/${postId}`)
            ).json()
            setPostData(fetchedPost)
            setLoadingPost(false)
        }
        fetchPost()
    }, [postId])

    const deletePost = async () => {
        await (
            await fetch(`http://localhost:4000/posts/${postId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include"
            })
        ).json()

        setPosts(prev => {
            const newData = prev.data.filter(prevPost => prevPost._id !== postId)
            return { data: [...newData], totalPosts: prev.totalPosts }
        })
        navigate(-1)
    }

    const postDisplay = (
        <>
            <p>{postData?.user.username}</p>
            <h1>{postData?.title}</h1>
            <p>{postData?.content}</p>
            <button onClick={deletePost}>Delete</button>
            <button onClick={() => navigate(-1)}>Back</button>
        </>
    )

    return (
        <div>
            {loadingPost ? <CircularProgress /> : postDisplay}
        </div>
    )
}

export default ShowPostPage