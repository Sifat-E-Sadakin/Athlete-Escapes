import React, { useContext } from 'react';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { userAuth } from '../Providers/UserProvider';

const useAdmin = () => {

    let [ axiosSecure] = useAxiosSecure();
    let {user , loading} = useContext(userAuth)

    let {data: isAdmin, isLoading: isAdminLoading} = useQuery({
        queryKey: ['isAdmin'],
        enabled: !loading,
        queryFn: async () =>{
            let res = await axiosSecure(`/isAdmin/${user?.email}`)
            return res.data
        }
    })

    console.log(isAdmin);
    return (
        <div>
            
        </div>
    );
};

export default useAdmin;