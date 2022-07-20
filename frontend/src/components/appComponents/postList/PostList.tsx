import React, { useMemo } from 'react'
import { Props } from '../../../types/Props'
import Post from '../post/Post'
import { Post as PostType } from '../../../types/Post'

interface PostListProps extends Props {
    posts: PostType[]
}

const PostList = React.memo<PostListProps>(
    function PostList({ posts }) {
    const reversedPosts = useMemo(() => [...posts].reverse(), [posts])

    return (
        <>
            {reversedPosts.map((post) => {
                return (
                    <Post
                        authorName={
                            post.author_first_name + ' ' + post.author_last_name
                        }
                        key={post.id}
                        imageSrc={post.image_source}
                        body={post.body}
                        date={post.date}
                    />
                )
            })}
        </>
    )
})

export default PostList
