import React, { useContext } from 'react';
import { userAuth } from '../../Providers/UserProvider';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const InstructorClasses = () => {

    let { user } = useContext(userAuth);
    let [axiosSecure] = useAxiosSecure()

    let [instructorClasses, setInstructorClass] = useState([])

    const { data: Classes = [], refetch } = useQuery({
        queryKey: ['ic'],
        queryFn: async () => {
            let res = await axiosSecure(`/instructorClass?email=${user?.email}`)
            setInstructorClass(res.data)
            return res.data
           
        },
    })
    console.log(instructorClasses);

    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Class Name</th>
                            <th>Status</th>
                            <th>Feedback</th>
                            <th>Enrolled Student</th>
                            <th>Update</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                       {
                        instructorClasses.map(item=> <tr>
                            <th>{item.cName}</th>
                            <th>{item.status}</th>
                            <td>{item.feedback? item.feedback: 'Waiting For Feedback'}</td>
                            <td>{item.student}</td>
                            <Link to={`/dashboard/updateClass/${item._id}`}><td className='btn btn-ghost btn-xs'><button>Update</button></td></Link>
                        </tr>)
                       }
                  
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default InstructorClasses;