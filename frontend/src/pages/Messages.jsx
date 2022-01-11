import ChatPreview from "../components/chatPreview/ChatPreview";
import DefaultPageWrapper from "../components/pageWrappers/DefaultPageWrapper";

const MessagesPage = function () {
    return (
        <DefaultPageWrapper>
            <ChatPreview style={{margin: '10px 0'}}></ChatPreview>
            <ChatPreview style={{margin: '10px 0'}}></ChatPreview>
            <ChatPreview style={{margin: '10px 0'}}></ChatPreview>
        </DefaultPageWrapper>
    );
}

export default MessagesPage;