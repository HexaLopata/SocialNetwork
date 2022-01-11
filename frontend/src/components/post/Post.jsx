import NormalButton from '../general/buttons/normalButton/NormalButton';
import HeaderLabel from '../general/labels/headerLabel/HeaderLabel';
import NormalLabel from '../general/labels/normalLabel/NormalLabel';
import SmallLabel from '../general/labels/smallLabel/SmallLabel';
import classes from './Post.module.css'

function Post({authorName, body, imageSrc, date}) {
    return ( 
        <div className={classes.post} style={{marginTop: '20px'}}>
            <HeaderLabel>{authorName}</HeaderLabel>
            <SmallLabel>Дата: {date}</SmallLabel>
            <NormalLabel>{body}</NormalLabel>
            { imageSrc && <img className={classes.postImage} src={imageSrc}/> }
            <NormalButton style={{marginTop: '10px'}}>
                Оценить
            </NormalButton>
        </div>
    );
}

export default Post;