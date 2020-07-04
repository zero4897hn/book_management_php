@extends('layouts.app')

@section('content')
<table class="table">
    <thead class="thead-light">
        <tr>
            <th scope="col" style="width: 5%">#</th>
            <th scope="col" style="width: 10%">Avatar</th>
            <th scope="col" style="width: 20%">Tên đăng nhập</th>
            <th scope="col" style="width: 25%">Email</th>
            <th scope="col" style="width: 15%">Vai trò</th>
            <th scope="col" style="width: 10%;">Trạng thái</th>
            <th scope="col" style="width: 15%"></th>
        </tr>
    </thead>
    <tbody>
        <?php $index = 1; ?>
        @foreach ($users as $user)
        <tr>
            <th scope="row">{{ ($users->currentPage() - 1) * $users->perPage() + $index }}</th>
            <td>
                @if (isset($user->avatar))
                    <img class="img-fluid" src="{{ asset('files/avatars/' + $user->avatar) }}" />
                @else
                    <img class="img-fluid" src="{{ asset('files/avatars/anonymous_avatar.png') }}" />
                @endif
            </td>
            <td>{{ $user->username }}</td>
            <td>{{ $user->email }}</td>
            <td>
                @if ($user->admin)
                    Quản trị
                @else
                    Người dùng
                @endif
            </td>
            <td>
                @if ($user->banned)
                    Đang khóa
                @else
                    Đang mở
                @endif
            </td>
            <td>
                @if ($user->banned)
                    <button
                        class="btn btn-warning button_unblock"
                        data-id="{{ $user->id }}"
                        data-toggle="modal"
                        data-target="#confirm-unblock-modal"
                    >
                        <i class="fas fa-lock-open"></i>
                    </button>
                @else
                    <button
                        class="btn btn-warning button_block"
                        data-id="{{ $user->id }}"
                        data-toggle="modal"
                        data-target="#confirm-block-modal"
                    >
                        <i class="fas fa-lock"></i>
                    </button>
                @endif
            </td>
        </tr>
        @endforeach
    </tbody>
</table>

@include('users.block');
@include('users.unblock');
{{ $users->onEachSide(5)->links() }}
@endsection

@section('footer')
<script type="text/javascript">
    jQuery('#confirm-block-modal, #confirm-unblock-modal').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget);
        var userId = button.data('id');
        var modal = $(this);
        modal.find('#field_user_id').val(userId);
    })
</script>
@endsection
