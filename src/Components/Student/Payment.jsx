import { Elements } from '@stripe/react-stripe-js';
import React, { useContext } from 'react';

import { loadStripe } from '@stripe/stripe-js';
import CheckOut from './CheckOut.Jsx';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { userAuth } from '../../Providers/UserProvider';

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT);

const Payment = () => {

    let { user } = useContext(userAuth)
    let [axiosSecure] = useAxiosSecure()
    let { data: bookedClasses = [] } = useQuery({
        queryKey: ['bc'],
        queryFn: async () => {
            let res = await axiosSecure(`/bookedClasses?email=${user?.email}`)
            return res.data
        }
    })
    console.log(bookedClasses);
    let totalPrice;
    if(bookedClasses){
       totalPrice= bookedClasses.reduce((sum, item)=> sum+ item.price, 0);
       console.log(totalPrice);
    } 

    return (
        <div>
            payment
            <Elements stripe={stripePromise}>
               <CheckOut fees={totalPrice}></CheckOut>
            </Elements>

        </div>
    );
};

export default Payment;