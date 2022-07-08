import PostsGalleryItem, { PostType } from "../PostsGalleryItem/PostsGalleryItem"
import styles from "./PostsGallery.module.scss"

type Props = {
    posts: PostType[]
}

const PostsGallery = ({ posts }: Props) => {

    const postsDisplay = posts.map((postData: PostType, index) => {
        return (
            <PostsGalleryItem key={`PostsGallery${index}`} postData={postData} />
        )
    })

    return (
        <div className={styles.postsGallery}>
            {postsDisplay}
        </div>
    )
}

export default PostsGallery