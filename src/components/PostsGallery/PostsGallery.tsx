import { CircularProgress } from "@mui/material"
import PostsGalleryItem from "../PostsGalleryItem/PostsGalleryItem"

export type PostType = {
    content: string,
    title: string,
    user: {
        username: string
    }
}

type Props = {
    posts: PostType[],
    loading: boolean
}

const PostsGallery = ({ posts, loading }: Props) => {

    const postsDisplay = posts.map((postData: PostType, index) => {
        return (
            <PostsGalleryItem key={`PostsGallery${index}`} postData={postData} />
        )
    })

    return (
        <div>
            {
                loading ?
                    <CircularProgress />
                    :
                    postsDisplay
            }
        </div>
    )
}

export default PostsGallery