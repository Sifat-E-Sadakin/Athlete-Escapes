import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { data } from 'autoprefixer';

const AllUsers = () => {

    let [axiosSecure] = useAxiosSecure()

    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            let res = await fetch('http://localhost:3000/users')
            return res.json()
        },
    })

    let setAdmin = id =>{
        axiosSecure.put(`/users/a/${id}`)
        .then(data=>{
            console.log(data);
            refetch();
        })
    }
    let setInstructor = id =>{
        axiosSecure.put(`/users/i/${id}`)
        .then(data=>{
            console.log(data);
            refetch();
        })
    }
    let setStudent = id =>{
        axiosSecure.put(`/users/s/${id}`)
        .then(data=>{
            console.log(data);
            refetch();
        })
    }

  


    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Change Role</th>


                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, index) =>
                                <tr key={user._id}>
                                    <th>{index + 1}</th>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.role}</td>
                                    <td className='space-x-2'>
                                        <button onClick={()=>setAdmin(user._id)}>To admin</button>
                                        <button onClick={()=>setInstructor(user._id)}>To instructor</button>
                                        <button onClick={()=>setStudent(user._id)}>To student</button>
                                    </td>
                                    
                                   
                                </tr>

                            )
                        }


                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUsers;