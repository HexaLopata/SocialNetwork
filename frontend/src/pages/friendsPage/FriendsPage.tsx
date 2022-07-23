import React, { FC, useEffect, useMemo } from 'react'
import { connect } from 'react-redux'
import { FriendList } from '../../components/appComponents/friendList/FriendList'
import { RequestList } from '../../components/appComponents/requestList/RequestList'
import Block from '../../components/ui/block/Block'
import {
    fetchFriendRequests,
    fetchFriends,
} from '../../redux/reducers/accountReducer/asyncActions'
import { RootState, TDispatch } from '../../redux/store'
import { Account } from '../../types/Account'
import { FriendRequest } from '../../types/FriendRequest'
import { Props } from '../../types/Props'
import classes from './FriendsPage.module.css'

interface FriendsPageProps extends Props {
    friends: Account[]
    requests: FriendRequest[]
    fetchFriends: () => void
    fetchFriendRequests: () => void
}

const FriendsPage: FC<FriendsPageProps> = ({
    friends,
    requests,
    fetchFriends,
    fetchFriendRequests,
}) => {
    useEffect(() => {
        fetchFriends()
        fetchFriendRequests()
    }, [fetchFriends, fetchFriendRequests])

    const requestToYou = useMemo(
        () =>
            [...requests].filter((r) => !(typeof r.from_account === 'number')),
        [requests]
    )

    return (
        <div className={classes.friendsPageContainer}>
            <Block padding='15px' width='400px'>
                <RequestList requests={requestToYou} />
            </Block>
            <Block padding='15px 20px 25px 20px'>
                <FriendList friends={friends} />
            </Block>
        </div>
    )
}

const mapStateToProps = (state: RootState) => ({
    friends: state.account.friends,
    requests: state.account.friendRequests,
})

const mapDispatchToProps = (dispatch: TDispatch) => {
    return {
        fetchFriends: () => {
            dispatch(fetchFriends())
        },
        fetchFriendRequests: () => {
            dispatch(fetchFriendRequests())
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FriendsPage)
