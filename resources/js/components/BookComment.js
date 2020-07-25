import React from 'react';
import Border from './Border';

const BookComment = () => {
    return (
        <Border>
            <div className="col-sm-12">
                <h2>Bình luận</h2>
            </div>
            <div id="field_comment" className="col-sm-12">
                <div className="row custom-comment">
                    <div className="col-sm-2">
                        <img className="img-fluid img-thumbnail" src="{{ asset('files/avatars/' + $comment->user->avatar) }}" />
                        <img className="img-fluid img-thumbnail" src="{{ asset('files/avatars/anonymous_avatar.png') }}" />
                        <h5 className="text-center"></h5>
                    </div>
                    <div className="col-sm-10">
                        <input className="comment-id" type="hidden" value="{{$comment->id}}" />
                        <div className="card">
                            <div className="card-header">
                                <span className="comment-title"></span>
                                <div className="float-right">
                                    <button
                                        className="btn btn-outline-secondary btn-sm edit-comment"
                                    >
                                        <i className="fas fa-edit"></i>
                                    </button>
                                    <button
                                        className="btn btn-outline-danger btn-sm"
                                    >
                                        <i className="far fa-trash-alt"></i>
                                    </button>
                                </div>
                            </div>
                            <div className="card-body comment-content"></div>
                        </div>
                    </div>
                </div>
                <div className="row custom-comment no-one-comment">
                    <div className="col-12">
                        <h4 className="text-center no-one-comment">Hiện tại chưa có bình luận</h4>
                    </div>
                </div>
            </div>
            <div className="col-sm-12 mt-3">
                <div className="col-12">
                    <h6>Vui lòng <a style="text-decoration: none;" href="/login">đăng nhập</a> để bình luận sách.</h6>
                    <form>
                        <input type="hidden" id="field_bookId" value="{{ $book->id }}" />
                        <fieldset className="form-group">
                            <label htmlFor="field_title">Tiêu đề:</label>
                            <input
                                id="field_title"
                                type="text"
                                className="form-control"
                                placeholder="Nhập tiêu đề"
                                name="title"
                                required
                            />
                        </fieldset>
                        <fieldset className="form-group">
                            <label htmlFor="field_content">Nội dung:</label>
                            <textarea
                                className="form-control"
                                rows="3"
                                placeholder="Nhập Nội dung"
                                id="field_content"
                                name="content"
                                required
                            ></textarea>
                        </fieldset>
                        <button type="submit" id="button_comment" className="btn btn-primary float-right">Bình luận</button>
                    </form>
                </div>
            </div>
        </Border>
    );
}

export default BookComment;
