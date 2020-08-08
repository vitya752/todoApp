import socketIOClient from "socket.io-client";

const useSocket = () => {
    return socketIOClient('https://minisocialnetw.herokuapp.com/');
};

export {
    useSocket
};