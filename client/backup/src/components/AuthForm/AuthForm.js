import React from 'react';

const AuthForm = ({ fetching, login, register, setAuthFormAC, fieldEmail, fieldPass }) => {

    const handleChange = (e) => {
        setAuthFormAC(e.target.name, e.target.value);
    }

    return (
        <div className="card">
            <div className="card-body">
                <form>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input 
                            id="email" 
                            name="email" 
                            type="text"
                            className="form-control"
                            value={fieldEmail}
                            onChange={handleChange}
                            />
                    </div>
                    <div className="form-group">
                        <label htmlFor="pass">Пароль</label>
                        <input 
                            id="pass" 
                            name="pass" 
                            type="password"
                            className="form-control"
                            value={fieldPass}
                            onChange={handleChange}
                            />
                    </div>
                    <button 
                        type="button"
                        onClick={login}
                        disabled={fetching}
                        className="btn btn-primary mr-3"
                        >
                        Войти
                    </button>
                    <button 
                        onClick={register}
                        disabled={fetching}
                        className="btn btn-danger"
                        >
                        Регистрация
                    </button>
                </form>
            </div>
        </div>
    )
};

export default AuthForm;

// export default reduxForm({
//     form: 'login'
// })(AuthForm);