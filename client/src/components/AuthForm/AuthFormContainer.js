import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import AuthForm from './AuthForm';
import { requestLoginThunk, requestRegisterThunk, setAuthFormAC } from 'redux/authReducer';

const AuthFormContainer = (props) => {

    const {
        fetching, 
        requestLoginThunk, 
        requestRegisterThunk, 
        setAuthFormAC, 
        fieldEmail, 
        fieldPass
    } = props;

    const login = () => {
        requestLoginThunk(fieldEmail, fieldPass);
    }

    const register = () => {
        requestRegisterThunk(fieldEmail, fieldPass);
    }
    
    return <AuthForm 
                fetching={fetching} 
                login={login} 
                register={register}
                setAuthFormAC={setAuthFormAC}
                fieldEmail={fieldEmail}
                fieldPass={fieldPass} />;
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        requestLoginThunk,
        requestRegisterThunk,
        setAuthFormAC
    }, dispatch);
};

const mapStateToProps = (state) => {
    return {
        fetching: state.auth.fetching,
        fieldEmail: state.auth.form.email,
        fieldPass: state.auth.form.pass,
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthFormContainer)