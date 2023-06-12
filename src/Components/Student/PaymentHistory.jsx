import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { userAuth } from '../../Providers/UserProvider';
import { Helmet } from 'react-helmet';

const PaymentHistory = () => {

    let [axiosSecure] = useAxiosSecure()
    let { user } = useContext(userAuth)
    let { data: paymentHistory = [] } = useQuery({
        queryKey: (['ph']),
        queryFn: async () => {
            let res = await axiosSecure(`/paymentHistory?email=${user.email}`)
            return res.data
        }



    })

    console.log(paymentHistory);
    return (

        <div className='container mx-auto'>
            <Helmet>
                <title>Payment History | Athlete Escapes</title>
            </Helmet>
            <h1 className='text-center text-3xl font-semibold my-10'>Payment History</h1>

            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Class Name</th>
                            {/* <th>Instructor Name</th> */}
                            <th>Fee</th>
                            <th>Payment Method</th>
                            <th>Brand</th>
                            <th>Payment Status</th>
                            <th>Trx ID</th>
                            <th>Time</th>


                        </tr>
                    </thead>
                    <tbody>

                        {
                            paymentHistory?.map((item, index) => <tr>
                                <th>{index + 1}</th>
                                <td>{item.cName}</td>
                                {/* <td>{item.iName}</td> */}
                                <td>{item.price}</td>
                                <td>{item.payment_method}</td>
                                <td>{item.Brand}</td>
                                <td>{item.status}</td>
                                <td>{item.txId}</td>
                                <td>{item.time}</td>
                           
                            
                            </tr>)
                        }


                    </tbody>
                </table>
                {/* <Link to={'/dashboard/payment'}><button className="btn btn-primary btn-md">Pay</button></Link> */}
            </div>

        </div>
    );
};

export default PaymentHistory;