import React, { useContext } from 'react';
import { userAuth } from '../../Providers/UserProvider';

const AdminHome = () => {
    let {user} = useContext(userAuth)
    return (
        <div>
            <h1>Welcome Back, {user.displayName}</h1>
            <p>Congratulation you have Admin Access Here...</p>
        </div>
    );
};

export default AdminHome;