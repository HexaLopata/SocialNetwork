import React, { FC, ReactNode } from 'react'
import { Props } from '../../../types/Props'
import Block from '../../ui/block/Block'
import { Img } from '../../ui/img/Img'
import classes from './ProfileInfo.module.css'
import defaultImage from '../../../global/default-profile-icon.jpg'

interface ProfileInfoProps extends Props {
    name?: string
    birthdate?: string
    profilePictureSrc?: string
    infoComponents?: ReactNode
}

export const ProfileInfo: FC<ProfileInfoProps> = ({
    name,
    birthdate,
    children,
    profilePictureSrc,
    infoComponents
}) => {
    return (
        <div className={classes.profileInfoContainer}>
            <div>
                <Img
                    width='200px'
                    height='200px'
                    borderRadius='25px'
                    src={profilePictureSrc || defaultImage}
                    alt='Изображение'
                />
            </div>
            <Block className={classes.profileInfo}>
                <h1>{name}</h1>
                <h4>Дата рождения: {birthdate}</h4>
                {infoComponents}
                <div className={classes.buttonsContainer}>{children}</div>
            </Block>
        </div>
    )
}
