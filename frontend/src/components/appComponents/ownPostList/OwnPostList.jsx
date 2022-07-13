import React, { useMemo } from 'react'
import { connect } from 'react-redux'
import PostList from '../postList/PostList'

function OwnPostList({ posts, account }) {
    const ownPosts = useMemo(
        () =>
            posts.map((p) => {
                p.author_first_name = account.first_name
                p.author_last_name = account.last_name
                return p
            }),
        [posts, account]
    )

    return <PostList posts={ownPosts} />
}

const mapStateToProps = (state) => ({
    account: state.account.account,
})

export default connect(mapStateToProps)(OwnPostList)
