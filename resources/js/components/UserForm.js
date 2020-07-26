import React from 'react';

const UserForm = () => {
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
                            value="{{ old('first_name') }}"
                        />
                    </div>
                    <div class="form-group">
                        <label for="field_last_name">Họ</label>
                        <input
                            type="text"
                            class="form-control"
                            id="field_last_name"
                            name="last_name"
                            value="{{ old('last_name') }}"
                        />
                    </div>
                    <div class="form-group">
                        <label for="field_username">Tên đăng nhập</label>
                        <input
                            type="text"
                            class="form-control"
                            id="field_username"
                            name="username"
                            value="{{ old('username') }}"
                        />
                    </div>
                    <div class="form-group">
                        <label for="field_password">Mật khẩu</label>
                        <input
                            type="password"
                            class="form-control"
                            id="field_password"
                            name="password"
                        />
                    </div>
                    <div class="form-group">
                        <label for="field_email">Email</label>
                        <input
                            type="text"
                            class="form-control"
                            id="field_email"
                            name="email"
                            value="{{ old('email') }}"
                        />
                    </div>
                    <div class="form-group">
                        <label for="field_admin">Vai trò</label>
                        <select class="form-control" id="field_admin" name="admin">
                            <option value="1">Quản trị</option>
                            <option value="0" selected>Người dùng</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="field_avatar">Avatar</label>
                        <input type="file" class="form-control-file" id="field_avatar" name="avatarFile"/>
                    </div>
                    <button type="submit" class="btn btn-primary">Thêm mới</button>
                </form>
            </div>
        </div>
    );
}

export default UserForm;
