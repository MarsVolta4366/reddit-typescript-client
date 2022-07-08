import { PostType } from "../PostsGallery/PostsGallery"

type Props = {
    postData: PostType
}

const PostsGalleryItem = ({ postData }: Props) => {
    return (
        <div>
            <p>{postData.user.username}</p>
            <h1>{postData.title}</h1>
            <p>{postData.content}</p>
        </div>
    )
}

export default PostsGalleryItem