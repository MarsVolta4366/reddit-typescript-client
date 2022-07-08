import styles from "./PostsGalleryItem.module.scss"

export type PostType = {
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
        <div className={styles.postsGalleryItem}>
            <p>{postData.user.username}</p>
            <h1>{postData.title}</h1>
            <p>{postData.content}</p>
        </div>
    )
}

export default PostsGalleryItem