import { useContext } from "react"
import { PostsContext } from "../../context/PostsContext"
import PostsGalleryItem from "../PostsGalleryItem/PostsGalleryItem"

const PostsGallery = () => {
    const { posts, lastBookElementRef } = useContext(PostsContext)

    const postsDisplay = posts.map((post, index) => {
        if (posts.length === index + 1) {
            return (
                <PostsGalleryItem key={post._id} postData={post} lastBookElementRef={lastBookElementRef} />
            )
        } else {
            return (
                <PostsGalleryItem key={post._id} postData={post} />
            )
        }
    })

    return (
        <>
            {postsDisplay}
        </>
    )
}

export default PostsGallery