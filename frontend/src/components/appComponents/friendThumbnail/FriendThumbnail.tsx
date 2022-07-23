import React, { FC } from 'react'
import { Account } from '../../../types/Account'
import { Props } from '../../../types/Props'
import { Img } from '../../ui/img/Img'
import classes from './FriendThumbnail.module.css'

interface FriendThumbnailProps extends Props {
    account: Account
}

export const FriendThumbnail: FC<FriendThumbnailProps> = ({ account }) => {
    return (
        <div className={classes.friendThumbnail}>
            <div className={classes.friendThumbnailContainer}>
                <Img
                    width='70px'
                    height='70px'
                    src={account.profile_picture_source}
                    alt='Аватар'
                />
                <div>
                    <h3>{account.first_name + ' ' + account.last_name}</h3>
                    <h5>{account.birthdate}</h5>
                </div>
            </div>
        </div>
    )
}
