import React, { useState } from 'react';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div className="container">
            <div className="row justify-content-sm-center">
                <div className="col-sm-4">
                    <div className="card" style={{ width: '18rem' }}>
                        <div className="card-body">
                            <form>
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
                                </div>
                                <button type="submit" className="btn btn-primary">Đăng nhập</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
