@extends('layouts.app')

@section('content')
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
            <td><img class="img-fluid" src="{{ asset('file/cover/' . $book->cover) }}" /></td>
            <td><a href="/books/{{ $book->id }}">{{$book->name}}</a></td>
            <td>{{$book->author}}</td>
            <td>
                <span>Lượt bình luận: {{$book->comment_count}}</span> <br />
                <span>Đánh giá: {{$book->rating}}</span> <br />
                <span>Người đăng: {{$book->user->username}}
            </td>
        </tr>
        <?php $index++; ?>
        @endforeach
    </tbody>
</table>

{{ $books->onEachSide(5)->links() }}
@endsection
