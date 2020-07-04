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
<div class="row mt-3 mb-3 p-3 border border-secondary rounded">
    <div class="col-12">
        <h5>Sách của {{$user->username}}</h5>
    </div>
    <div class="col-12">
        <table class="table">
            <thead class="thead-light">
                <tr>
                    <th scope="col" style="width: 5%">#</th>
                    <th scope="col" style="width: 10%">Bìa sách</th>
                    <th scope="col" style="width: 35%">Tên sách</th>
                    <th scope="col" style="width: 20%">Tác giả</th>
                    <th scope="col" style="width: 20%"></th>
                    <th scope="col" style="width: 10%"></th>
                </tr>
            </thead>
            <tbody>
                <?php $index = 1; ?>
                @foreach ($user->books as $book)
                <tr>
                    <th scope="row">{{ $index }}</th>
                    <td><img class="img-fluid" src="{{ asset('files/covers/' . $book->cover) }}" /></td>
                    <td><a href="/books/{{ $book->id }}">{{$book->name}}</a></td>
                    <td>{{$book->author}}</td>
                    <td>
                        <span>Lượt bình luận: {{$book->comment_count}}</span> <br />
                        <span>Đánh giá: {{$book->rating}}</span> <br />
                    </td>
                    <td>
                        <a class="btn btn-primary btn-sm" href="/books/{{$book->id}}/edit">
                            <i class="far fa-edit"></i>
                        </a>
                        <button
                            class="btn btn-danger btn-sm"
                            data-id="{{$book->id}}"
                            data-toggle="modal"
                            data-target="#confirm-delete-book-modal"
                        >
                            <i class="far fa-trash-alt"></i>
                        </button>
                    </td>
                </tr>
                <?php $index++; ?>
                @endforeach
            </tbody>
        </table>
    </div>
</div>
@endsection

@section('footer')
@include('books.delete')
@endsection
