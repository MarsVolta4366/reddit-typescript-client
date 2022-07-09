import { useEffect, useState } from "react"
import { useScrollPositionContext } from "../../context/ScrollPositionContext"
import PostsGalleryItem, { PostType } from "../PostsGalleryItem/PostsGalleryItem"
import styles from "./PostsGallery.module.scss"

const PostsGallery = () => {

    const [posts, setPosts] = useState<PostType[]>([])
    const [loadingPosts, setLoadingPosts] = useState(true)
    const { scrollPosition } = useScrollPositionContext()

    useEffect(() => {
        const fetchPosts = async () => {
            setLoadingPosts(true)

            // Fetch posts for PostsGallery
            const fetchedPosts = await (
                await fetch("http://localhost:4000/posts")
            ).json()
            setPosts(fetchedPosts)

            window.scrollTo(0, scrollPosition)

            setLoadingPosts(false)
        }
        fetchPosts()
    }, [scrollPosition])

    const postsDisplay = posts.map((postData: PostType, index) => {
        return (
            <PostsGalleryItem key={`PostsGallery${index}`} postData={postData} />
        )
    })

    return (
        <div className={styles.postsGallery}>
            {loadingPosts ? <h1>Loading posts...</h1> : postsDisplay}
        </div>
    )
}

export default PostsGallery