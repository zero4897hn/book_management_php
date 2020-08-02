import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import authenticationActions from '../actions/authenticationActions';
import { useHistory } from 'react-router-dom';

const LoginPage = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState(null);
    const [isLogingIn, setLogingIn] = useState(false);

    const { authenticationReducer, login, getUserData } = props;
    const { loginResponse, isLogin, userData } = authenticationReducer;

    const history = useHistory();

    useEffect(() => {
        const { errors } = loginResponse;
        if (isLogin) {
            if (!userData) getUserData();
        } else if (isLogin === false) {
            setErrors(errors);
            setLogingIn(false);
        }
    }, [loginResponse])

    useEffect(() => {
        if (userData) {
            setLogingIn(false);
            history.goBack();
        }
    }, [userData])

    const onSubmitLogin = (event) => {
        setLogingIn(true);
        event.preventDefault();
        setErrors(null);
        login({ username, password });
    }

    return (
        <div className="container">
            <div className="row justify-content-sm-center">
                <div className="col-sm-4">
                    <div className="card" style={{ width: '18rem' }}>
                        <div className="card-body">
                            <form onSubmit={(event) => onSubmitLogin(event)}>
                                <div className="form-group">
                                    <label htmlFor="field_username">Tên đăng nhập</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="field_username"
                                        name="username"
                                        value={username}
                                        onChange={(event) => { setUsername(event.target.value) }}
                                    />
                                    <div className="text-danger" role="alert">
                                        {errors && errors.username && errors.username[0]}
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="field_password">Mật khẩu</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="field_password"
                                        name="password"
                                        value={password}
                                        onChange={(event) => { setPassword(event.target.value) }}
                                    />
                                    <div className="text-danger" role="alert">
                                        {errors && errors.password && errors.password[0]}
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-primary" disabled={isLogingIn}>Đăng nhập</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    authenticationReducer: state.authenticationReducer
})

const mapDispatchToProps = (dispatch) => ({
    login: (data) => dispatch(authenticationActions.login(data)),
    getUserData: () => dispatch(authenticationActions.getUserData()),
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)
