import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { userAuth } from '../../Providers/UserProvider';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import Swal from 'sweetalert2';
import '../Student/Styles/payment.css'
import { Helmet } from 'react-helmet';

const BookedClasses = () => {

    let { user, loading } = useContext(userAuth)
    let [axiosSecure] = useAxiosSecure()

    let [bookedClasses, setBookedClasses] = useState([])
    let { data: getData = [], refetch } = useQuery({
        queryKey: ['bc'],
        enabled: !loading,
        queryFn: async () => {
            let res = await axiosSecure(`/bookedClasses?email=${user?.email}`)
            setBookedClasses(res.data)
            return res.data
        }
    })
    console.log(bookedClasses);
    let totalPrice;
    // if (bookedClasses) {
    // //     totalPrice = bookedClasses.reduce((sum, item) => sum + item.price, 0);
    // //     console.log(totalPrice);
    // // }

    let remove = async id => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/bookedClasses/${id}?email=${user.email}`)
                    .then(data => {
                        refetch()
                        console.log(data.data);
                    })
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
            }
        })



    }
    // window.location.reload();

    // useEffect(()=>{
    //    
    // },[])
    return (
        <div>
            <Helmet>
                <title>Booked | Athlete Escapes</title>
            </Helmet>

            <h1 className='text-center text-3xl font-semibold my-10'>List Of Booked Classes</h1>

            <p>Total Fees : {totalPrice} </p>

            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Class Name</th>
                            <th>Instructor Name</th>
                            <th>Fee</th>
                            <th>Remove</th>

                        </tr>
                    </thead>
                    <tbody>

                        {
                            bookedClasses.map((item, index) => <tr>
                                <th>{index + 1}</th>
                                <td>{item.cName}</td>
                                <td>{item.iName}</td>
                                <td>{item.price}</td>
                                <td> <button onClick={() => remove(item._id)} className="btn btn-ghost btn-xs">Remove</button></td>
                                <Link to={`/dashboard/payment/${item._id}`}><button className="btn btn-ghost btn-xs">Pay</button></Link>
                            </tr>)
                        }


                    </tbody>
                </table>
                {/* <Link to={'/dashboard/payment'}><button className="btn btn-primary btn-md">Pay</button></Link> */}
            </div>


        </div>
    );
};

export default BookedClasses;