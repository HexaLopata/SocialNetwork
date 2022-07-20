import React, { FC, useEffect } from 'react'
import { connect } from 'react-redux'
import PostList from '../../components/appComponents/postList/PostList'
import { fetchFriendsPosts } from '../../redux/reducers/postReducer/asyncActions'
import { RootState, TDispatch } from '../../redux/store'
import { Post } from '../../types/Post'
import { Props } from '../../types/Props'
import classes from './PostPage.module.css'

interface PostPageProps extends Props {
    posts: Post[]
    fetchPosts: () => void
}

const PostPage: FC<PostPageProps> = ({ posts, fetchPosts }) => {

    useEffect(() => {
        fetchPosts()
    }, [])

    return (
        <div className={classes.postPageContainer}>
            <PostList posts={posts} />
        </div>
    )
}

const mapStateToProps = (state: RootState) => ({ posts: state.post.friendsPosts })

const mapDispatchToProps = (dispatch: TDispatch) => {
    return {
        fetchPosts: () => { dispatch(fetchFriendsPosts()) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostPage)