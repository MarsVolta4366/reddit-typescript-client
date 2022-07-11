import { useEffect } from "react"
import InfiniteScroll from "react-infinite-scroll-component"
import { usePostsContext } from "../../context/PostsContext"
import { useScrollPositionContext } from "../../context/ScrollPositionContext"
import PostsGalleryItem, { PostType } from "../PostsGalleryItem/PostsGalleryItem"
import styles from "./PostsGallery.module.scss"

const PostsGallery = () => {

    const { scrollPosition } = useScrollPositionContext()
    const { posts, setPosts, offset, setOffset } = usePostsContext()

    useEffect(() => {
        const fetchPosts = async () => {

            // Fetch posts for PostsGallery
            const fetchedPosts = await (
                await fetch(`http://localhost:4000/posts/${offset}`)
            ).json()
            if (offset === 0) {
                setPosts(fetchedPosts)
            } else {
                setPosts(prev => {
                    return { data: [...prev.data, ...fetchedPosts.data], totalPosts: fetchedPosts.totalPosts }
                })
            }

            console.log(fetchedPosts)
            // window.scrollTo(0, scrollPosition)
        }
        fetchPosts()
    }, [scrollPosition, setPosts, offset])

    const postsDisplay = posts.data.map((postData: PostType, index) => {
        return (
            <PostsGalleryItem key={`PostsGallery${index}`} postData={postData} />
        )
    })

    return (
        <InfiniteScroll
            dataLength={posts.data.length}
            next={() => setOffset(prev => prev += 10)}
            hasMore={posts.totalPosts - offset > 0 && posts.totalPosts > 10}
            loader={<h4>Loading...</h4>}
        >
            <div className={styles.postsGallery}>
                {postsDisplay}
            </div>
        </InfiniteScroll>
    )
}

export default PostsGallery