@extends('layouts.app')

@section('content')
<div class="row mt-3 mb-3 p-3 border border-secondary rounded">
    <div class="col-2">
        <img
            src="{{asset('files/avatars/' . $book->user->avatar)}}"
            class="img-fluid img-thumbnail"
            onError="this.onerror=null;this.src='{{asset('files/avatars/anonymous_avatar.png')}}';"
        />
        <h3 class="text-center">{{$book->user->username}}</h3>
    </div>
    <div class="col-10 p-0">
        <div class="card">
            <div class="card-header">
                <span>{{$book->name}}</span>
                @if (null !== $currentUser && ($currentUser->admin || $book->user_id == $currentUser->id))
                <a
                    class="btn btn-outline-secondary btn-sm float-right edit-comment"
                    href="/books/{{$book->id}}/edit"
                >
                    <i class="fas fa-edit"></i>
                </a>
                @endif
            </div>
            <div class="card-body">
                <div style="width: 100%; display: flex;">
                    <img style="margin: auto;" class="img-fluid" src="{{asset('files/covers/'.$book->cover)}}" />
                </div>
                <div style="white-space: pre-line">
                    {{$book->description}}
                </div>
            </div>
        </div>
        <h3></h3>
    </div>
</div>

@if (null !== $currentUser && ($book->user_id != $currentUser->id))
<style>
    i.button-rating.checked {
        color: orange;
    }
</style>
<div class="row mt-3 mb-3 p-3 border border-secondary rounded">
    <div class="col-sm-12">
        <h2>Đánh giá</h2>
    </div>
    <div class="col-sm-12">
        <div class="row">
            <div class="col-md-2">Bản thân:</div>
            <div class="col-md-10">
                @if (null !== $currentUserRating)
                    @for ($i = 0; $i < $currentUserRating->rating; $i++)
                    <i class="fas fa-star checked button-rating" style="cursor: pointer" data-value="{{ $i + 1 }}"></i>
                    @endfor
                    @for ($i = 0; $i < 5 - $currentUserRating->rating; $i++)
                    <i
                        class="fas fa-star button-rating"
                        style="cursor: pointer"
                        data-value="{{ $i + $currentUserRating->rating + 1 }}"
                    ></i>
                    @endfor
                    <form action="/rating" method="POST" style="display: inline;">
                        @csrf
                        <input type="hidden" name="id" value="{{$currentUserRating->id}}" />
                        <input type="hidden" name="book_id" value="{{$book->id}}" />
                        <input type="hidden" name="rating" id="field_rating" value="{{$currentUserRating->rating}}" />
                        <button class="btn btn-primary">Đánh giá</button>
                    </form>
                @else
                <i class="fas fa-star button-rating" style="cursor: pointer" data-value="1"></i>
                <i class="fas fa-star button-rating" style="cursor: pointer" data-value="2"></i>
                <i class="fas fa-star button-rating" style="cursor: pointer" data-value="3"></i>
                <i class="fas fa-star button-rating" style="cursor: pointer" data-value="4"></i>
                <i class="fas fa-star button-rating" style="cursor: pointer" data-value="5"></i>
                <form action="/rating" method="POST" style="display: inline;">
                    @csrf
                    <input type="hidden" name="book_id" value="{{$book->id}}" />
                    <input type="hidden" name="rating" id="field_rating" value="0" />
                    <button class="btn btn-primary">Đánh giá</button>
                </form>
                @endif
            </div>
        </div>
        <div class="row">
            <div class="col-md-2">Tổng đánh giá:</div>
            <div class="col-md-10">{{ $book->rating }}</div>
        </div>
        <form action=""></form>
    </div>
</div>
@endif

<div class="row mt-3 mb-3 p-3 border border-secondary rounded">
    <div class="col-sm-12">
        <h2>Bình luận</h2>
    </div>
    <div id="field_comment" class="col-sm-12">
        @forelse ($book->comments as $comment)
        <div class="row custom-comment">
            <div class="col-sm-2">
                @if (isset($comment->user->avatar))
                    <img class="img-fluid img-thumbnail" src="{{ asset('files/avatars/' + $comment->user->avatar) }}" />
                @else
                    <img class="img-fluid img-thumbnail" src="{{ asset('files/avatars/anonymous_avatar.png') }}" />
                @endif
                <h5 class="text-center">{{$comment->user->username}}</h5>
            </div>
            <div class="col-sm-10">
                <input class="comment-id" type="hidden" value="{{$comment->id}}" />
                <div class="card">
                    <div class="card-header">
                        <span class="comment-title">{{$comment->title}}</span>
                        @if (null !== $currentUser && ($currentUser->admin || $comment->user_id == $currentUser->id))
                        <div class="float-right">
                            <button
                                class="btn btn-outline-secondary btn-sm edit-comment"
                                data-toggle="modal"
                                data-target="#modal-edit-comment"
                            >
                                <i class="fas fa-edit"></i>
                            </button>
                            <button
                                class="btn btn-outline-danger btn-sm"
                                data-id="{{$comment->id}}"
                                data-toggle="modal"
                                data-target="#confirm-delete-comment-modal"
                            >
                                <i class="far fa-trash-alt"></i>
                            </button>
                        </div>
                        @endif
                    </div>
                    <div class="card-body comment-content">{{$comment->content}}</div>
                </div>
            </div>
        </div>
        @empty
        <div class="row custom-comment no-one-comment">
            <div class="col-12">
                <h4 class="text-center no-one-comment">Hiện tại chưa có bình luận</h4>
            </div>
        </div>
        @endforelse
    </div>
    <div class="col-sm-12 mt-3">
        <div class="col-12">
            @guest
            <h6>Vui lòng <a style="text-decoration: none;" href="/login">đăng nhập</a> để bình luận sách.</h6>
            @else
                @if ($book->user_id != $currentUser->id)
                <form>
                    <input type="hidden" id="field_bookId" value="{{ $book->id }}" />
                    <fieldset class="form-group">
                        <label for="field_title">Tiêu đề:</label>
                        <input
                            id="field_title"
                            type="text"
                            class="form-control"
                            placeholder="Nhập tiêu đề"
                            name="title"
                            required
                        />
                    </fieldset>
                    <fieldset class="form-group">
                        <label for="field_content">Nội dung:</label>
                        <textarea
                            class="form-control"
                            rows="3"
                            placeholder="Nhập Nội dung"
                            id="field_content"
                            name="content"
                            required
                        ></textarea>
                    </fieldset>
                    <button type="submit" id="button_comment" class="btn btn-primary float-right">Bình luận</button>
                </form>
                @endif
            @endguest
        </div>
    </div>
</div>
@endsection

@section('footer')
@include('comments.edit')
@include('comments.delete')
@include('script.book-comment')
@include('script.edit-comment')
@include('script.rating');
@endsection
