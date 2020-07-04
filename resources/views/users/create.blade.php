@extends('layouts.app')

@section('content')
<div class="row justify-content-sm-center">
    <div class="col-sm-6">
        <form action="/users" method="POST" enctype="multipart/form-data">
            @csrf
            <div class="form-group">
                <label for="field_first_name">Tên</label>
                <input
                    type="text"
                    class="form-control"
                    id="field_first_name"
                    name="first_name"
                >
                @error('first_name')
                <div class="text-danger" role="alert">
                    {{$message}}
                </div>
                @enderror
            </div>
            <div class="form-group">
                <label for="field_last_name">Họ</label>
                <input
                    type="text"
                    class="form-control"
                    id="field_last_name"
                    name="last_name"
                >
                @error('last_name')
                <div class="text-danger" role="alert">
                    {{$message}}
                </div>
                @enderror
            </div>
            <div class="form-group">
                <label for="field_username">Tên đăng nhập</label>
                <input
                    type="text"
                    class="form-control"
                    id="field_username"
                    name="username"
                >
                @error('username')
                <div class="text-danger" role="alert">
                    {{$message}}
                </div>
                @enderror
            </div>
            <div class="form-group">
                <label for="field_password">Mật khẩu</label>
                <input
                    type="password"
                    class="form-control"
                    id="field_password"
                    name="password"
                >
                @error('password')
                <div class="text-danger" role="alert">
                    {{$message}}
                </div>
                @enderror
            </div>
            <div class="form-group">
                <label for="field_email">Email</label>
                <input
                    type="text"
                    class="form-control"
                    id="field_email"
                    name="email"
                >
                @error('email')
                <div class="text-danger" role="alert">
                    {{$message}}
                </div>
                @enderror
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
                <input type="file" class="form-control-file" id="field_avatar" name="avatarFile">
            </div>
            <button type="submit" class="btn btn-primary">Thêm mới</button>
        </form>
    </div>
</div>
@endsection
