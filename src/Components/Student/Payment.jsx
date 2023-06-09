import { Elements } from '@stripe/react-stripe-js';
import React, { useContext } from 'react';

import { loadStripe } from '@stripe/stripe-js';
import CheckOut from './CheckOut.Jsx';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { userAuth } from '../../Providers/UserProvider';
import { useParams } from 'react-router-dom';

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT);

const Payment = () => {

    let { user } = useContext(userAuth)
    let [axiosSecure] = useAxiosSecure()

    let getId = useParams()
    let id = getId.id

    console.log(id);
    let { data: bookedClassesPaid = [] } = useQuery({
        queryKey: ['bc'],
        queryFn: async () => {
            let res = await axiosSecure(`/bookedClassesForPayment/${id}?email=${user?.email}`)
            return res.data
        }
    })
    console.log(bookedClassesPaid);
    let totalPrice;
    let fId;
    if(bookedClassesPaid){
       totalPrice= bookedClassesPaid.price
       console.log(totalPrice);
       fId = bookedClassesPaid.fId
       console.log(fId);
    } 
 
   
   
    

    return (
        <div>
            payment
            <Elements stripe={stripePromise}>
               <CheckOut fId={fId} bookedClasses={bookedClassesPaid} id={id} fees={totalPrice}></CheckOut>
            </Elements>

        </div>
    );
};

export default Payment;