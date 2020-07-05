@extends('layouts.app')

@section('content')
<div class="row justify-content-sm-center">
    <div class="col-sm-6">
        <form action="" method="POST">
            @csrf
            <div class="form-group">
                <label for="field_username">Tên đăng nhập</label>
                <input
                    type="text"
                    class="form-control"
                    id="field_username"
                    name="username"
                >
                @if (session('usernameError'))
                <div class="text-danger" role="alert">
                    {{session('usernameError')}}
                </div>
                @endif
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
                <label for="field_password_confirmation">Xác nhận mật khẩu</label>
                <input
                    type="password"
                    class="form-control"
                    id="field_password_confirmation"
                    name="password_confirmation"
                >
                @error('password_confirmation')
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
            <button type="submit" class="btn btn-primary">Đăng ký</button>
        </form>
    </div>
</div>
@endsection

