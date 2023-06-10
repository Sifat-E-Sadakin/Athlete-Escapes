import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { userAuth } from '../../Providers/UserProvider';

const PaymentHistory = () => {

    let [axiosSecure] = useAxiosSecure()
    let {user} = useContext(userAuth)
    let {data : paymentHistory = [] } = useQuery({
        queryKey :(['ph']),
        queryFn : async ()=>{
            let res = await axiosSecure(`/paymentHistory?email=${user.email}`)
            return res.data
        }


        
    })

    console.log(paymentHistory);
    return (
        <div>
            
        </div>
    );
};

export default PaymentHistory;