@extends('layouts.app')

@section('content')
<form id="#searchForm" method="GET" action="/books">
    @csrf
    <div class="row">
        <div class="col-md-2">
            <label class="col-form-label" for="searchField_name">Tên sách</label>
        </div>
        <div class="col-md-4">
            <input type="text" class="form-control" name="name" id="searchField_name" />
        </div>
        <div class="col-md-2">
            <label class="col-form-label" for="searchField_author">Tác giả</label>
        </div>
        <div class="col-md-4">
            <input type="text" class="form-control" name="author" id="searchField_author" />
        </div>
    </div>
    <div class="row justify-content-center mt-2">
        <div class="col-4 d-flex justify-content-center">
            <button class="btn btn-info" type="submit">Tìm kiếm</button>
        </div>
    </div>
</form>
<div class="row mt-3">
    <div class="col-12">
        <table class="table">
            <thead class="thead-light">
                <tr>
                    <th scope="col" style="width: 5%">#</th>
                    <th scope="col" style="width: 10%">Bìa sách</th>
                    <th scope="col" style="width: 40%">Tên sách</th>
                    <th scope="col" style="width: 25%">Tác giả</th>
                    <th scope="col" style="width: 20%"></th>
                </tr>
            </thead>
            <tbody>
                <?php $index = 1; ?>
                @foreach ($books as $book)
                <tr>
                    <th scope="row">{{ ($books->currentPage() - 1) * $books->perPage() + $index }}</th>
                    <td><img class="img-fluid" src="{{ asset('files/covers/' . $book->cover) }}" /></td>
                    <td><a href="/books/{{ $book->id }}">{{$book->name}}</a></td>
                    <td>{{$book->author}}</td>
                    <td>
                        <span>Lượt bình luận: {{$book->comment_count}}</span> <br />
                        <span>Đánh giá: {{$book->rating}}</span> <br />
                        <span>Người đăng: {{$book->username}}</span>
                    </td>
                </tr>
                <?php $index++; ?>
                @endforeach
            </tbody>
        </table>
    </div>
</div>

{{ $books->onEachSide(5)->links() }}
@endsection
