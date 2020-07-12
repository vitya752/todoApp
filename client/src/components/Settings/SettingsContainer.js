import React from 'react';
import { setSettingsAC, updateSettingsThunk, deleteAccThunk } from '../../redux/authReducer';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Settings from './Settings';

const SettingsContainer = ({ token, userId, email, nickname, avatar, setSettingsAC, updateSettingsThunk, deleteAccThunk }) => {

    const changeHandler = (e) => {
        setSettingsAC(e.target.name, e.target.value);
    };

    return (
        <Settings
            token={token}
            userId={userId}
            email={email}
            nickname={nickname}
            changeHandler={changeHandler}
            updateSettingsThunk={updateSettingsThunk}
            deleteAccThunk={deleteAccThunk}
            avatar={avatar} />
    )
};

const mapStateToProps = (state) => {
    return {
        token: state.auth.token,
        userId: state.auth.userId,
        email: state.auth.email,
        nickname: state.auth.nickname,
        avatar: state.auth.avatar
    }
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        setSettingsAC,
        updateSettingsThunk,
        deleteAccThunk
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsContainer);