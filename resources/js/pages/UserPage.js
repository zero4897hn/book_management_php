import React from 'react';
import UserTable from '../components/UserTable';
import { Link } from 'react-router-dom';

const UserPage = () => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-12">
                    <Link to="/create-user" className="btn btn-primary">Tạo mới tài khoản</Link>
                </div>
            </div>
            <UserTable />
        </div>
    )
}

export default UserPage;
