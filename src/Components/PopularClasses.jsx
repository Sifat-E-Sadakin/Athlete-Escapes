import React, { useContext } from 'react';
import { userAuth } from '../Providers/UserProvider';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Fade } from 'react-awesome-reveal';

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

    let topSix = approvedClasses.slice(0, 6)
    console.log(topSix);

    return (
        <div className='container mx-auto'>
            <Fade delay={500} > <h1 className='text-center text-3xl font-semibold my-10'>Most Popular Classes</h1></Fade>

            <div className='grid md:grid-cols-3'>
                {
                    topSix.map(item =>
                        <Fade>
                            <div className="card w-96 bg-base-100 shadow-xl image-full my-7">
                                <figure><img src={item.cImage} alt="Shoes" /></figure>
                                <div className="card-body">
                                    <h2 className="card-title">{item.cName}</h2>
                                    <p>{item.iName} <br />
                                    <span className='my-2'>Total Student : {item.student} </span>
                                    
                                    </p>
                                    
                                    <div className="card-actions justify-end">
                                        <Link to={'/classes'}><button className="btn btn-primary">Buy Now</button></Link>
                                    </div>
                                </div>
                            </div>
                        </Fade>
                    )
                }
            </div>

        </div>
    );
};

export default PopularClasses;