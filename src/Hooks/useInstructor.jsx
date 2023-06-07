import React, { useContext } from 'react';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { userAuth } from '../Providers/UserProvider';

const useInstructor = () => {
    
    let [ axiosSecure] = useAxiosSecure();
    let {user , loading} = useContext(userAuth)

    let {data: isInstructor, isLoading: isInstructorLoading} = useQuery({
        queryKey: ['isInstructor'],
        enabled: !loading,
        queryFn: async () =>{
            let res = await axiosSecure(`/isInstructor/${user?.email}`)
            return res.data
        }
    })
    // console.log(isInstructor);
    return {isInstructor}
};

export default useInstructor;