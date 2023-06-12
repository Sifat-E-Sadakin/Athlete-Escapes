import React, { useContext } from 'react';
import { userAuth } from '../../Providers/UserProvider';

const StudentHome = () => {
    let {user} = useContext(userAuth)
    return (
        <div>
            <h1>Welcome Back, {user.displayName}</h1>
            <p>This is Your Dashboard</p>
        </div>
    );
};


export default StudentHome;