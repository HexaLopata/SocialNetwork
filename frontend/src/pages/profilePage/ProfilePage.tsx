import React, { FC, useEffect } from 'react'
import Block from '../../components/ui/block/Block'
import SimpleButton, {
    SimpleButtonVariant,
} from '../../components/ui/simpleButton/SimpleButton'
import classes from './ProfilePage.module.css'
import { connect } from 'react-redux'
import { fetchAccountPosts } from '../../redux/reducers/postReducer/asyncActions'
import { Link, useNavigate } from 'react-router-dom'
import UploadPostForm from '../../components/appComponents/uploadPostForm/UploadPostForm'
import OwnPostList from '../../components/appComponents/ownPostList/OwnPostList'
import { RootState, TDispatch } from '../../redux/store'
import { Props } from '../../types/Props'
import { Account } from '../../types/Account'
import { Post } from '../../types/Post'
import { Img } from '../../components/ui/img/Img'

interface ProfilePageProps extends Props {
    account: Account | null
    fetchPosts: () => void
    posts: Post[]
}

const ProfilePage: FC<ProfilePageProps> = ({ account, fetchPosts, posts }) => {
    const navigate = useNavigate()

    const navigateToEditProfilePage = () => navigate('/editProfile')

    useEffect(() => {
        fetchPosts()
    }, [fetchPosts])

    return (
        <div className={classes.profileContainer}>
            <img
                src={account?.background_picture_source}
                className={classes.backgroundImage}
                alt=''
            />
            <div className={classes.profileInfoContainer}>
                <div>
                    <Img
                        width='200px'
                        height='200px'
                        borderRadius='25px'
                        src={account?.profile_picture_source}
                        alt='Изображение'
                    />
                </div>

                <Block className={classes.profileInfo}>
                    <h1>{account?.first_name + ' ' + account?.last_name}</h1>
                    <h4>Дата рождения: {account?.birthdate}</h4>
                    <Link to={'/friends'}>Друзей: Много</Link>
                    <SimpleButton
                        onClick={navigateToEditProfilePage}
                        variant={SimpleButtonVariant.dark}
                        style={{
                            padding: '10px 15px',
                            position: 'absolute',
                            bottom: '20px',
                            right: '20px',
                        }}
                    >
                        Редактировать
                    </SimpleButton>
                </Block>
            </div>
            <div className={classes.uploadPostContainer}>
                <UploadPostForm />
            </div>
            <OwnPostList posts={posts} />
        </div>
    )
}

const mapStateToProps = (state: RootState) => ({
    account: state.account.account,
    posts: state.post.accountPosts,
})

const mapDispatchToProps = (dispatch: TDispatch) => {
    return {
        fetchPosts: () => {
            dispatch(fetchAccountPosts())
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage)
