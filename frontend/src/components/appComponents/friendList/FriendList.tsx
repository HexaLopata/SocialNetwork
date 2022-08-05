import React, { FC } from 'react'
import { Account } from '../../../types/Account'
import { Props } from '../../../types/Props'
import { Centered } from '../../ui/centered/Centered'
import { FriendThumbnail } from '../friendThumbnail/FriendThumbnail'
import classes from './FriendList.module.css'

interface FriendListProps extends Props {
    friends: Account[]
}

export const FriendList: FC<FriendListProps> = ({ friends }) => {
    return (
        <div>
            <div className={classes.headerContainer}>
                <Centered>
                    <h2>Друзья</h2>
                </Centered>
            </div>

            {friends.length > 0 ? (
                <div className={classes.friendListContainer}>
                    {friends.map((f) => {
                        return <FriendThumbnail account={f} key={f.id} />
                    })}
                </div>
            ) : (
                <div className={classes.noFriendsHeaderContainer}>
                    <h4>Вы пока ни с кем не дружите 🙃</h4>
                </div>
            )}
        </div>
    )
}
