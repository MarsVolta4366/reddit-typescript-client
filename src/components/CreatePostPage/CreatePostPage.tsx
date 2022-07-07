import { useState } from "react"

const CreatePostPage = () => {

    const [post, setPost] = useState({ title: "", content: "" })

    const handleSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault()

        const submitPost = await (
            await fetch("http://localhost:4000/posts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify(post)
            })
        ).json()
        console.log(submitPost)
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Title" value={post.title} onChange={(e) => setPost({ ...post, title: e.target.value })} />
                <input type="text" placeholder="Text (optional)" value={post.content} onChange={(e) => setPost({ ...post, content: e.target.value })} />
                <button type="submit">Post</button>
            </form>
        </div>
    )
}

export default CreatePostPage