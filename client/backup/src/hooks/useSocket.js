import socketIOClient from "socket.io-client";

const useSocket = () => {
    return socketIOClient('http://localhost:5000');
};

export {
    useSocket
};