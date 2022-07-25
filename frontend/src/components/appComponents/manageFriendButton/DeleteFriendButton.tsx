import React, { FC } from 'react'
import { connect } from 'react-redux'
import useCSRF from '../../../hooks/useCSRF'
import { removeFromFriendList } from '../../../redux/reducers/accountReducer/asyncActions'
import { TDispatch } from '../../../redux/store'
import { Account } from '../../../types/Account'
import { Props } from '../../../types/Props'
import SimpleButton, {
    SimpleButtonVariant,
} from '../../ui/simpleButton/SimpleButton'

interface DeleteFriendButtonProps extends Props {
    deleteFriend: (friend: Account, csrf: string) => void
    friendAccount: Account
}

export const DeleteFriendButton: FC<DeleteFriendButtonProps> = ({
    deleteFriend,
    friendAccount,
}) => {
    const csrf = useCSRF()

    return (
        <SimpleButton
            onClick={() => deleteFriend(friendAccount, csrf)}
            variant={SimpleButtonVariant.dark}
        >
            Удалить из друзей
        </SimpleButton>
    )
}

const mapDispatchToProps = (dispatch: TDispatch) => {
    return {
        deleteFriend: (friend: Account, csrf: string) =>
            dispatch(removeFromFriendList(friend, csrf)),
    }
}

export default connect(
    null,
    mapDispatchToProps
)(DeleteFriendButton)
