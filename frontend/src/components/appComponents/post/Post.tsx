import React, { FC } from 'react'
import { connect } from 'react-redux'
import useCSRF from '../../../hooks/useCSRF'
import {
    cancelPostLike,
    likePost,
} from '../../../redux/reducers/postReducer/asyncActions'
import { TDispatch } from '../../../redux/store'
import { Post as PostType } from '../../../types/Post'
import { Props } from '../../../types/Props'
import LikeButton from '../../ui/likeButton/LikeButton'
import Text from '../../ui/text/Text'
import classes from './Post.module.css'

interface PostProps extends Props {
    post: PostType
    like: (post: PostType, csrf: string) => void
    cancelLike: (post: PostType, csrf: string) => void
}

const Post: FC<PostProps> = ({ post, like, cancelLike }) => {
    const csrf = useCSRF()

    const setLike = () => {
        if (post.liked) cancelLike(post, csrf)
        else like(post, csrf)
    }

    return (
        <div className={classes.post}>
            <div className={classes.topContainer}>
                <h2 className={classes.postHeader}>
                    {post.author_first_name + ' ' + post.author_last_name}
                </h2>
                <Text paragraphClass={classes.postDate}>{post.body}</Text>

                {post.image_source ? (
                    <div className={classes.imageContainer}>
                        <img
                            className={classes.postImage}
                            src={post.image_source}
                            alt=''
                        />
                    </div>
                ) : (
                    <></>
                )}
            </div>
            <div className={classes.bottomContainer}>
                <LikeButton liked={post.liked} onClick={setLike}>
                    Оценить
                </LikeButton>

                <h2 className={classes.postDate}>{post.date}</h2>
            </div>
        </div>
    )
}

const mapDispatchToProps = (dispatch: TDispatch) => {
    return {
        like: (post: PostType, csrf: string) => {
            dispatch(likePost(post, csrf))
        },
        cancelLike: (post: PostType, csrf: string) => {
            dispatch(cancelPostLike(post, csrf))
        },
    }
}

export default connect(null, mapDispatchToProps)(Post)
