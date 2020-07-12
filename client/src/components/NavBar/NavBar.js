import React, { useEffect } from 'react';
import {NavLink} from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setAuthAC } from '../../redux/authReducer';
import './NavBar.css';

const NavBar = ({ setAuthAC }) => {

    const toggleMenu = () => {
        const menu = document.querySelector('.collapse.navbar-collapse');
        menu.classList.toggle('active');
    }

    const logoutHandler = (e) => {
        e.preventDefault();
        setAuthAC({});
    }

    useEffect(() => {
        const button = document.querySelector('.navbar-toggler');
        if(button) {
            button.addEventListener('click', toggleMenu);
        }

        return () => {
            if(button) {
                button.removeEventListener('click', toggleMenu);
            }
        }

    }, []);

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <span className="navbar-brand">Notes</span>
            <button className="navbar-toggler" type="button" >
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav ml-auto">
                    <NavLink 
                        className="nav-item nav-link"
                        to="/chat">
                        Чат
                    </NavLink>
                    <NavLink 
                        className="nav-item nav-link"
                        to="/todo">
                        Заметки
                    </NavLink>
                    <NavLink 
                        className="nav-item nav-link"
                        to="/settings">
                        Настройки
                    </NavLink>
                    <a 
                        className="nav-item nav-link" 
                        href="/"
                        onClick={logoutHandler}
                        >
                        Выйти
                    </a>
                </div>
            </div>
        </nav>
    )
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        setAuthAC
    }, dispatch);
};

export default connect(null, mapDispatchToProps)(NavBar);