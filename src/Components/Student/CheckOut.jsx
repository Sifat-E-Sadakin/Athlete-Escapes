import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useContext, useEffect, useState } from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { userAuth } from '../../Providers/UserProvider';

const CheckOut = ({fees, id, bookedClasses, fId}) => {

  console.log(fees);

    const stripe = useStripe();
    let {user} = useContext(userAuth)
    let [axiosSecure] =useAxiosSecure()
    const elements = useElements();
    let [confirmedClasses, setConfirmedClasses] = useState()
    const [clientSecret, setClientSecret] = useState("");
    // console.log(fees);
    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
           axiosSecure.post('/create-payment-intent', {price : fees})
          .then((data)=>{
            setClientSecret(data.data.clientSecret)

          }) 
      }, [fees]);
  
    const handleSubmit = async (event) => {
      // Block native form submission.
      event.preventDefault();
  
      if (!stripe || !elements) {
        // Stripe.js has not loaded yet. Make sure to disable
        // form submission until Stripe.js has loaded.
        return;
      }
  
      // Get a reference to a mounted CardElement. Elements knows how
      // to find your CardElement because there can only ever be one of
      // each type of element.
      const card = elements.getElement(CardElement);
  
      if (card == null) {
        return;
      }
  
      // Use your card Element with other Stripe.js APIs
      const {error, paymentMethod} = await stripe.createPaymentMethod({
        type: 'card',
        card,
      });
  
      if (error) {
        console.log('[error]', error);
      } else {
        console.log('[PaymentMethod]', paymentMethod);
      }

      const {paymentIntent, error: err} = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: card,
            billing_details: {
              name: user?.name ,
              email : user?.email
            },
          },
        },

      );

      if(err){
        console.log(err);
      }
      if(paymentIntent){
        // let getBookedClasses= await   axiosSecure(`/bookedClasses?email=${user.email}`)

        // let bookedClasses =  getBookedClasses.data;

        // console.log(bookedClasses);
       axiosSecure.patch(`/addClass/${fId}`)


        axiosSecure.post('/confirmedClasses', bookedClasses)
        .then(res=>{
            console.log(res.data);

        })

        axiosSecure.delete(`/bookedClasses/${id}?email=${user.email}`)
        .then(res=>{
            console.log(res.data);
        })
      }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button type="submit" disabled={!stripe}>
                    Pay
                </button>
            </form>

        </div>
    );
};

export default CheckOut;