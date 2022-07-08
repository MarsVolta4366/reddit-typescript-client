import { CircularProgress } from "@mui/material"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { PostType } from "../PostsGalleryItem/PostsGalleryItem"

const ShowPostPage = () => {

    const { postId } = useParams()
    const [postData, setPostData] = useState<PostType>()
    const [loadingPost, setLoadingPost] = useState(true)

    useEffect(() => {
        const fetchPost = async () => {
            setLoadingPost(true)
            const fetchedPost = await (
                await fetch(`http://localhost:4000/posts/${postId}`)
            ).json()
            setPostData(fetchedPost)
            setLoadingPost(false)
        }
        fetchPost()
    }, [postId])

    const postDisplay = (
        <>
            <p>{postData?.user.username}</p>
            <h1>{postData?.title}</h1>
            <p>{postData?.content}</p>
        </>
    )

    return (
        <div>
            {loadingPost ? <CircularProgress /> : postDisplay}
        </div>
    )
}

export default ShowPostPage