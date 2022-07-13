import React, { useMemo } from 'react'
import Post from '../post/Post'

const PostList = React.memo(({ posts }) => {
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
