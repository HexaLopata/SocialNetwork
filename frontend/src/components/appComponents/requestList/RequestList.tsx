import React, { FC } from 'react'
import { FriendRequest as FriendRequestType } from '../../../types/FriendRequest'
import { Props } from '../../../types/Props'
import { Centered } from '../../ui/centered/Centered'
import FriendRequest from '../friendRequest/FriendRequest'
import classes from './RequestList.module.css'

interface RequestListProps extends Props {
    requests: FriendRequestType[]
}

export const RequestList: FC<RequestListProps> = ({ requests }) => {
    return (
        <>
            <Centered>
                <h2>Запросы в друзья</h2>
            </Centered>
            {requests.length > 0 ? (
                <div className={classes.requestListContainer}>
                    {requests.map((r) => (
                        <FriendRequest request={r} key={r.id} />
                    ))}
                </div>
            ) : (
              <Centered>
                <h5>Ничего нет :(</h5>
              </Centered>
            )}
        </>
    )
}
