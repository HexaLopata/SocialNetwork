import { useHover } from '../../hooks/useHover';
import Block from '../general/block/Block';
import HeaderLabel from '../general/labels/headerLabel/HeaderLabel'
import NormalLabel from '../general/labels/normalLabel/NormalLabel';
import StackPanel from '../general/stackpanel/StackPanel';
import classes from './ChatPreview.module.css'

function ChatPreview({ ...props }) {
    const [ref, isHovering] = useHover()
    const blockClasses = isHovering ? [classes.blockHover, classes.hoverable] : [classes.hoverable]

    return (
        <div {...props} className={classes.chatPreview}>
            <Block
                ref={ref}
                additionalClasses = {blockClasses}
            >
                <StackPanel direction='row'>
                    <img className={classes.profilePicture} />
                    <StackPanel style={{ padding: '10px' }}>
                        <HeaderLabel>Имя собеседника</HeaderLabel>
                        <NormalLabel>Ты: Последнее сообщение</NormalLabel>
                    </StackPanel>
                </StackPanel>
            </Block>
        </div>
    );
}

export default ChatPreview;