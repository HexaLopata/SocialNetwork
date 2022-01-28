import { useHover } from '../../hooks/useHover';
import Block from '../general/block/Block';
import HeaderLabel from '../general/labels/headerLabel/HeaderLabel'
import NormalLabel from '../general/labels/normalLabel/NormalLabel';
import StackPanel from '../general/stackpanel/StackPanel';
import classes from './ChatPreview.module.css'

function ChatPreview({ ...props }) {
    const [ref, isHovering] = useHover()

    return (
        <div {...props} className={classes.chatPreview}>
            <Block 
                ref={ref}
                style={{
                    transition: 'all 0.2s ease-in',
                    cursor: 'pointer',
                    backgroundColor: isHovering ? '#ededed' : ''
                }}>
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