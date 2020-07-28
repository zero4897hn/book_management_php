import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import authenticationActions from '../actions/authenticationActions';
import toastActions from '../actions/toastActions';

const RegisterPage = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState(null);
    const [isSaving, setIsSaving] = useState(false);

    const { authenticationReducer, register, resetState, showSuccessToast } = props;
    const { registerResponse } = authenticationReducer;

    const history = useHistory();

    useEffect(() => {
        const { success, errors } = registerResponse;
        if (success) {
            showSuccessToast('Đăng ký thành công.');
            history.push('/');
            resetState();
        } else if (success === false) {
            setErrors(errors);
        }
        setIsSaving(false);
    }, [registerResponse])

    const onSubmitRegister = (event) => {
        setIsSaving(true);
        event.preventDefault();
        setErrors(null);
        register({ username, password, email, 'password_confirmation': confirmPassword });
    }

    return (
        <div className="container">
            <div className="row justify-content-sm-center">
                <div className="col-sm-6">
                    <form onSubmit={(event) => onSubmitRegister(event)}>
                        <div className="form-group">
                            <label htmlFor="field_username">Tên đăng nhập</label>
                            <input
                                type="text"
                                className="form-control"
                                id="field_username"
                                name="username"
                                value={username}
                                onChange={(event) => {setUsername(event.target.value)}}
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
                                onChange={(event) => {setPassword(event.target.value)}}
                            />
                            <div className="text-danger" role="alert">
                                {errors && errors.password && errors.password[0]}
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="field_password_confirmation">Xác nhận mật khẩu</label>
                            <input
                                type="password"
                                className="form-control"
                                id="field_password_confirmation"
                                name="password_confirmation"
                                value={confirmPassword}
                                onChange={(event) => {setConfirmPassword(event.target.value)}}
                            />
                            <div className="text-danger" role="alert">
                                {errors && errors.password_confirmation && errors.password_confirmation[0]}
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="field_email">Email</label>
                            <input
                                type="text"
                                className="form-control"
                                id="field_email"
                                name="email"
                                value={email}
                                onChange={(event) => {setEmail(event.target.value)}}
                            />
                            <div className="text-danger" role="alert">
                                {errors && errors.email && errors.email[0]}
                            </div>
                        </div>
                        <button type="submit" disabled={isSaving} className="btn btn-primary">Đăng ký</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    authenticationReducer: state.authenticationReducer,
})

const mapDispatchToProps = (dispatch) => ({
    register: (data) => dispatch(authenticationActions.register(data)),
    showSuccessToast: (data) => dispatch(toastActions.showSuccessToast(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);
