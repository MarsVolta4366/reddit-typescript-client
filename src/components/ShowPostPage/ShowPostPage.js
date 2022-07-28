import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

const ShowPostPage = () => {

    const [postData, setPostData] = useState()
    const [loadingPost, setLoadingPost] = useState(true)
    const { postId } = useParams()
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

    return (
        <>
            {
                loadingPost ? <p>Loading...</p>
                    :
                    <>
                        <p>{postData?.user.username}</p>
                        <h1>{postData?.title}</h1>
                        <p>{postData?.content}</p>
                        <button onClick={() => navigate(-1)}>Back</button>
                    </>
            }
        </>
    )
}

export default ShowPostPage