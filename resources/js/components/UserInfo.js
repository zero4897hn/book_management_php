import React from 'react';
import Border from './Border';
import { connect } from 'react-redux';
import { FaEdit } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const UserInfo = (props) => {
    const { userReducer } = props;
    const { user } = userReducer;

    return (
        <Border>
            <div className="col-2">
                {user.avatar ?
                    <img className="img-fluid" src={`/files/avatars/${user.avatar}`} />
                    :
                    <img className="img-fluid" src="/files/avatars/anonymous_avatar.png" />
                }
                <h3 className="text-center">{user.username}</h3>
            </div>
            <div className="col-10 p-0">
                <div className="card">
                    <div className="card-header">
                        <span>Thông tin cá nhân</span>
                        <Link
                            className="btn btn-outline-secondary btn-sm float-right"
                            to={`/edit-user/${user.id}`}
                        >
                            <FaEdit />
                        </Link>
                    </div>
                    <div className="card-body">
                        <table className="table table-bordered">
                            <tbody>
                                <tr>
                                    <td><b>Họ và tên: </b></td>
                                    <td>{user.last_name} {user.first_name}</td>
                                </tr>
                                <tr>
                                    <td><b>Email: </b></td>
                                    <td>{user.email}</td>
                                </tr>
                                <tr>
                                    <td><b>Vai trò: </b></td>
                                    <td>{user.admin ? 'Quản trị' : 'Người dùng'}</td>
                                </tr>
                                <tr>
                                    <td><b>Trạng thái: </b></td>
                                    <td>{user.banned ? 'Đang khóa' : 'Đang mở'}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Border>
    );
}

const mapStateToProps = state => ({
    userReducer: state.userReducer
})

export default connect(mapStateToProps)(UserInfo);
