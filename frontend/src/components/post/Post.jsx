import React, { useState } from 'react'
import LikeButton from '../likeButton/LikeButton'
import Text from '../text/Text'
import classes from './Post.module.css'

export default function Post({ authorName, date, body, imageSrc }) {
    const [liked, setLiked] = useState(false)

    return (
        <div className={classes.post}>
            <div className={classes.topContainer}>
                <h2 className={classes.postHeader}>{authorName}</h2>
                <Text paragraphClass={classes.postDate}>
                    {body}
                </Text>

                {imageSrc ?
                    <div className={classes.imageContainer}>
                        <img className={classes.postImage} src={imageSrc} alt='' />
                    </div>
                    :
                    <></>
                }
            </div>
            <div className={classes.bottomContainer}>
                <LikeButton
                    liked={liked}
                    onClick={e => setLiked(!liked)}
                >
                    Оценить
                </LikeButton>

                <h2 className={classes.postDate}>{date}</h2>
            </div>
        </div>
    )
}
