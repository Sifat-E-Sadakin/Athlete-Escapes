import React, { useContext } from 'react';
import { userAuth } from '../Providers/UserProvider';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const PopularClasses = () => {

    let { user } = useContext(userAuth)
    let [axiosSecure] = useAxiosSecure()

    const { data: approvedClasses = [], refetch } = useQuery({
        queryKey: ['ac'],
        queryFn: async () => {
            let res = await axiosSecure('/popularClasses')
            return res.data

        },
    })

    let topSix = approvedClasses.slice(0,6)
    console.log(topSix);

    return (
        <div className='container mx-auto'>
            <h1 className='text-center text-3xl font-semibold my-10'>Most Popular Classes</h1>

            <div className='grid md:grid-cols-3'>
                {
                    topSix.map(item=>
                    <div className="card w-96 bg-base-100 shadow-xl image-full my-7">
                    <figure><img src={item.cImage} alt="Shoes" /></figure>
                    <div className="card-body">
                      <h2 className="card-title">{item.cName}</h2>
                      <p>{item.iName}</p>
                      <div className="card-actions justify-end">
                        <button className="btn btn-primary">Buy Now</button>
                      </div>
                    </div>
                  </div>
                  )
                }
            </div>
            
        </div>
    );
};

export default PopularClasses;