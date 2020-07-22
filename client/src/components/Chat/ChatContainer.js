import React, { useEffect }  from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Chat from './Chat';
import ErrorAlert from 'components/templates/ErrorAlert/ErrorAlert';
import { deleteUserAC, setOnlineUsersAC, pushMessageAC, clearMessagesAC } from 'redux/chatReducer';

const ChatContainerWrapper = (props) => {

    const { nickname } = props;
    if(!nickname) {
        return (
            <ErrorAlert type="danger">
                Для входа в чат нужно иметь никнэйм. Настроить никнэйм Вы можете на странице "Настройки".
            </ErrorAlert>
        )
    }
    return <ChatContainer {...props} />
    
};

const ChatContainer = ({ socket, userId, avatar, messages, deleteUserAC, setOnlineUsersAC, pushMessageAC, clearMessagesAC }) => {

    useEffect(() => {
        
        socket.emit('CHAT:JOIN', { userId });

        return () => {
            deleteUserAC(socket.id);
            clearMessagesAC();
            socket.disconnect();
        };

    }, [userId, socket, deleteUserAC, clearMessagesAC]);

    useEffect(() => {

        const deleteUser = ({id}) => {
            deleteUserAC(id);
        };

        socket.on('CHAT:DELETE_USER', deleteUser);

        const addMess = (message) => {
            pushMessageAC(message);
        };

        socket.on('CHAT:ADD_MESSAGE', addMess);

        const pushOnlineUsersOnClient = ({onlineUsers}) => {
            setOnlineUsersAC(onlineUsers);
        };

        socket.on('CHAT:PUSH_ONLINE_USERS_ON_CLIENT', pushOnlineUsersOnClient);

        return () => {
            socket.off('CHAT:DELETE_USER', deleteUser);
            socket.off('CHAT:ADD_MESSAGE', addMess);
            socket.off('CHAT:PUSH_ONLINE_USERS_ON_CLIENT', pushOnlineUsersOnClient);
        }

    }, [deleteUserAC, pushMessageAC, setOnlineUsersAC, socket]);

    const submitMessage = (text) => {
        socket.emit('CHAT:SEND_MESSAGE', { userId, text });
    }

    return (
        <Chat 
            submitMessage={submitMessage}
            messages={messages}
            avatar={avatar}
            userId={userId} />
    )

};

const mapStateToProps = (state) => {
    return {
        userId: state.auth.userId,
        avatar: state.auth.avatar,
        messages: state.chatPage.messages,
        nickname: state.auth.nickname
    }
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        deleteUserAC,
        setOnlineUsersAC,
        pushMessageAC,
        clearMessagesAC
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatContainerWrapper);