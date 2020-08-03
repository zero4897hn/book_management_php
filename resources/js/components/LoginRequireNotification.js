import React from 'react';

const LoginRequireNotification = () => {
    return (
        <div className="row">
            <div className="col-sm-12">
                <div className="alert alert-warning" role="alert">
                    Bạn cần phải đăng nhập mới vào được trang này.
                </div>
            </div>
        </div>
    )
}

export default LoginRequireNotification;
