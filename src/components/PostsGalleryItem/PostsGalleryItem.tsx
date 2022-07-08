import { Link } from "react-router-dom"
import styles from "./PostsGalleryItem.module.scss"

export type PostType = {
    _id: string,
    content: string,
    title: string,
    user: {
        username: string
    }
}

type Props = {
    postData: PostType
}

const PostsGalleryItem = ({ postData }: Props) => {
    return (
        // Wrap in link with post id in url
        <div className={styles.postsGalleryItem}>
            <Link to={`/showPost/${postData._id}`}>
                <p>{postData.user.username}</p>
                <h1>{postData.title}</h1>
                <p>{postData.content}</p>
            </Link>
        </div>
    )
}

export default PostsGalleryItem