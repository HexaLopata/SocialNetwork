import React, { useState } from 'react'
import { connect } from 'react-redux'
import PostList from '../../components/appComponents/postList/PostList'
import { fetchFriendsPosts } from '../../redux/reducers/postReducer/actions'
import classes from './PostPage.module.css'

function PostPage({ posts, fetchPosts }) {

    useState(() => {
        fetchPosts()
    }, [])

    return (
        <div className={classes.postPageContainer}>
            <PostList posts={posts} />
        </div>
    )
}

const mapStateToProps = (state) => ({ posts: state.post.friendsPosts })

const mapDispatchToProps = (dispatch) => {
    return {
        fetchPosts: () => dispatch(fetchFriendsPosts())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostPage)