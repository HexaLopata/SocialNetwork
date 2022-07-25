import React, { FC, useEffect, useMemo } from 'react'
import { connect } from 'react-redux'
import {
    fetchFriendRequests,
    fetchFriends,
} from '../../../redux/reducers/accountReducer/asyncActions'
import { RootState, TDispatch } from '../../../redux/store'
import { Account } from '../../../types/Account'
import { FriendRequest } from '../../../types/FriendRequest'
import { Props } from '../../../types/Props'
import AcceptRejectRequestButton from './AcceptRejectRequestButton'
import AddFriendButton from './AddFriendButton'
import CancelRequestButton from './CancelRequestButton'
import DeleteFriendButton from './DeleteFriendButton'

enum ManageFriendButtonState {
    friend,
    requestFromAccount,
    requestToAccount,
    notFriend,
}

interface ManageFriendButtonProps extends Props {
    friends: Account[]
    requests: FriendRequest[]
    account: Account | null
    observedAccount: Account
    fetchFriends: () => void
    fetchFriendRequests: () => void
}

const getButtonState = (
    friends: Account[],
    requests: FriendRequest[],
    account: Account | null,
    observedAccount: Account | null
): ManageFriendButtonState => {
    if (
        friends.findIndex((f) => {
            return observedAccount?.id === f.id
        }) !== -1
    ) {
        return ManageFriendButtonState.friend
    }

    if (
        requests.findIndex((f) => {
            return (
                f.to_account === account?.id &&
                (f.from_account as Account).id === observedAccount?.id
            )
        }) !== -1
    ) {
        return ManageFriendButtonState.requestFromAccount
    }

    if (
        requests.findIndex((f) => {
            return (
                f.from_account === account?.id &&
                (f.to_account as Account).id === observedAccount?.id
            )
        }) !== -1
    ) {
        return ManageFriendButtonState.requestToAccount
    }

    return ManageFriendButtonState.notFriend
}

const getComponentByState = (
    state: ManageFriendButtonState,
    otherAccount: Account
) => {
    switch (state) {
        case ManageFriendButtonState.friend:
            return <DeleteFriendButton friendAccount={otherAccount} />
        case ManageFriendButtonState.requestFromAccount:
            return <AcceptRejectRequestButton otherAccount={otherAccount} />
        case ManageFriendButtonState.requestToAccount:
            return <CancelRequestButton otherAccount={otherAccount} />
        case ManageFriendButtonState.notFriend:
            return <AddFriendButton otherAccount={otherAccount} />
    }
}

export const ManageFriendButton: FC<ManageFriendButtonProps> = ({
    friends,
    requests,
    account,
    observedAccount,
    fetchFriendRequests,
    fetchFriends,
}) => {
    useEffect(() => {
        fetchFriends()
        fetchFriendRequests()
    }, [fetchFriends, fetchFriendRequests])

    const state = useMemo(
        () => getButtonState(friends, requests, account, observedAccount),
        [friends, requests, account, observedAccount]
    )

    return <>{getComponentByState(state, observedAccount)}</>
}

const mapStateToProps = (state: RootState) => ({
    friends: state.account.friends,
    requests: state.account.friendRequests,
    account: state.account.account,
})

const mapDispatchToProps = (dispatch: TDispatch) => {
    return {
        fetchFriends: () => dispatch(fetchFriends()),
        fetchFriendRequests: () => dispatch(fetchFriendRequests()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageFriendButton)
