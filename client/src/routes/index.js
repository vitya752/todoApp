import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import TodoPage from 'pages/TodoPage';
import AuthPage from 'pages/AuthPage';
import ChatPage from 'pages/ChatPage';
import DialogsPage from 'pages/DialogsPage';
import SettingsPage from 'pages/SettingsPage';

const routesRender = (isAuth) => {
    if(isAuth) {
        return (
            <Switch>
                <Route path="/todo" exact>
                    <TodoPage />
                </Route>
                <Route path="/chat" exact>
                    <ChatPage />
                </Route>
                <Route path="/settings" exact>
                    <SettingsPage />
                </Route>
                <Route path="/dialogs" exact>
                    <DialogsPage />
                </Route>
                <Redirect to="/todo" />
            </Switch>
        )
    } else {
        return (
            <Switch>
                <Route path="/auth" exact>
                    <AuthPage />
                </Route>
                <Redirect to="/auth" />
            </Switch>
        )
    }
};

export default routesRender;