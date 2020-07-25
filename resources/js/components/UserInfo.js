import React from 'react';
import Border from './Border';

const UserInfo = () => {
    return (
        <Border>
            <div class="col-2">
                <img
                    src="{{asset('files/avatars/' . $user->avatar)}}"
                    class="img-fluid img-thumbnail"
                    onError="this.onerror=null;this.src='{{asset('files/avatars/anonymous_avatar.png')}}';"
                />
                <img class="img-fluid img-thumbnail" src="{{ asset('files/avatars/anonymous_avatar.png') }}" />
                <h3 class="text-center"></h3>
            </div>
            <div class="col-10 p-0">
                <div class="card">
                    <div class="card-header">
                        <span>Thông tin cá nhân</span>
                        <a
                            class="btn btn-outline-secondary btn-sm float-right"
                            href="/users/{{$user->id}}/edit"
                        >
                            <i class="fas fa-edit"></i>
                        </a>
                    </div>
                    <div class="card-body">
                        <table class="table table-bordered">
                            <tr>
                                <td><b>Họ và tên: </b></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td><b>Email: </b></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td><b>Vai trò: </b></td>
                                <td>
                                </td>
                            </tr>
                            <tr>
                                <td><b>Trạng thái: </b></td>
                                <td>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </Border>
    );
}

export default UserInfo;
