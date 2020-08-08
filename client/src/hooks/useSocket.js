import socketIOClient from "socket.io-client";

const useSocket = () => {
    return socketIOClient('https://minisocialnetw.herokuapp.com:5000');
};

export {
    useSocket
};