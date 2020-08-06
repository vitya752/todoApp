import React, { useState } from 'react';
import {NavLink} from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import './NavBar.css';
import { setAuthAC } from 'redux/authReducer';
import { useLocaleStorage } from 'hooks/useLocalStorage';

const NavBar = ({ setAuthAC }) => {

    const [menuStatus, setMenuStatus] = useState(false);
    const storage = useLocaleStorage();

    const toggleMenu = () => {
        setMenuStatus(!menuStatus);
    };

    const logoutHandler = (e) => {
        e.preventDefault();
        storage.deleteUser();
        setAuthAC({});
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <span className="navbar-brand">Notes</span>
            <button 
                className="navbar-toggler" 
                type="button"
                onClick={toggleMenu} >
                <span className="navbar-toggler-icon"></span>
            </button>
            <div 
                className={`collapse navbar-collapse ${menuStatus && 'active'}`} 
                id="navbarNavAltMarkup" >
                <div className="navbar-nav ml-auto">
                    <NavLink 
                        className="nav-item nav-link"
                        to="/dialogs">
                        Диалоги
                    </NavLink>
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