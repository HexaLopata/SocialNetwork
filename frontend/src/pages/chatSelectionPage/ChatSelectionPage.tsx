import React, { FC, useEffect } from 'react'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import ChatPreview from '../../components/appComponents/chatPreview/ChatPreview'
import { fetchPrivateChats } from '../../redux/reducers/chatReducer/asyncActions'
import { RootState, TDispatch } from '../../redux/store'
import { Account } from '../../types/Account'
import { Chat } from '../../types/Chat'
import { Props } from '../../types/Props'
import classes from './ChatSelectionPage.module.css'

interface ChatSelectionPageProps extends Props {
    chats: Chat[]
    fetchChats: () => void
    account: Account | null
}

const ChatSelectionPage: FC<ChatSelectionPageProps> = ({
    chats,
    account,
    fetchChats,
}) => {
    useEffect(() => {
        fetchChats()
    }, [fetchChats])

    const navigate = useNavigate()

    return (
        <div className={classes.chatSelectionContainer}>
            {chats.map((c) => {
                const otherAccount = c.members.find((m) => m.id !== account?.id)
                return (
                    <ChatPreview
                        chatName={`Личные сообщения с ${otherAccount?.first_name} ${otherAccount?.last_name}`}
                        lastMessage=''
                        onClick={() => navigate(`/chat/${otherAccount?.id}`)}
                        chatPicture={otherAccount?.profile_picture_source || ''}
                        key={c.id}
                    />
                )
            })}
        </div>
    )
}

const mapStateToProps = (state: RootState) => ({
    chats: state.chat.privateChats,
    account: state.account.account,
})

const mapDispatchToProps = (dispatch: TDispatch) => {
    return {
        fetchChats: () => dispatch(fetchPrivateChats()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatSelectionPage)
