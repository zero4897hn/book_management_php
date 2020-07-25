import React from 'react';

const UserTable = (props) => {
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
                    <tbody>
                        <tr>
                            <th scope="row"></th>
                            <td>
                                <img className="img-fluid" src="{{ asset('files/avatars/' . $user->avatar) }}" />

                                <img className="img-fluid" src="{{ asset('files/avatars/anonymous_avatar.png') }}" />
                            </td>
                            <td><a href="users/{{$user->id}}"></a></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>
                                <button
                                    className="btn btn-warning button_unblock"
                                >
                                    <i className="fas fa-lock-open"></i>
                                </button>
                                <button
                                    className="btn btn-warning button_block"
                                >
                                    <i className="fas fa-lock"></i>
                                </button>
                                <a
                                    className="btn btn-primary"
                                    href="/users/{{$user->id}}/edit"
                                >
                                    <i className="fas fa-edit"></i>
                                </a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default UserTable;
