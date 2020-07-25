import React from 'react';
import UserTable from '../components/UserTable';

const UserPage = () => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-12">
                    <a href="users/create" className="btn btn-primary">Tạo mới tài khoản</a>
                </div>
            </div>
            <UserTable />
        </div>
    )
}

export default UserPage;
