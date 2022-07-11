import { useState } from "react"
import { useNavigate } from "react-router-dom"

const CreatePostPage = () => {

    const [post, setPost] = useState({ title: "", content: "" })
    const navigate = useNavigate()

    const handleSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault()

        const createdPost = await (
            await fetch("http://localhost:4000/posts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify(post)
            })
        ).json()

        navigate(`/showPost/${createdPost._id}`)
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Title" value={post.title} onChange={(e) => setPost({ ...post, title: e.target.value })} maxLength={300} required />
                <input type="text" placeholder="Text (optional)" value={post.content} onChange={(e) => setPost({ ...post, content: e.target.value })} maxLength={40_000} />
                <button type="submit">Post</button>
            </form>
        </div>
    )
}

export default CreatePostPage