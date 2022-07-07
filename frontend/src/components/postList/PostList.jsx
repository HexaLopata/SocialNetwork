import React from 'react'
import Post from '../post/Post'

export default function PostList({ posts }) {
  return (
    <>
        {posts.map((post) => {
            return (
                <Post 
                    authorName={post.author_first_name + ' ' + post.author_last_name}
                    key={post.id}
                    imageSrc={post.image_source}
                    body={post.body}
                    date={post.date}
                />
            )
        })}
    </>
  )
}
