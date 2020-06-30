@extends('layouts.app')

@section('content')
<div class="row mt-3 mb-3 p-3 border border-secondary rounded">
    <div class="col-2">
        @if (isset($user->avatar))
        <img
            src="{{asset('files/avatars/' . $user->avatar)}}"
            class="img-fluid img-thumbnail"
            onError="this.onerror=null;this.src='{{asset('files/avatars/anonymous_avatar.png')}}';"
        />
        @else
        <img class="img-fluid img-thumbnail" src="{{ asset('files/avatars/anonymous_avatar.png') }}" />
        @endif
        <h3 class="text-center">{{$user->username}}</h3>
    </div>
    <div class="col-10 p-0">
        <div class="card">
            <div class="card-header">
                <span>Thông tin cá nhân</span>
            </div>
            <div class="card-body">
                <table class="table table-bordered">
                    <tr>
                        <td><b>Họ và tên: </b></td>
                        <td>{{$user->last_name . ' ' . $user->first_name}}</td>
                    </tr>
                    <tr>
                        <td><b>Email: </b></td>
                        <td>{{$user->email}}</td>
                    </tr>
                    <tr>
                        <td><b>Vai trò: </b></td>
                        <td>
                            @if ($user->admin)
                                Quản trị
                            @else
                                Người dùng
                            @endif
                        </td>
                    </tr>
                    <tr>
                        <td><b>Trạng thái: </b></td>
                        <td>
                            @if ($user->banned)
                                Đang khóa
                            @else
                                Đang mở
                            @endif
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
</div>
@endsection

@section('footer')
@include('comments.edit')
<script type="text/javascript">

</script>
@endsection
