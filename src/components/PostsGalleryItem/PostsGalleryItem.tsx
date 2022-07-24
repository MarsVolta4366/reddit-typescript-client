import { Link, useNavigate } from "react-router-dom"
import { useScrollPositionContext } from "../../context/ScrollPositionContext"
import { useThemeContext } from "../../context/ThemeContext"
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

    const { setScrollPosition } = useScrollPositionContext()
    const { theme } = useThemeContext()
    const navigate = useNavigate()

    const handlePostClick = () => {
        // navigate(`/showPost/${postData._id}`)
        setScrollPosition(window.scrollY)
    }

    const handleUserClick = (e: { preventDefault: () => void }) => {
        e.preventDefault()

        navigate(`/user/${postData.user.username}`)
    }

    return (
        <Link to={`/showPost/${postData._id}`} className={`${theme} galleryCard ${styles.postContainer}`} onClick={handlePostClick}>
            <p className={styles.postUsernameText}>Posted by <span className={styles.postUsernameLink} onClick={handleUserClick}>u/{postData.user.username}</span></p>
            <h1 className={styles.postTitle}>{postData.title}</h1>
            <p className={styles.postContent}>{postData.content}</p>
        </Link>
    )
}

export default PostsGalleryItem