import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import routesRender from '../../routes';
import { connect } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import NavBar from '../NavBar/NavBar';
import 'react-toastify/dist/ReactToastify.css';

const App = ({isAuth}) => {

    const routes = routesRender(isAuth);
    const nav = isAuth ? <NavBar /> : null;

    return (
        <div className="main-container main-container_dark">
            {nav}
            <div className="container">
                {routes}
            </div>
            <ToastContainer />
        </div>
    )
};

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth
    }
}

export default connect(mapStateToProps, null)(App);