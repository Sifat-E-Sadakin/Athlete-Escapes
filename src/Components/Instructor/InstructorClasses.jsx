import React, { useContext } from 'react';
import { userAuth } from '../../Providers/UserProvider';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const InstructorClasses = () => {

    let { user } = useContext(userAuth);
    let [axiosSecure] = useAxiosSecure()

    const { data: instructorClasses = [], refetch } = useQuery({
        queryKey: ['ic'],
        queryFn: async () => {
            let res = await axiosSecure(`/instructorClass?email=${user?.email}`)
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
                            <th>{item.status}</th>
                            <td>{item.feedback? item.feedback: 'OK'}</td>
                            <td>0</td>
                            <td><button>Update</button></td>
                        </tr>)
                       }
                  
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default InstructorClasses;