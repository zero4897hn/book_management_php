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
                @if ($book->own)
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

<div class="row mt-3 mb-3 p-3 border border-secondary rounded">
    <div class="col-sm-12">
        <h2>Bình luận</h2>
    </div>
    <div id="field_comment" class="col-sm-12">
        @foreach ($book->comments as $comment)
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
                        <button
                            class="btn btn-outline-secondary btn-sm float-right edit-comment"
                            data-toggle="modal"
                            data-target="#modal-edit-comment"
                        >
                            <i class="fas fa-edit"></i>
                        </button>
                    </div>
                    <div class="card-body comment-content">{{$comment->content}}</div>
                </div>
            </div>
        </div>
        @endforeach
    </div>
    <div class="col-sm-12 mt-3">
        <div class="col-12">
            @guest
            <h6>Vui lòng <a style="text-decoration: none;" href="/login">đăng nhập</a> để bình luận sách.</h6>
            @else
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
            @endguest
        </div>
    </div>
</div>
@endsection

@section('footer')
@include('comments.edit')
<script type="text/javascript">
jQuery(document).ready(function() {
    jQuery('button#button_comment').click(function(event) {
        event.preventDefault();
        jQuery.ajax({
            url: '/comments',
            type: 'POST',
            dataType: 'json',
            data: {
                title: jQuery('input#field_title').val(),
                content: jQuery('textarea#field_content').val(),
                bookId: jQuery('input#field_bookId').val()
            },
            headers: {
                'X-CSRF-TOKEN': jQuery('meta[name="csrf-token"]').attr('content')
            },
            success: function(data) {
                var avatarUrl = '{{ URL::asset('files/avatars') }}';
                var commentField = `
                    <div class="row custom-comment">
                        <div class="col-sm-2">
                            <img class="img-fluid img-thumbnail" src="${
                                data.user_avatar !== null?
                                avatarUrl + '/' + data.user_avatar : avatarUrl + '/' + 'anonymous_avatar.png'
                            }" />
                            <h5 class="text-center">${data.username}</h5>
                        </div>
                        <div class="col-sm-10">
                            <input class="comment-id" type="hidden" value="${data.id}" />
                            <div class="card">
                                <div class="card-header">
                                    <span class="comment-title">${data.title}</span>
                                    <button
                                        class="btn btn-outline-secondary btn-sm float-right edit-comment"
                                        data-toggle="modal"
                                        data-target="#modal-edit-comment"
                                    >
                                        <i class="fas fa-edit"></i>
                                    </button>
                                </div>
                                <div class="card-body comment-content">${data.content}</div>
                            </div>
                        </div>
                    </div>
                `;
                jQuery('div#field_comment').append(commentField);
                jQuery('input#field_title').val('');
                jQuery('textarea#field_content').val('');
            }
        });
    });
    jQuery('button.edit-comment').click(function(event) {
        var modal = jQuery('div#modal-edit-comment');
        var titleField = modal.find('input#editField_title');
        var contentField = modal.find('textarea#editField_content');
        var bookIdField = modal.find('input#editField_bookId');
        var submitButton = modal.find('button#button_update');

        titleField.val('');
        contentField.val('');
        bookIdField.val('');
        //  Disable the submit button until the data is gotten
        submitButton.prop('disabled', true);

        var commentElements = jQuery('.custom-comment');

        //  Get element planning to edit
        var parentElement = jQuery(this).closest('div.custom-comment');
        //  Get id of comment
        var commentId = parentElement.find('input.comment-id').attr('value');
        //  Flag that we are planning to edit this element
        parentElement.addClass('comment-is-editing');
        //  Remove other flags
        commentElements.not(parentElement).removeClass('comment-is-editing');

        jQuery.ajax({
            url: '/comments/' + commentId,
            type: 'GET',
            success: function(data) {
                //  Now the data is gotten, enable the submit button.
                submitButton.prop('disabled', false);
                var modal = jQuery('div#modal-edit-comment');
                titleField.val(data.title);
                contentField.val(data.content);
                bookIdField.val(data.id);
            }
        });
    });
});
</script>
@endsection
