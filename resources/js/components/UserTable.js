import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaLock, FaLockOpen, FaEdit } from 'react-icons/fa';

const UserTable = (props) => {
    const { userReducer } = props;
    const { users } = userReducer

    const renderedUsers = users.map((user, index) => {
        return (
            <tr key={index}>
                <th scope="row"></th>
                <td>
                    {user.avatar ?
                        <img className="img-fluid" src={`/files/avatars/${user.avatar}`} />
                        :
                        <img className="img-fluid" src="/files/avatars/anonymous_avatar.png" />
                    }
                </td>
                <td><Link to={`/detail-user/${user.id}`}>{user.username}</Link></td>
                <td>{user.email}</td>
                <td>{user.admin ? 'Quản trị' : 'Người dùng'}</td>
                <td>{user.banned ? 'Đang khóa' : 'Đang mở'}</td>
                <td>
                    {user.banned ?
                        <button className="btn btn-warning">
                            <FaLockOpen />
                        </button>
                        :
                        <button className="btn btn-warning">
                            <FaLock />
                        </button>
                    }
                    <a className="btn btn-primary" href="/users/{{$user->id}}/edit">
                        <FaEdit />
                    </a>
                </td>
            </tr>
        )
    })

    return (
        <div className="row">
            <div className="col-sm-12">
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th scope="col" style={{ width: '5%' }}>#</th>
                            <th scope="col" style={{ width: '10%' }}>Avatar</th>
                            <th scope="col" style={{ width: '20%' }}>Tên đăng nhập</th>
                            <th scope="col" style={{ width: '25%' }}>Email</th>
                            <th scope="col" style={{ width: '15%' }}>Vai trò</th>
                            <th scope="col" style={{ width: '10%' }}>Trạng thái</th>
                            <th scope="col" style={{ width: '15%' }}></th>
                        </tr>
                    </thead>
                    <tbody>{renderedUsers}</tbody>
                </table>
            </div>
        </div>
    );
}

const mapStateToProps = state => ({
    userReducer: state.userReducer
})

export default connect(mapStateToProps)(UserTable);
