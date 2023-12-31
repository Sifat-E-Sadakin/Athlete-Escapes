import React, { useContext } from 'react';
import { userAuth } from '../Providers/UserProvider';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Marquee from 'react-fast-marquee';
import { Hinge, Roll, Zoom } from 'react-awesome-reveal';

const PopularInstructors = () => {


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
            <h1 className='text-center text-3xl font-semibold  my-20'>Most Popular Instructors</h1>

            <div className=''>
               <Marquee>
               {
                    topSix.map(item =>
                       
                         <div className="carousel carousel-end ">
                            <div className="carousel-item w-64 max-w-[256px]">
                                <img src={item.iImage} alt="Drink" />
                            </div>
                            

                        </div>
                       
                    )
                }
               </Marquee>
            </div>

        </div>
    );
};

export default PopularInstructors;