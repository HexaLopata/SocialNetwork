import { Account } from '../types/Account'
import { Chat, Message } from '../types/Chat'
import FileService from './FileService'

interface ActionData {
    id: number
    action: string
    payload?: {
        text?: string
        image?: number
        author?: number
        date?: string
        image_source?: string
    }
}

export class WebSocketChat {
    static _apiUri: string
    static _onRecieveAdd?: (message: Message) => void
    static _onRecieveUpdate?: (message: Message) => void
    static _onRecieveDelete?: (messageId: number) => void
    static _webSocket: WebSocket

    static establishConnection(
        chat: Chat,
        onRecieveAdd?: (message: Message) => void,
        onRecieveUpdate?: (message: Message) => void,
        onRecieveDelete?: (messageId: number) => void
    ) {
        WebSocketChat._apiUri = chat.isPrivate
            ? `ws://localhost:8000/chat/private/${chat.id}/`
            : `ws://localhost:8000/chat/group/${chat.id}/`
        WebSocketChat._onRecieveAdd = onRecieveAdd
        WebSocketChat._onRecieveUpdate = onRecieveUpdate
        WebSocketChat._onRecieveDelete = onRecieveDelete

        WebSocketChat._webSocket = new WebSocket(this._apiUri)
        WebSocketChat._webSocket.onmessage = this._onMessage
    }

    static sendMessage(message: Message, csrf: string, image?: File) {
        FileService.uploadAllImages(
            [{ file: image || null, name: 'image' }].filter((f) => f.file),
            csrf
        ).then((files) => {
            const image = files.find(f => f.name == 'image')
            WebSocketChat._webSocket.send(
                JSON.stringify({
                    id: message.id,
                    action: 'add',
                    payload: {
                        text: message.body,
                        image: image?.id,
                    },
                })
            )
        })
    }

    static updateMessage(message: Message) {
        WebSocketChat._webSocket.send(
            JSON.stringify({
                id: message.id,
                action: 'edit',
                payload: {
                    text: message.body,
                    image: message.image,
                },
            })
        )
    }

    static deleteMessage(message: Message) {
        WebSocketChat._webSocket.send(
            JSON.stringify({
                id: message.id,
                action: 'delete',
            })
        )
    }

    static disconnect() {
        console.log('trying disconnect')

        WebSocketChat._webSocket.close()
    }

    static _onMessage(msgEvent: MessageEvent<string>) {
        const data: ActionData = JSON.parse(msgEvent.data)
        switch (data.action) {
            case 'add':
                if (WebSocketChat._onRecieveAdd) {
                    WebSocketChat._onRecieveAdd(
                        WebSocketChat._parseMessage(data)
                    )
                }
                break
            case 'edit':
                if (WebSocketChat._onRecieveUpdate)
                    WebSocketChat._onRecieveUpdate(
                        WebSocketChat._parseMessage(data)
                    )
                break
            case 'delete':
                if (WebSocketChat._onRecieveDelete)
                    WebSocketChat._onRecieveDelete(data.id)
                break
            default:
                break
        }
    }

    static _parseMessage(data: ActionData) {
        return {
            id: data.id,
            body: data.payload?.text || '',
            date: data.payload?.date || '',
            author: { id: data.payload?.author } as Account,
            image: data.payload?.image,
            image_source: data.payload?.image_source
        }
    }
}
