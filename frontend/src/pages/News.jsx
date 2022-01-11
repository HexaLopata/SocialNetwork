import DefaultPageWrapper from "../components/pageWrappers/DefaultPageWrapper";
import PostList from "../components/postList/PostList";
import React, { useState } from 'react';
import Block from "../components/general/block/Block";
import NormalButton from "../components/general/buttons/normalButton/NormalButton";

function NewsPage() {
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
        <DefaultPageWrapper>
            <Block>
                <PostList posts={posts}></PostList>
                <NormalButton style={{ margin: '5px auto' }} >Наверх</NormalButton>
            </Block>
        </DefaultPageWrapper>
    );
}

export default NewsPage;