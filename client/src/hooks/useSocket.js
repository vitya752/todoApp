import socketIOClient from "socket.io-client";

const useSocket = () => {
    // return socketIOClient('http://localhost:5000');
    return socketIOClient('https://minisocialnetw.herokuapp.com:80');
};

export {
    useSocket
};