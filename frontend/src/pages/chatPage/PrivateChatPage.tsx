import React, { FC, useEffect } from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import Chat from '../../components/appComponents/chat/Chat'
import { setCurrentChat } from '../../redux/reducers/chatReducer'
import { fetchCurrentPrivateChat } from '../../redux/reducers/chatReducer/asyncActions'
import { RootState, TDispatch } from '../../redux/store'
import { Chat as ChatType } from '../../types/Chat'
import { Props } from '../../types/Props'
import classes from './ChatPage.module.css'

interface PrivateChatPageProps extends Props {
    chat: ChatType | null
    fetchChat: (accountId: number) => void
    setCurrentChat: (chat: ChatType | null) => void
}

const PrivateChatPage: FC<PrivateChatPageProps> = ({
    chat,
    fetchChat,
    setCurrentChat,
}) => {
    const params = useParams()

    useEffect(() => {
        if (params.id) fetchChat(+params.id)
        return () => {
            setCurrentChat(null)
        }
    }, [fetchChat, params])

    return (
        <div className={classes.chatPageContainer}>
            {chat ? <Chat chat={chat} /> : <></>}
        </div>
    )
}

const mapStateToProps = (state: RootState) => ({
    chat: state.chat.currentChat,
})

const mapDispatchToProps = (dispatch: TDispatch) => {
    return {
        fetchChat: (accountId: number) =>
            dispatch(fetchCurrentPrivateChat(accountId)),
        setCurrentChat: (chat: ChatType | null) => dispatch(setCurrentChat(chat)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PrivateChatPage)
