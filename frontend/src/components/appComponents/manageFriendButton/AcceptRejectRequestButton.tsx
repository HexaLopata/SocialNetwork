import React, { FC, useMemo } from 'react'
import { connect } from 'react-redux'
import useCSRF from '../../../hooks/useCSRF'
import {
    acceptFriendRequest,
    rejectFriendRequest,
} from '../../../redux/reducers/accountReducer/asyncActions'
import { RootState, TDispatch } from '../../../redux/store'
import { Account } from '../../../types/Account'
import { FriendRequest } from '../../../types/FriendRequest'
import { Props } from '../../../types/Props'
import SimpleButton, {
    SimpleButtonVariant,
} from '../../ui/simpleButton/SimpleButton'

interface AcceptRejectRequestButtonProps extends Props {
    otherAccount: Account
    requests: FriendRequest[]
    acceptFriendRequest: (request: FriendRequest, csrf: string) => void
    rejectFriendRequest: (request: FriendRequest, csrf: string) => void
}

export const AcceptRejectRequestButton: FC<AcceptRejectRequestButtonProps> = ({
    otherAccount,
    requests,
    acceptFriendRequest,
    rejectFriendRequest,
}) => {
    const request = useMemo(
        () =>
            requests.find(
                (r) => (r.from_account as Account).id === otherAccount.id
            ),
        [requests]
    )

    const csrf = useCSRF()

    return (
        <>
            {request ? (
                <>
                    <SimpleButton
                        onClick={() => rejectFriendRequest(request, csrf)}
                        variant={SimpleButtonVariant.dark}
                    >
                        Отклонить запрос
                    </SimpleButton>
                    <SimpleButton
                        onClick={() => acceptFriendRequest(request, csrf)}
                        variant={SimpleButtonVariant.dark}
                    >
                        Принять запрос
                    </SimpleButton>
                </>
            ) : (
                <></>
            )}
        </>
    )
}

const mapStateToProps = (state: RootState) => ({
    requests: state.account.friendRequests,
})

const mapDispatchToProps = (dispatch: TDispatch) => {
    return {
        acceptFriendRequest: (request: FriendRequest, csrf: string) =>
            dispatch(acceptFriendRequest(request, csrf)),
        rejectFriendRequest: (request: FriendRequest, csrf: string) =>
            dispatch(rejectFriendRequest(request, csrf)),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AcceptRejectRequestButton)
