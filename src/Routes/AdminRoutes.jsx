import React, { useContext } from 'react';
import useAdmin from '../Hooks/useAdmin';
import { userAuth } from '../Providers/UserProvider';
import { Navigate } from 'react-router-dom';

const AdminRoutes = ({children}) => {

    let {isAdmin, } =  useAdmin()
    let role = isAdmin?.isAdmin


    let {user, loading} = useContext(userAuth)

    if(user && role){
        return children
    }



    return <Navigate to={'/'}></Navigate>
};

export default AdminRoutes;