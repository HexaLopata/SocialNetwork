import React, { useEffect } from 'react'
import Block from '../components/block/Block'
import SimpleButton from '../components/simpleButton/SimpleButton'
import classes from './ProfilePage.module.css'
import { connect } from 'react-redux'
import PostList from '../components/postList/PostList'
import { fetchAccountPosts } from '../redux/reducers/postReducer/actions'

function ProfilePage({ account, fetchPosts, posts }) {

    useEffect(() => {
        fetchPosts()
    }, [])

    return (
        <div className={classes.profileContainer}>
            <div className={classes.profileInfoContainer}>
                <div>
                    <img
                        src={account.profile_picture_source}
                        alt='Изображение'
                        className={classes.profilePicture} />
                </div>

                <Block className={classes.profileInfo}>
                    <h1>{account.first_name + ' ' + account.last_name}</h1>
                    <h4>Дата рождения: {account.birthdate}</h4>
                    <h4>Друзей: Много</h4>
                    <SimpleButton
                        variant='dark'
                        style={{ padding: '10px 15px', position: 'absolute', bottom: '20px', right: '20px' }}
                        children='Редактировать'
                    />
                </Block>
            </div>
            <PostList posts={posts} />
        </div>
    )
}

const mapStateToProps = (state) => ({ account: state.account.account, posts: state.post.accountPosts })

const mapDispatchToProps = (dispatch) => {
    return {
        fetchPosts: () => dispatch(fetchAccountPosts())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage)
