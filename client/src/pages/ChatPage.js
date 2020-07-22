import React from 'react';
import { useSocket } from '../hooks/useSocket';
import Chat from '../components/Chat/ChatContainer';

const ChatPage = () => {
    
    const socket = useSocket();

    return (
        <Chat socket={socket} />
    )
};

export default ChatPage;