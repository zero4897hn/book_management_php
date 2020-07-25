import React from 'react';
import UserInfo from '../components/UserInfo';
import BookTable from '../components/BookTable';

const UserDetailPage = () => {
    return (
        <div className="container">
            <UserInfo />
            <BookTable />
        </div>
    );
}

export default UserDetailPage;
