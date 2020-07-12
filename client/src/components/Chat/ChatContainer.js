import React, { useEffect }  from 'react';
import socketIOClient from "socket.io-client";
import { connect } from 'react-redux';
import Chat from './Chat';
import { bindActionCreators } from 'redux';
import { deleteUserAC, setOnlineUsersAC, pushMessageAC, clearMessagesAC } from '../../redux/chatReducer';

const ChatContainerWrapper = (props) => {

    const { nickname } = props;
    if(!nickname) {
        return (
            <div className="alert alert-danger">
                Для входа в чат нужно иметь никнэйм. Настроить никнэйм Вы можете на странице "Настройки".
            </div>
        )
    }
    return <ChatContainer {...props} />
    
};

const ChatContainer = ({ userId, avatar, messages, deleteUserAC, setOnlineUsersAC, pushMessageAC, clearMessagesAC }) => {

    const socket = socketIOClient('http://localhost:5000');

    useEffect(() => {
        socket.emit('pushUserToOnline', { userId });

        return () => {
            deleteUserAC(socket.id);
            clearMessagesAC();
            socket.disconnect();
        };

    }, []);

    useEffect(() => {

        const deleteUser = ({id}) => {
            deleteUserAC(id);
        };

        socket.on('deleteUser', deleteUser);

        const addMess = (message) => {
            pushMessageAC(message);
        };

        socket.on('addMess', addMess);

        const pushOnlineUsersOnClient = ({onlineUsers}) => {
            setOnlineUsersAC(onlineUsers);
        };

        socket.on('pushOnlineUsersOnClient', pushOnlineUsersOnClient);

        return () => {
            socket.off('deleteUser', deleteUser);
            socket.off('addMess', addMess);
            socket.off('pushOnlineUsersOnClient', pushOnlineUsersOnClient);
        }

    }, [deleteUserAC, pushMessageAC, setOnlineUsersAC, socket]);

    const submitMessage = (text) => {
        socket.emit('sendMess', { userId, text });
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