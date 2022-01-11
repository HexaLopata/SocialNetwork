import HeaderLabel from '../general/labels/headerLabel/HeaderLabel';
import NormalLabel from '../general/labels/normalLabel/NormalLabel';
import NormalButton from '../general/buttons/normalButton/NormalButton';
import classes from './ProfileInfo.module.css'
import Block from '../general/block/Block'
import PostList from '../postList/PostList';
import { useState } from 'react';
import StackPanel from '../general/stackpanel/StackPanel';

function ProfileInfo() {
    const [posts, setPosts] = useState([
        {
            authorName: 'Алексей Басконович', body: `Приходит Петька к Василию Ивановичу Чапаеву и спрашивает:
        - Василий Иванович, а что такое "нюанс"?
        А Чапаев ему отвечает:
        - Ах, нюанс, нюанс...
        И умирает.`,
            imageSrc: 'https://sun9-70.userapi.com/c841524/v841524690/50ef7/2toeoqzKK1Q.jpg', id: 1,
            date: 'Сегодня'
        },
        {
            authorName: 'Алексей Басконович', body: `Приходит Петька к Василию Ивановичу Чапаеву и спрашивает:
        - Василий Иванович, а что такое "нюанс"?
        А Чапаев ему отвечает:
        - Ах, нюанс, нюанс...
        И умирает.`, imageSrc: 'https://sun9-40.userapi.com/impg/HeGZr-m0xtkGocDFJjTeME9ChbSMj6gAgdsR5w/Ajb_Jza0lDc.jpg?size=800x800&quality=95&sign=19de8e22098c161ebff0e7fb6d7d5b7c&type=album',
            id: 2,
            date: '25.05.2021'
        },
        {
            authorName: 'Алексей Басконович', body: `Приходит Петька к Василию Ивановичу Чапаеву и спрашивает:
        - Василий Иванович, а что такое "нюанс"?
        А Чапаев ему отвечает:
        - Ах, нюанс, нюанс...
        И умирает.`, imageSrc: 'https://sun9-55.userapi.com/impg/dy6AR3ysGJRlpBm4LVOerofcuPWCVZGtNka2bw/c4-dWUSg180.jpg?size=1280x720&quality=95&sign=0b365160dee3e5e08eee6b45c9056a30&type=album',
            id: 3,
            date: '03.01.2022'
        },
    ])

    return (
        <div style={{ marginTop: '20px' }}>
            <StackPanel direction='row'>
                <img src='https://sun1-55.userapi.com/s/v1/ig2/Y4hC-fQemgaOpVwMM7wLmDXZs6W6GgqJ0YbxKx-Fw7PyUMqUjBa5WbeUmldEzpWGaTE4TelTLC0U7MWGbjfMhviD.jpg?size=200x200&quality=95&crop=282,0,720,720&ava=1' className={classes.profilePicture}>

                </img>
                <div className={classes.personalInfo}>
                    <HeaderLabel>Общая информация</HeaderLabel>
                    <NormalLabel>Имя: Алексей Басконович</NormalLabel>
                    <NormalLabel>Дата рождения: 8 Октября 2003 года</NormalLabel>
                    <NormalButton goTo='/editProfile' style={{ marginTop: '20px' }}>Редактировать</NormalButton>
                </div>
            </StackPanel>
            <Block style={{ marginTop: '20px', minHeight: '300px' }}>
                <PostList posts={posts}>

                </PostList>
            </Block>
        </div>
    );
}

export default ProfileInfo;