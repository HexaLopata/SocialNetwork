import React, { FC, useState } from 'react'
import { Props } from '../../../types/Props'
import LikeButton from '../../ui/likeButton/LikeButton'
import Text from '../../ui/text/Text'
import classes from './Post.module.css'

interface PostProps extends Props {
    authorName: string
    date?: string
    body: string
    imageSrc?: string
}

const Post: FC<PostProps> = ({ authorName, date, body, imageSrc }) => {
    const [liked, setLiked] = useState(false)

    return (
        <div className={classes.post}>
            <div className={classes.topContainer}>
                <h2 className={classes.postHeader}>{authorName}</h2>
                <Text paragraphClass={classes.postDate}>{body}</Text>

                {imageSrc ? (
                    <div className={classes.imageContainer}>
                        <img
                            className={classes.postImage}
                            src={imageSrc}
                            alt=''
                        />
                    </div>
                ) : (
                    <></>
                )}
            </div>
            <div className={classes.bottomContainer}>
                <LikeButton liked={liked} onClick={() => setLiked(!liked)}>
                    Оценить
                </LikeButton>

                <h2 className={classes.postDate}>{date}</h2>
            </div>
        </div>
    )
}

export default Post
