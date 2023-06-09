import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { userAuth } from '../../Providers/UserProvider';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const BookedClasses = () => {

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
            Booked Class

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
                                <th>{index+1}</th>
                                <td>{item.cName}</td>
                                <td>{item.iName}</td>
                                <td>{item.price}</td>
                                <td> <button className="btn btn-ghost btn-xs">Remove</button></td>
                               
                            </tr>)
                        }


                    </tbody>
                </table>
                <td> <button className="btn btn-primary btn-md">Pay</button></td>
            </div>


        </div>
    );
};

export default BookedClasses;