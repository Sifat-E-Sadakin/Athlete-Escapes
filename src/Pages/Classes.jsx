import React, { useContext } from 'react';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { userAuth } from '../Providers/UserProvider';
import { Link } from 'react-router-dom';

const Classes = () => {
    let {user} = useContext(userAuth)
    let [axiosSecure] = useAxiosSecure()

    const { data: approvedClasses = [], refetch } = useQuery({
        queryKey: ['ac'],
        queryFn: async () => {
            let res = await axiosSecure('/classes/approved')
            return res.data
        },
    })

    //  console.log(approvedClasses);

    let addClass = info =>{
        // axiosSecure.patch(`/addClass/${info._id}`)
        // .then(data=>{
        //     refetch()
        //     console.log(data.data);

        // })
        let studentClass = {fId: info._id, cName: info.cName, iName: info.iName, price : info.price, email : user?.email}
        console.log(studentClass);
        axiosSecure.post('/addClass', studentClass)
        .then(data=>{
            console.log(data.data);
        })

    }
    return (
        <div className='container mx-auto'>
            <h1 className='text-center text-3xl font-semibold my-10'>Available Classes</h1>
            <div className='grid md:grid-cols-3'>
                {
                    approvedClasses.map(item =>
                        <div key={item._id} className="card w-96 bg-base-100 shadow-xl">
                            <figure><img src={item.cImage} alt="Shoes" /></figure>
                            <div className="card-body">
                                <h2 className="card-title">{item.cName}</h2>
                                <p>Instructor : {item.iName}</p>
                                <p>Available Seats : {item.seat}</p>
                                <p>Fee : {item.price}</p>
                               
                                <div className="card-actions justify-end">
                                    {user?
                                        <button onClick={()=>addClass(item)}  className="btn btn-primary">Book now</button>
                                        :
                                        <Link to={'/login'} className='btn btn-primary'>Book now</Link>
                                    }
                                </div>
                            </div>
                        </div>
                        )
                }
            </div>
        </div>
    );
};

export default Classes;