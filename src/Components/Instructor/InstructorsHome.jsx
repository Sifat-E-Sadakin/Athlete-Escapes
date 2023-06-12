import React, { useContext } from 'react';
import { userAuth } from '../../Providers/UserProvider';

const InstructorsHome = () => {
    let {user} = useContext(userAuth)
    return (
        <div>
            <h1>Welcome Back, {user.displayName}</h1>
            <p>This the Dashboard of respective instructor ...</p>
        </div>
    );
};

export default InstructorsHome;