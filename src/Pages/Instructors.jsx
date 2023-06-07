import React from 'react';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const Instructors = () => {

    let [axiosSecure] = useAxiosSecure();

    let { data: instructors = [] } = useQuery({
        queryKey: (['instructors']),
        queryFn: async () => {
            let res = await axiosSecure.get('/instructors')
            return res.data
        }

    })

    
    return (
        <div className='container mx-auto'>
            <h1 className='text-3xl font-semibold my-10 text-center'>Respective Instructors</h1>

            <div className='grid md:grid-cols-3'>
                {
                    instructors.map(instructor =>
                        <div key={instructor._id} className="card card-side w-96 bg-base-100 shadow-xl">
                            <figure><img src={instructor.photo} alt="Movie" /></figure>
                            <div className="card-body">
                                <h2 className="card-title">{instructor.name}</h2>
                                <p>{instructor.email}</p>
                                <div className="card-actions justify-end">
                                    <button className="btn btn-primary">Watch</button>
                                </div>
                            </div>
                        </div>
                    )}
            </div>
        </div>
    );
};

export default Instructors;