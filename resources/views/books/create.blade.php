@extends('layouts.app')

@section('content')
<div class="row justify-content-sm-center">
    <div class="col-sm-10">
        <form action="/books" method="POST" enctype="multipart/form-data">
            @csrf
            <div class="form-group">
                <label for="field_name">Tên cuốn sách</label>
                <input type="text" class="form-control" id="field_name" name="name" maxlength="50">
                @error('name')
                <div class="text-danger" role="alert">
                    {{$message}}
                </div>
                @enderror
            </div>
            <div class="form-group">
                <label for="field_isbn">Mã cuốn sách</label>
                <input type="text" class="form-control" id="field_isbn" name="isbn" maxlength="50">
                @error('isbn')
                <div class="text-danger" role="alert">
                    {{$message}}
                </div>
                @enderror
            </div>
            <div class="form-group">
                <label for="field_author">Tác giả</label>
                <input type="text" class="form-control" id="field_author" name="author" maxlength="50">
                @error('author')
                <div class="text-danger" role="alert">
                    {{$message}}
                </div>
                @enderror
            </div>
            <div class="form-group">
                <label for="field_publisher">Nhà xuất bản</label>
                <input type="text" class="form-control" id="field_publisher" name="publisher" maxlength="50">
                @error('publisher')
                <div class="text-danger" role="alert">
                    {{$message}}
                </div>
                @enderror
            </div>
            <div class="form-group">
                <label for="field_editor">Nhà biên tập</label>
                <input type="text" class="form-control" id="field_editor" name="editor" maxlength="50">
                @error('editor')
                <div class="text-danger" role="alert">
                    {{$message}}
                </div>
                @enderror
            </div>
            <div class="form-group">
                <label for="field_description">Mô tả cuốn sách</label>
                <textarea class="form-control" id="field_description" name="description" rows="5"></textarea>
            </div>
            <div class="form-group">
                <label for="field_cover">Bìa sách</label>
                <input type="file" class="form-control-file" id="field_cover" name="coverFile">
                @if (session('fileRequireError'))
                <div class="text-danger" role="alert">
                    {{session('fileRequireError')}}
                </div>
                @endif
            </div>
            <button type="submit" class="btn btn-primary">Giới thiệu</button>
        </form>
    </div>
</div>

@endsection
