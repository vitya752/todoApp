import React from 'react';
import { connect } from 'react-redux';
import './OnlineUsers.css';
import { bindActionCreators } from 'redux';
import { setOpenOnlineUsersAC } from '../../../redux/chatReducer';
import OnlineUsersItem from './OnlineUsersItem/OnlineUsersItem';

const OnlineUsers = ({ onlineUsers, openOnlineUsers, setOpenOnlineUsersAC }) => {
    return (
        <div className="online-users">
            <span 
                className="online-users__switch"
                onClick={setOpenOnlineUsersAC}>
                    Онлайн юзеры ({onlineUsers.length}) 
                    <span className="online-users__switch__status">{openOnlineUsers ? '-' : '+'}</span>                
            </span>
            <ul className={`online-users__list ${openOnlineUsers && 'online-users__list_active'}`}>
                {
                    onlineUsers ? onlineUsers.map((el) => {
                        return <OnlineUsersItem key={el._id} data={el.userId} />
                    }) : ''
                }
            </ul>
        </div>
    )
};

const mapStateToProps = state => {
    return {
        onlineUsers: state.chatPage.onlineUsers,
        openOnlineUsers: state.chatPage.openOnlineUsers
    }
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        setOpenOnlineUsersAC
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(OnlineUsers);