import React, { useEffect } from 'react'
import Block from '../../components/ui/block/Block'
import SimpleButton from '../../components/ui/simpleButton/SimpleButton'
import classes from './ProfilePage.module.css'
import { connect } from 'react-redux'
import { fetchAccountPosts } from '../../redux/reducers/postReducer/actions'
import { useNavigate } from 'react-router-dom'
import UploadPostForm from '../../components/appComponents/uploadPostForm/UploadPostForm'
import OwnPostList from '../../components/appComponents/ownPostList/OwnPostList'

function ProfilePage({ account, fetchPosts, posts }) {
    const navigate = useNavigate()

    const navigateToEditProfilePage = () => navigate('/editProfile')

    useEffect(() => {
        fetchPosts()
    }, [fetchPosts])

    return (
        <div className={classes.profileContainer}>
            <img
                src={account.background_picture_source}
                className={classes.backgroundImage}
                alt=''
            />
            <div className={classes.profileInfoContainer}>
                <div>
                    <img
                        src={account.profile_picture_source}
                        alt='Изображение'
                        className={classes.profilePicture}
                    />
                </div>

                <Block className={classes.profileInfo}>
                    <h1>{account.first_name + ' ' + account.last_name}</h1>
                    <h4>Дата рождения: {account.birthdate}</h4>
                    <h4>Друзей: Много</h4>
                    <SimpleButton
                        onClick={navigateToEditProfilePage}
                        variant='dark'
                        style={{
                            padding: '10px 15px',
                            position: 'absolute',
                            bottom: '20px',
                            right: '20px',
                        }}
                        children='Редактировать'
                    />
                </Block>
            </div>
            <div className={classes.uploadPostContainer}>
                <UploadPostForm />
            </div>
            <OwnPostList posts={posts} />
        </div>
    )
}

const mapStateToProps = (state) => ({
    account: state.account.account,
    posts: state.post.accountPosts,
})

const mapDispatchToProps = (dispatch) => {
    return {
        fetchPosts: () => dispatch(fetchAccountPosts()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage)
