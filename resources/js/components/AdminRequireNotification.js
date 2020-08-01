import React from 'react';

const AdminRequireNotification = () => {
    return (
        <div className="row">
            <div className="col-sm-12">
                <div className="alert alert-warning" role="alert">
                    Bạn cần có quyền quản trị mới vào được trang này.
                    </div>
            </div>
        </div>
    )
}

export default AdminRequireNotification;
