import React, { FC } from 'react'
import { connect } from 'react-redux'
import useCSRF from '../../../hooks/useCSRF'
import { sendFriendRequest } from '../../../redux/reducers/accountReducer/asyncActions'
import { TDispatch } from '../../../redux/store'
import { Account } from '../../../types/Account'
import { Props } from '../../../types/Props'
import SimpleButton, {
    SimpleButtonVariant,
} from '../../ui/simpleButton/SimpleButton'

interface AddFriendButtonProps extends Props {
    otherAccount: Account
    sendFriendRequest: (account: Account, csrf: string) => void
}

export const AddFriendButton: FC<AddFriendButtonProps> = ({
    otherAccount,
    sendFriendRequest,
}) => {
    const csrf = useCSRF()

    return (
        <SimpleButton
            onClick={() => sendFriendRequest(otherAccount, csrf)}
            variant={SimpleButtonVariant.dark}
        >
            Добавить в друзья
        </SimpleButton>
    )
}

const mapDispatchToProps = (dispatch: TDispatch) => {
    return {
        sendFriendRequest: (account: Account, csrf: string) =>
            dispatch(sendFriendRequest(account, csrf)),
    }
}

export default connect(null, mapDispatchToProps)(AddFriendButton)
