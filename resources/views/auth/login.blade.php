@extends('layouts.app')

@section('content')
<div class="row justify-content-sm-center">
    <div class="col-sm-4">
        <div class="card" style="width: 18rem;">
            <div class="card-body">
                @if (session('error'))
                <div class="text-danger" role="alert">
                    {{session('error')}}
                </div>
                @endif
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
                    <button type="submit" class="btn btn-primary">Đăng nhập</button>
                </form>
            </div>
        </div>
    </div>
</div>
@endsection
