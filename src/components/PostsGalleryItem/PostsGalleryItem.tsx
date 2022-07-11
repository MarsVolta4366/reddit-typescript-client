import { Link } from "react-router-dom"
import { useScrollPositionContext } from "../../context/ScrollPositionContext"
import styles from "./PostsGalleryItem.module.scss"

export type PostType = {
    _id: string,
    // _v: number,
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

    const { setScrollPosition } = useScrollPositionContext()

    const handlePostClick = () => {
        setScrollPosition(window.scrollY)
    }

    return (
        <div className={styles.postsGalleryItem}>
            <Link to={`/showPost/${postData._id}`} onClick={handlePostClick}>
                <p>{postData.user.username}</p>
                <h1>{postData.title}</h1>
                <p>{postData.content}</p>
            </Link>
        </div>
    )
}

export default PostsGalleryItem