import React, { FC, useEffect, useMemo } from 'react'
import { connect } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import ManageFriendButton from '../../components/appComponents/manageFriendButton/ManageFriendButton'
import PostList from '../../components/appComponents/postList/PostList'
import { ProfileInfo } from '../../components/appComponents/profileInfo/ProfileInfo'
import SimpleButton, {
    SimpleButtonVariant,
} from '../../components/ui/simpleButton/SimpleButton'
import { setObservedAccount } from '../../redux/reducers/accountReducer'
import { fetchAccountById } from '../../redux/reducers/accountReducer/asyncActions'
import { fetchAccountPostsById } from '../../redux/reducers/postReducer/asyncActions'
import { RootState, TDispatch } from '../../redux/store'
import { Account } from '../../types/Account'
import { Post } from '../../types/Post'
import { Props } from '../../types/Props'
import classes from './OtherProfilePage.module.css'

interface OtherProfilePageProps extends Props {
    account: Account | null
    observedAccount: Account | null
    posts: Post[]
    fetchPosts: (accountId: number) => void
    fetchAccount: (id: number) => void
    setObservedAccount: (account: Account | null) => void
}

export const OtherProfilePage: FC<OtherProfilePageProps> = ({
    account,
    observedAccount,
    fetchPosts,
    fetchAccount,
    posts,
    setObservedAccount,
}) => {
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        return () => {
            setObservedAccount(null)
        }
    }, [])

    useEffect(() => {
        const id = params.id
        if (id) {
            fetchAccount(+id)
            fetchPosts(+id)
        }
    }, [fetchAccount, fetchPosts, params])

    useEffect(() => {
        if (observedAccount && account && observedAccount.id === account.id) {
            navigate('/profile')
        }
    }, [observedAccount])

    const name = useMemo(() => {
        return observedAccount?.first_name + ' ' + observedAccount?.last_name
    }, [observedAccount])

    return (
        <>
            {observedAccount ? (
                <div className={classes.profileContainer}>
                    <img
                        src={observedAccount?.background_picture_source}
                        className={classes.backgroundImage}
                        alt=''
                    />
                    <ProfileInfo
                        profilePictureSrc={
                            observedAccount?.profile_picture_source
                        }
                        name={name}
                        birthdate={observedAccount?.birthdate}
                    >
                        <ManageFriendButton observedAccount={observedAccount} />
                        <SimpleButton
                            onClick={() =>
                                navigate(`/chat/${observedAccount?.id}`)
                            }
                            variant={SimpleButtonVariant.dark}
                        >
                            Отправить сообщение
                        </SimpleButton>
                    </ProfileInfo>
                    <PostList posts={posts} />
                </div>
            ) : (
                <></>
            )}
        </>
    )
}

const mapStateToProps = (state: RootState) => ({
    observedAccount: state.account.observedAccount,
    account: state.account.account,
    posts: state.post.observedAccountPosts,
})

const mapDispatchToProps = (dispatch: TDispatch) => {
    return {
        fetchPosts: (id: number) => {
            dispatch(fetchAccountPostsById(id))
        },

        fetchAccount: (id: number) => {
            dispatch(fetchAccountById(id))
        },

        setObservedAccount: (account: Account | null) => {
            dispatch(setObservedAccount(account))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OtherProfilePage)
