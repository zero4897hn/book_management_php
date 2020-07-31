import React from 'react';
import Border from './Border';
import { connect } from 'react-redux';
import { FaEdit, FaTrash } from 'react-icons/fa'
import { isEmpty } from 'lodash';

const BookComment = (props) => {
    const { bookReducer, authenticationReducer } = props

    const { book } = bookReducer;
    const { comments = [] } = book;

    const { isLogin } = authenticationReducer;

    const renderedComments = comments.map((comment, index) => {
        return (
            <div className="row" key={index}>
                <div className="col-sm-2">
                    {comment.userAvatar ?
                        <img
                            src={`/files/avatars/${comment.userAvatar}`}
                            className="img-fluid img-thumbnail"
                        />
                        :
                        <img
                            src="/files/avatars/anonymous_avatar.png"
                            className="img-fluid img-thumbnail"
                        />
                    }
                    <h5 className="text-center">{comment.username}</h5>
                </div>
                <div className="col-sm-10">
                    <div className="card">
                        <div className="card-header">
                            <span>{comment.title}</span>
                            <div className="float-right">
                                <button
                                    className="btn btn-outline-secondary btn-sm edit-comment"
                                >
                                    <FaEdit />
                                </button>
                                <button
                                    className="btn btn-outline-danger btn-sm"
                                >
                                    <FaTrash />
                                </button>
                            </div>
                        </div>
                        <div className="card-body">{comment.content}</div>
                    </div>
                </div>
            </div>
        )
    })

    return (
        <Border>
            <div className="col-sm-12">
                <h2>Bình luận</h2>
            </div>
            <div id="field_comment" className="col-sm-12">
                {isEmpty(comments) ? (
                    <div className="row custom-comment no-one-comment">
                        <div className="col-12">
                            <h4 className="text-center no-one-comment">Hiện tại chưa có bình luận</h4>
                        </div>
                    </div>
                ) : renderedComments}
            </div>
            <div className="col-sm-12 mt-3">
                <div className="col-12">
                    {isLogin ?
                        <form>
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
                        :
                        <h6>Vui lòng <a style={{ textDecoration: 'none' }} href="/login">đăng nhập</a> để bình luận sách.</h6>
                    }
                </div>
            </div>
        </Border>
    );
}

const mapStateToProps = state => ({
    bookReducer: state.bookReducer,
    authenticationReducer: state.authenticationReducer
})

export default connect(mapStateToProps)(BookComment);
