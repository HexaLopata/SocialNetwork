import React from 'react'
import { Props } from '../../../types/Props'
import Post from '../post/Post'
import { Post as PostType } from '../../../types/Post'
import classes from './PostList.module.css'
import Block from '../../ui/block/Block'

interface PostListProps extends Props {
    posts: PostType[]
}

const PostList = React.memo<PostListProps>(function PostList({ posts }) {
    return (
        <div className={classes.postList}>
            {posts.length > 0 ? (
                <>
                    {posts.map((post) => {
                        return <Post post={post} key={post.id} />
                    })}
                </>
            ) : (
                <Block width='600px' height='70px'>
                    <div className={classes.noPostHeaderContainer}>
                        <h2>Постов пока нет 🙃</h2>
                    </div>
                </Block>
            )}
        </div>
    )
})

export default PostList
