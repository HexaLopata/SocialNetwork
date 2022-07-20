import React, { FC, useMemo } from 'react'
import { connect } from 'react-redux'
import { RootState } from '../../../redux/store'
import { Account } from '../../../types/Account'
import { Post } from '../../../types/Post'
import { Props } from '../../../types/Props'
import PostList from '../postList/PostList'

interface OwnPostListProps extends Props {
    posts: Post[]
    account: Account | null
}

const OwnPostList: FC<OwnPostListProps> = ({ posts, account }) => {
    const ownPosts = useMemo(
        () =>
            posts.map((p) => {
                return {
                    ...p,
                    author_first_name: account?.first_name,
                    author_last_name: account?.last_name,
                }
            }),
        [posts, account]
    )

    return <PostList posts={ownPosts} />
}

const mapStateToProps = (state: RootState) => ({
    account: state.account.account,
})

export default connect(mapStateToProps)(OwnPostList)
