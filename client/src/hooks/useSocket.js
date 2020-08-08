import socketIOClient from "socket.io-client";

const useSocket = () => {
    return socketIOClient('https://minisocialnetw.herokuapp.com:80');
};

export {
    useSocket
};