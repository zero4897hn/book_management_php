<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    <title>Document</title>
</head>
<body>
    <div class="container">
        <div class="row">
            <div class="col-sm-12">
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
    </div>

    <script src="{{ asset('js/app.js') }}" defer></script>
</body>
</html>
