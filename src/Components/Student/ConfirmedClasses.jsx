import React, { useContext, useEffect, useState } from 'react';
import { userAuth } from '../../Providers/UserProvider';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { Helmet } from 'react-helmet';

const ConfirmedClasses = () => {

    let { user } = useContext(userAuth)
    let [axiosSecure] = useAxiosSecure()
    let [confirmedClasses, setConfirmedClasses] = useState([])

    useEffect(() => {
        axiosSecure(`/confirmedClasses?email=${user.email}`)
            .then(res => {
                setConfirmedClasses(res.data);
            })
    }, [])

    console.log(confirmedClasses);

    return (
        <div>
            <Helmet>
                <title>Confirmed | Athlete Escapes</title>
            </Helmet>
              <h1 className='text-center text-3xl font-semibold my-10'>List Of Confirmed Classes</h1>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Class Name</th>
                            <th>Instructor Name</th>
                            <th>Fee</th>
                            

                        </tr>
                    </thead>
                    <tbody>

                        {
                            confirmedClasses.map((item, index) => <tr>
                                <th>{index + 1}</th>
                                <td>{item.cName}</td>
                                <td>{item.iName}</td>
                                <td>{item.price}</td>
                                

                            </tr>)
                        }


                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default ConfirmedClasses;