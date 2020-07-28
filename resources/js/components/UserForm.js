import React, { useState, useEffect, useRef } from 'react';

const UserForm = (props) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [admin, setAdmin] = useState('0');

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
        <div class="row justify-content-sm-center">
            <div class="col-sm-6">
                <form action="/users" method="POST" encType="multipart/form-data">
                    <div class="form-group">
                        <label for="field_first_name">Tên</label>
                        <input
                            type="text"
                            class="form-control"
                            id="field_first_name"
                            name="first_name"
                            value={firstName}
                            onChange={event => setFirstName(event.target.value)}
                        />
                    </div>
                    <div class="form-group">
                        <label for="field_last_name">Họ</label>
                        <input
                            type="text"
                            class="form-control"
                            id="field_last_name"
                            name="last_name"
                            value={lastName}
                            onChange={event => setLastName(event.target.value)}
                        />
                    </div>
                    <div class="form-group">
                        <label for="field_username">Tên đăng nhập</label>
                        <input
                            type="text"
                            class="form-control"
                            id="field_username"
                            name="username"
                            value={username}
                            onChange={event => setUsername(event.target.value)}
                        />
                    </div>
                    <div class="form-group">
                        <label for="field_password">Mật khẩu</label>
                        <input
                            type="password"
                            class="form-control"
                            id="field_password"
                            name="password"
                            value={password}
                            onChange={event => setPassword(event.target.value)}
                        />
                    </div>
                    <div class="form-group">
                        <label for="field_email">Email</label>
                        <input
                            type="text"
                            class="form-control"
                            id="field_email"
                            name="email"
                            value={email}
                            onChange={event => setEmail(event.target.value)}
                        />
                    </div>
                    <div class="form-group">
                        <label for="field_admin">Vai trò</label>
                        <select
                            class="form-control"
                            id="field_admin"
                            name="admin"
                            value={admin}
                            onChange={event => setAdmin(event.target.value)}
                        >
                            <option value="1">Quản trị</option>
                            <option value="0" selected>Người dùng</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="field_avatar">Avatar</label>
                        <input type="file" class="form-control-file" id="field_avatar" name="avatarFile" multiple ref={fileInput} />
                    </div>
                    <button type="submit" class="btn btn-primary">Thêm mới</button>
                </form>
            </div>
        </div>
    );
}

export default UserForm;
