@extends('layouts.app')

@section('content')
<div class="row justify-content-sm-center">
    <div class="col-sm-10">
        <form action="/books/{{ $book->id }}" method="post" enctype="multipart/form-data">
            @csrf
            @method('PUT')
            <div class="form-group">
                <label for="field_name">Tên cuốn sách</label>
                <input
                    type="text"
                    class="form-control"
                    id="field_name"
                    name="name"
                    maxlength="50"
                    value="{{ $book->name }}"
                >
                @error('name')
                <div class="text-danger" role="alert">
                    {{$message}}
                </div>
                @enderror
            </div>
            <div class="form-group">
                <label for="field_isbn">Mã cuốn sách</label>
                <input
                    type="text"
                    class="form-control"
                    id="field_isbn"
                    name="isbn"
                    maxlength="50"
                    value="{{ $book->isbn }}"
                >
                @error('isbn')
                <div class="text-danger" role="alert">
                    {{$message}}
                </div>
                @enderror
            </div>
            <div class="form-group">
                <label for="field_author">Tác giả</label>
                <input
                    type="text"
                    class="form-control"
                    id="field_author"
                    name="author"
                    maxlength="50"
                    value="{{ $book->author }}"
                >
                @error('author')
                <div class="text-danger" role="alert">
                    {{$message}}
                </div>
                @enderror
            </div>
            <div class="form-group">
                <label for="field_publisher">Nhà xuất bản</label>
                <input
                    type="text"
                    class="form-control"
                    id="field_publisher"
                    name="publisher"
                    maxlength="50"
                    value="{{ $book->publisher }}"
                >
                @error('publisher')
                <div class="text-danger" role="alert">
                    {{$message}}
                </div>
                @enderror
            </div>
            <div class="form-group">
                <label for="field_editor">Nhà biên tập</label>
                <input
                    type="text"
                    class="form-control"
                    id="field_editor"
                    name="editor"
                    maxlength="50"
                    value="{{ $book->editor }}"
                >
                @error('editor')
                <div class="text-danger" role="alert">
                    {{$message}}
                </div>
                @enderror
            </div>
            <div class="form-group">
                <label for="field_description">Mô tả cuốn sách</label>
                <textarea
                    class="form-control"
                    id="field_description"
                    name="description"
                    rows="5"
                >{{ $book->description }}</textarea>
            </div>
            <div class="form-group">
                <label for="field_cover">Bìa sách</label>
                <img class="img-fluid" style="max-width: 200px;" src="{{ asset('files/covers/'.$book->cover) }}" />
                <input type="file" class="form-control-file" id="field_cover" name="coverFile">
            </div>
            <button type="submit" class="btn btn-primary">Cập nhật</button>
        </form>
    </div>
</div>
@endsection
