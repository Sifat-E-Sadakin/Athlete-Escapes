import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { data } from 'autoprefixer';

let disabledButtons=[]

const AllUsers = () => {

    let [axiosSecure] = useAxiosSecure()
    

    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            let res = await axiosSecure('https://assignment-12-server-ochre-rho.vercel.app/users')
            return res.data
        },
    })

    const isButtonDisabled = (buttonId) => {
        return disabledButtons.includes(buttonId);
      };

    let setAdmin = id =>{
        axiosSecure.put(`/users/a/${id}`)
        .then(data=>{
            console.log(data);
            refetch();
            disabledButtons.push(id+'a')
            let newArr = disabledButtons.filter(item=> item != id+'b' && item != id+'c')
            console.log(newArr);
            disabledButtons = [...newArr]
        })
    }
    let setInstructor = id =>{
        axiosSecure.put(`/users/i/${id}`)
        .then(data=>{
            console.log(data);
            refetch();
            disabledButtons.push(id+'b')
            let newArr = disabledButtons.filter(item=> item != id+'a' && item !=  id+'c')
            console.log(newArr);
            disabledButtons = [...newArr]
        })
    }
    let setStudent = id =>{
        axiosSecure.put(`/users/s/${id}`)
        .then(data=>{
            console.log(data);
            refetch();
            disabledButtons.push(id+'c')
            let newArr = disabledButtons.filter(item=> item != id+'a' && item !=  id+'b')
            console.log(newArr);
            disabledButtons = [...newArr]
        })
    }

    console.log(disabledButtons);

  


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
                                        <button disabled={isButtonDisabled(user._id+'a')} className="btn btn-ghost btn-xs"  onClick={()=>setAdmin(user._id)}>To admin</button>
                                        <button disabled={isButtonDisabled(user._id+'b')} className="btn btn-ghost btn-xs"  onClick={()=>setInstructor(user._id)}>To instructor</button>
                                        <button disabled={isButtonDisabled(user._id+'c')} className="btn btn-ghost btn-xs"  onClick={()=>setStudent(user._id)}>To student</button>
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