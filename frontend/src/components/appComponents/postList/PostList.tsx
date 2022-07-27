import React from 'react'
import { Props } from '../../../types/Props'
import Post from '../post/Post'
import { Post as PostType } from '../../../types/Post'

interface PostListProps extends Props {
    posts: PostType[]
}

const PostList = React.memo<PostListProps>(function PostList({ posts }) {
    return (
        <>
            {posts.map((post) => {
                return <Post post={post} key={post.id} />
            })}
        </>
    )
})

export default PostList
