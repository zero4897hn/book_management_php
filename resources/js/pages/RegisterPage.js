import React from 'react';

const RegisterPage = () => {
    return (
        <div>
            <div className="row justify-content-sm-center">
                <div className="col-sm-6">
                    <form>
                        <div className="form-group">
                            <label htmlFor="field_username">Tên đăng nhập</label>
                            <input
                                type="text"
                                className="form-control"
                                id="field_username"
                                name="username"
                                value="{{ old('username') }}"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="field_password">Mật khẩu</label>
                            <input
                                type="password"
                                className="form-control"
                                id="field_password"
                                name="password"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="field_password_confirmation">Xác nhận mật khẩu</label>
                            <input
                                type="password"
                                className="form-control"
                                id="field_password_confirmation"
                                name="password_confirmation"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="field_email">Email</label>
                            <input
                                type="text"
                                className="form-control"
                                id="field_email"
                                name="email"
                                value="{{ old('email') }}"
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Đăng ký</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;
