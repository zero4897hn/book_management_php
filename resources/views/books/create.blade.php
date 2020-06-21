@extends('layouts.app')

@section('content')
<form>
    <div class="form-group">
        <label for="field_name">Tên cuốn sách</label>
        <input type="text" class="form-control" id="field_name" name="name" maxlength="50">
    </div>
    <div class="form-group">
        <label for="field_isbn">Mã cuốn sách</label>
        <input type="text" class="form-control" id="field_isbn" name="isbn" maxlength="50">
    </div>
    <div class="form-group">
        <label for="field_author">Tác giả</label>
        <input type="text" class="form-control" id="field_author" name="author" maxlength="50">
    </div>
    <div class="form-group">
        <label for="field_publisher">Nhà xuất bản</label>
        <input type="text" class="form-control" id="field_publisher" name="publisher" maxlength="50">
    </div>
    <div class="form-group">
        <label for="field_editor">Nhà biên tập</label>
        <input type="text" class="form-control" id="field_editor" name="editor" maxlength="50">
    </div>
    {{-- <div class="form-group">
        <label for="exampleFormControlSelect1">Example select</label>
        <select class="form-control" id="exampleFormControlSelect1">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
        </select>
    </div> --}}
    <div class="form-group">
        <label for="field_description">Mô tả cuốn sách</label>
        <textarea class="form-control" id="field_description" name="description" rows="5"></textarea>
    </div>
</form>
@endsection
