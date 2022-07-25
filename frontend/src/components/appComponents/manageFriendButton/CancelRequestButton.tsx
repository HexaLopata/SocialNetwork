import React, { FC, useMemo } from 'react'
import { connect } from 'react-redux'
import useCSRF from '../../../hooks/useCSRF'
import { rejectFriendRequest } from '../../../redux/reducers/accountReducer/asyncActions'
import { RootState, TDispatch } from '../../../redux/store'
import { Account } from '../../../types/Account'
import { FriendRequest } from '../../../types/FriendRequest'
import { Props } from '../../../types/Props'
import SimpleButton, {
    SimpleButtonVariant,
} from '../../ui/simpleButton/SimpleButton'

interface CancelRequestButtonProps extends Props {
    otherAccount: Account
    requests: FriendRequest[]
    deleteFriendRequest: (request: FriendRequest, csrf: string) => void
}

export const CancelRequestButton: FC<CancelRequestButtonProps> = ({
    otherAccount,
    requests,
    deleteFriendRequest,
}) => {
    const csrf = useCSRF()
    const request = useMemo(
        () =>
            requests.find(
                (r) => (r.to_account as Account).id === otherAccount.id
            ),
        [requests]
    )
    return (
        <>
            {request ? (
                <>
                    <SimpleButton
                        onClick={() => deleteFriendRequest(request, csrf)}
                        variant={SimpleButtonVariant.dark}
                    >
                        Отменить запрос
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
        deleteFriendRequest: (request: FriendRequest, csrf: string) =>
            dispatch(rejectFriendRequest(request, csrf)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CancelRequestButton)
