import React from 'react';
import InputGroup from '../templates/InputGroup/InputGroup';

const Settings = ({ token, email, nickname, avatar, changeHandler, updateSettingsThunk, deleteAccThunk }) => {
    return (
        <div className="settings mt-3">
            <ul className="list-group list-group--emptyborder" >
                <li className="list-group-item">
                    <InputGroup 
                        caption={'Email'}
                        value={email ? email : ''}
                        name={'email'}
                        readonly={true} />
                </li>
                <li className="list-group-item">
                    <InputGroup 
                        caption={'Никнэйм'}
                        handler={changeHandler}
                        value={nickname ? nickname : ''}
                        name={'nickname'} />
                </li>
                <li className="list-group-item">
                    <InputGroup 
                        caption={'Ссылка на аватар'}
                        handler={changeHandler}
                        value={avatar ? avatar : ''}
                        name={'avatar'} />
                </li>
                <li className="list-group-item">
                    <button onClick={() => updateSettingsThunk({token, nickname, avatar})} className="btn btn-primary float-right">Сохранить</button>
                </li>
                <li className="list-group-item">
                    <button onClick={() => deleteAccThunk({token})} className="btn btn-sm btn-danger">Удалить аккаунт</button>
                </li>
            </ul>             
        </div>
    )
};

export default Settings;