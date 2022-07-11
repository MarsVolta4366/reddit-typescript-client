import { CircularProgress } from "@mui/material"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useCurrentUserContext } from "../../context/CurrentUserContext"
import { usePostsContext } from "../../context/PostsContext"
import { PostType } from "../PostsGalleryItem/PostsGalleryItem"

const ShowPostPage = () => {

    const { postId } = useParams()
    const [postData, setPostData] = useState<PostType>({ _id: "", title: "", content: "", user: { username: "" } })
    const [loadingPost, setLoadingPost] = useState(true)
    const { posts, setPosts } = usePostsContext()
    const { currentUser } = useCurrentUserContext()
    const [toggleEdit, setToggleEdit] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchPost = async () => {
            setLoadingPost(true)
            const fetchedPost = await (
                await fetch(`http://localhost:4000/posts/showPost/${postId}`)
            ).json()
            setPostData(fetchedPost)
            setLoadingPost(false)
            console.log(fetchedPost)
        }
        fetchPost()
    }, [postId])

    const deletePost = async () => {
        const deletePostResponse = await (
            await fetch(`http://localhost:4000/posts/${postId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include"
            })
        ).json()

        if (deletePostResponse.message === "Post successfully deleted") {
            setPosts(prev => {
                const newData = prev.data.filter(prevPost => prevPost._id !== postId)
                return { data: [...newData], totalPosts: prev.totalPosts }
            })
        }

        navigate(-1)
    }

    const handleEditSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault()

        const editPostResponse = await (
            await fetch(`http://localhost:4000/posts/${postId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({ content: postData.content })
            })
        ).json()

        // Update post in posts context if successfully updated in database
        if (editPostResponse.message === "Post successfully edited") {
            setPosts(prev => {
                const newData = prev.data.map(post => {
                    if (post._id === postId) {
                        return postData
                    } else {
                        return post
                    }
                })

                return { data: newData, totalPosts: posts.totalPosts }
            })
            setToggleEdit(false)
        }

        console.log(editPostResponse)
    }

    const editPostForm = (
        <form onSubmit={handleEditSubmit}>
            <input type="text" value={postData?.content} onChange={(e) => setPostData({ ...postData, content: e.target.value })} />
            <button type="submit">Save</button>
        </form>
    )

    const postDisplay = (
        <>
            <p>{postData?.user.username}</p>
            <h1>{postData?.title}</h1>
            {
                toggleEdit ?
                    editPostForm
                    :
                    <p>{postData?.content}</p>
            }

            {currentUser?.username === postData?.user.username && <button onClick={() => setToggleEdit(prev => !prev)}>Edit</button>}
            {currentUser?.username === postData?.user.username && <button onClick={deletePost}>Delete</button>}
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