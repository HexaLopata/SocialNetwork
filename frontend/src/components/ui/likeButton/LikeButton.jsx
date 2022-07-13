import classes from './LikeButton.module.css'
import heartImage from './like-svgrepo-com.svg'

export default function LikeButton({ children, liked = false, onClick }) {

    const getClasses = () => {
        if (liked)
            return classes.likeButton + ' ' + classes.closed
        return classes.likeButton
    }

    return (
        <button
            className={getClasses()}
            type='submit'
            onClick={e => onClick(e)}
        >
            <div className={classes.heart} style={{ maskImage: `url(${heartImage})` }}></div>
            {children}
        </button>
    )
}
