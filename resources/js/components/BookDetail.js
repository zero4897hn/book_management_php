import React from 'react';
import Border from './Border';
import { connect } from 'react-redux';
import { FaEdit } from 'react-icons/fa'

const BookDetail = (props) => {
    const { bookReducer } = props;
    const { book } = bookReducer;

    return (
        <Border>
            <div className="col-2">
                <img
                    src="{{asset('files/avatars/' . $book->user->avatar)}}"
                    className="img-fluid img-thumbnail"
                    onError="this.onerror=null;this.src='{{asset('files/avatars/anonymous_avatar.png')}}';"
                />
                <h3 className="text-center"></h3>
            </div>
            <div className="col-10 p-0">
                <div className="card">
                    <div className="card-header">
                        <span>{book.name}</span>
                        <a
                            className="btn btn-outline-secondary btn-sm float-right edit-comment"
                            href="/books/{{$book->id}}/edit"
                        >
                            <FaEdit />
                        </a>
                    </div>
                    <div className="card-body">
                        <div style={{ width: '100%', display: 'flex' }}>
                            <img style={{ margin: 'auto' }} className="img-fluid" src="{{asset('files/covers/'.$book->cover)}}" />
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
    bookReducer: state.bookReducer
})

export default connect(mapStateToProps)(BookDetail);
