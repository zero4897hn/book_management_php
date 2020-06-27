@extends('layouts.app')

@section('content')
<div class="row mt-3 mb-3">
    <div class="col-2">
        <img
            src="{{asset('files/avatars/' . $book->user->avatar)}}"
            class="img-fluid img-thumbnail"
            onError="this.onerror=null;this.src='{{asset('files/avatars/anonymous_avatar.png')}}';"
        />
        <h3 class="text-center">{{$book->user->username}}</h3>
    </div>
    <div class="col-10 p-0">
        <h3>{{$book->name}}</h3>
        <img class="img-fluid" src="{{asset('files/covers/'.$book->cover)}}" />
        {{$book->description}}
    </div>
</div>

<div class="row mt-3 mb-3">
    <div class="col-sm-12">
        @foreach ($book->comments as $comment)
        <div class="row">
            <div class="col-sm-4">
                <img class="img-fluid img-thumbnail" src="{{asset('files/avatars/' + $comment->user->avatar)}}" />
                <h4>{{$comment->user->username}}</h4>
                <input type="hidden" value="{{$comment->id}}" />
            </div>
            <div class="col-sm-6">
                <div class="card">
                    <div class="card-body">
                      <h5 class="card-title">{{$comment->title}}</h5>
                      <p class="card-text">{{$$comment->content}}</p>
                    </div>
                  </div>
            </div>
        </div>
        @endforeach
    </div>
    <div class="col-sm-12">
        <div class="col-12">
            <form>
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
                        required></textarea>
                </fieldset>
                <button style="float: right;" class="btn btn-primary">Đánh giá</button>
            </form>
        </div>
    </div>
</div>
@endsection

@section('footer')
<script type="text/javascript">

</script>
@endsection
