@extends('layouts.app')

@section('content')
<div class="row justify-content-sm-center">
    <div class="col-sm-6">
        <form action="/users/{{ $user->id }}" method="POST" enctype="multipart/form-data">
            @csrf
            @method('PUT')
            <div class="form-group">
                <label for="field_first_name">Tên</label>
                <input
                    type="text"
                    class="form-control"
                    id="field_first_name"
                    name="first_name"
                    value="{{ $user->first_name }}"
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
                    value="{{ $user->last_name }}"
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
                    readonly
                    value="{{ $user->username }}"
                >
                @error('username')
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
                    value="{{ $user->email }}"
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
                    @if ($user->admin)
                    <option value="1" selected>Quản trị</option>
                    <option value="0">Người dùng</option>
                    @else
                    <option value="1">Quản trị</option>
                    <option value="0" selected>Người dùng</option>
                    @endif
                </select>
                @if (session('adminError'))
                <div class="text-danger" role="alert">
                    {{session('adminError')}}
                </div>
                @endif
            </div>
            <div class="form-group">
                <label for="field_avatar">Avatar</label>
                <img class="img-fluid" style="max-width: 200px;" src="{{ asset('files/avatars/'.$user->avatar) }}" />
                <input type="file" class="form-control-file" id="field_avatar" name="avatarFile">
            </div>
            <button type="submit" class="btn btn-primary">Cập nhật</button>
        </form>
    </div>
</div>
@endsection
