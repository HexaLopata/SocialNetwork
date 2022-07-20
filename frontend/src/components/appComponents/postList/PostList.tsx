import React, { useMemo } from 'react'
import { Props } from '../../../types/Props'
import Post from '../post/Post'
import { Post as PostType } from '../../../types/Post'

interface PostListProps extends Props {
    posts: PostType[]
}

const PostList = React.memo<PostListProps>(function PostList({ posts }) {
    const reversedPosts = useMemo(() => [...posts].reverse(), [posts])

    return (
        <>
            {reversedPosts.map((post) => {
                return <Post post={post} key={post.id} />
            })}
        </>
    )
})

export default PostList
