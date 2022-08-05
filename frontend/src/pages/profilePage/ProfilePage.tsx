import React, { FC, useEffect, useMemo } from 'react'
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
import { ProfileInfo } from '../../components/appComponents/profileInfo/ProfileInfo'
import { BackgroundImage } from '../../components/appComponents/backgroundImage/BackgroundImage'

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

    const name = useMemo(() => {
        return account?.first_name + ' ' + account?.last_name
    }, [account])

    return (
        <div className={classes.profileContainer}>
            <BackgroundImage src={account?.background_picture_source}/>
            <ProfileInfo
                profilePictureSrc={account?.profile_picture_source}
                name={name}
                birthdate={account?.birthdate}
                infoComponents={<Link to={'/friends'}>Друзья</Link>}
            >
                <SimpleButton
                    onClick={navigateToEditProfilePage}
                    variant={SimpleButtonVariant.dark}
                >
                    Редактировать
                </SimpleButton>
            </ProfileInfo>
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
