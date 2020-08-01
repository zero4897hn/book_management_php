import React, { useState, useEffect, useRef } from 'react';

const UserForm = (props) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [admin, setAdmin] = useState('0');
    const [errors, setErrors] = useState(null);

    const { entity = {} } = props

    const fileInput = useRef(null);

    useEffect(() => {
        const { firstName, lastName, username, email, admin } = entity;
        setFirstName(firstName);
        setLastName(lastName);
        setUsername(username);
        setEmail(email);
        setAdmin(admin);
    }, [entity])

    return (
        <div className="row justify-content-sm-center">
            <div className="col-sm-6">
                <form action="/users" method="POST" encType="multipart/form-data">
                    <div className="form-group">
                        <label htmlFor="field_first_name">Tên</label>
                        <input
                            type="text"
                            className="form-control"
                            id="field_first_name"
                            name="first_name"
                            value={firstName}
                            onChange={event => setFirstName(event.target.value)}
                        />
                        <div className="text-danger" role="alert">
                            {errors && errors.first_name && errors.first_name[0]}
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="field_last_name">Họ</label>
                        <input
                            type="text"
                            className="form-control"
                            id="field_last_name"
                            name="last_name"
                            value={lastName}
                            onChange={event => setLastName(event.target.value)}
                        />
                        <div className="text-danger" role="alert">
                            {errors && errors.last_name && errors.last_name[0]}
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="field_username">Tên đăng nhập</label>
                        <input
                            type="text"
                            className="form-control"
                            id="field_username"
                            name="username"
                            value={username}
                            onChange={event => setUsername(event.target.value)}
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
                            onChange={event => setPassword(event.target.value)}
                        />
                        <div className="text-danger" role="alert">
                            {errors && errors.password && errors.password[0]}
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
                            onChange={event => setEmail(event.target.value)}
                        />
                        <div className="text-danger" role="alert">
                            {errors && errors.email && errors.email[0]}
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="field_admin">Vai trò</label>
                        <select
                            className="form-control"
                            id="field_admin"
                            name="admin"
                            value={admin}
                            onChange={event => setAdmin(event.target.value)}
                        >
                            <option value="1">Quản trị</option>
                            <option value="0" selected>Người dùng</option>
                        </select>
                        <div className="text-danger" role="alert">
                            {errors && errors.admin && errors.admin[0]}
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="field_avatar">Avatar</label>
                        <input type="file" className="form-control-file" id="field_avatar" name="avatarFile" multiple ref={fileInput} />
                        <div className="text-danger" role="alert">
                            {errors && errors.avatar && errors.avatar[0]}
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary">Thêm mới</button>
                </form>
            </div>
        </div>
    );
}

export default UserForm;
