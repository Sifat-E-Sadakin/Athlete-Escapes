import React, { useContext } from 'react';
import { userAuth } from './UserProvider';
import { Navigate, useLocation, useNavigation } from 'react-router-dom';
import { Circles } from 'react-loader-spinner';

const PrivateRoutes = ({children}) => {

    let {user, loading} = useContext(userAuth);
    const navigation = useNavigation();

    let location = useLocation();



    if(loading){
        return  <div className='spinner'>
        {navigation.state == 'loading' ? <Triangle
            height="300"
            width="300"
            color="#000000"
            ariaLabel="triangle-loading"
            wrapperStyle={{}}
            wrapperClassName=""
            visible={true}
        /> : <></>}
    </div>
    }

    if(user){
        return children
    }
    return <Navigate to={'/login'} state={{from: location}}></Navigate>
};

export default PrivateRoutes;