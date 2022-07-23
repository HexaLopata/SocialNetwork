import React, { FC, useCallback } from 'react'
import { connect } from 'react-redux'
import useCSRF from '../../../hooks/useCSRF'
import {
    acceptFriendRequest,
    rejectFriendRequest,
} from '../../../redux/reducers/accountReducer/asyncActions'
import { TDispatch } from '../../../redux/store'
import { Account } from '../../../types/Account'
import { FriendRequest as FriendRequestType } from '../../../types/FriendRequest'
import { Props } from '../../../types/Props'
import Block from '../../ui/block/Block'
import { Img } from '../../ui/img/Img'
import SimpleButton, { SimpleButtonVariant } from '../../ui/simpleButton/SimpleButton'
import classes from './FriendRequest.module.css'

interface FriendRequestProps extends Props {
    request: FriendRequestType
    acceptFriendRequest: (request: FriendRequestType, csrf: string) => void
    rejectFriendRequest: (request: FriendRequestType, csrf: string) => void
}

export const FriendRequest: FC<FriendRequestProps> = ({
    request,
    acceptFriendRequest,
    rejectFriendRequest,
}) => {
    const account = request.from_account as Account
    const csrf = useCSRF()

    const accept = useCallback(() => {
        acceptFriendRequest(request, csrf)
    }, [account, csrf])

    const reject = useCallback(() => {
        rejectFriendRequest(request, csrf)
    }, [request, csrf])

    return (
        <div className={classes.requestContainer}>
            <Img
                src={account?.profile_picture_source}
                width='70px'
                height='70px'
            />
            <div className={classes.infoContainer}>
                <h3>{account.first_name + ' ' + account.last_name}</h3>
                <h5>{account.birthdate}</h5>
                <SimpleButton variant={SimpleButtonVariant.dark} onClick={accept}>Принять</SimpleButton>
                <SimpleButton variant={SimpleButtonVariant.dark} onClick={reject}>Отклонить</SimpleButton>
            </div>
        </div>
    )
}

const mapDispatchToProps = (dispatch: TDispatch) => {
    return {
        acceptFriendRequest: (request: FriendRequestType, csrf: string) =>
            dispatch(acceptFriendRequest(request, csrf)),
        rejectFriendRequest: (request: FriendRequestType, csrf: string) =>
            dispatch(rejectFriendRequest(request, csrf)),
    }
}

export default connect(null, mapDispatchToProps)(FriendRequest)
