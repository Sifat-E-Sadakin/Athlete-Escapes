import React, { useContext } from 'react';
import { userAuth } from './UserProvider';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoutes = ({children}) => {

    let {user, loading} = useContext(userAuth);

    let location = useLocation();

    if(loading){
        return <p>lllllllllllll</p>
    }

    if(user){
        return children
    }
    return <Navigate to={'/login'} state={{from: location}}></Navigate>
};

export default PrivateRoutes;