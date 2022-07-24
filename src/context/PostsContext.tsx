import React, { createContext, useContext } from "react"
import { PostType } from "../components/PostsGalleryItem/PostsGalleryItem"

export type PostsState = {
    data: PostType[],
    totalPosts: number
}

type PostsContextInitialState = {
    posts: PostsState,
    setPosts: React.Dispatch<React.SetStateAction<PostsState>>,
    offset: number,
    setOffset: React.Dispatch<React.SetStateAction<number>>
}

export const MyPostsContext = createContext<PostsContextInitialState>({
    posts: { data: [], totalPosts: 0 },
    setPosts: () => { },
    offset: 0,
    setOffset: () => { }
})

export const usePostsContext = () => useContext(MyPostsContext)