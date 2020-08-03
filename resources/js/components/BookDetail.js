import React from 'react';
import Border from './Border';
import { connect } from 'react-redux';
import { FaEdit } from 'react-icons/fa'
import { Link } from 'react-router-dom';

const BookDetail = (props) => {
    const { bookReducer, authenticationReducer } = props;
    const { userData } = authenticationReducer;
    const { book } = bookReducer;
    const { comments = [] } = book;

    return (
        <Border>
            <div className="col-2">
                {book.user && book.user.avatar ?
                    <img
                        src={`/files/avatars/${book.user.avatar}`}
                        className="img-fluid img-thumbnail"
                    />
                    :
                    <img
                        src="/files/avatars/anonymous_avatar.png"
                        className="img-fluid img-thumbnail"
                    />
                }
                <h3 className="text-center">{book.user && book.user.username}</h3>
            </div>
            <div className="col-10 p-0">
                <div className="card">
                    <div className="card-header">
                        <span>{book.name}</span>
                        {comments && !comments.length && userData && userData.id === book.user_id &&
                            <Link
                                className="btn btn-outline-secondary btn-sm float-right"
                                to={`/edit-book/${book.id}`}
                            >
                                <FaEdit />
                            </Link>
                        }
                    </div>
                    <div className="card-body">
                        <div style={{ width: '100%', display: 'flex' }}>
                            <img
                                style={{ margin: 'auto' }}
                                className="img-fluid"
                                src={`/files/covers/${book.cover}`} />
                        </div>
                        <div style={{ whiteSpace: 'pre-line' }}>{book.description}</div>
                    </div>
                </div>
                <h3></h3>
            </div>
        </Border>
    );
}

const mapStateToProps = state => ({
    bookReducer: state.bookReducer,
    authenticationReducer: state.authenticationReducer,
})

export default connect(mapStateToProps)(BookDetail);
