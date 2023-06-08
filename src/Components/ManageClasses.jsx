import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../Hooks/useAxiosSecure';

const ManageClasses = () => {

    let [axiosSecure] = useAxiosSecure();

    let { data: classes = [], refetch } = useQuery({
        queryKey: ['classes'],
        queryFn: async () => {
            let res = await axiosSecure('/classes')
            return res.data;
        }
    })

    console.log(classes);

    let approve = (id) => {
        axiosSecure.put(`/classes/approve/${id}`)
            .then(data => {
                refetch()
                console.log(data);
            })
    }

    let denied = (id) => {
        axiosSecure.put(`/classes/deny/${id}`)
            .then(data => {
                refetch()
                console.log(data);
            })
    }
    let deniedID;
    let feedback = (id) => {
      deniedID = id
    }

    let sendFeedback = ()=>{
        let id = deniedID;
        console.log(id);
        let feedback = document.getElementById('feedback').value
        let finalFeedback = {feedback}
        console.log(finalFeedback);
        axiosSecure.put(`/classes/feedback/${id}`, finalFeedback)
        .then(data=> {
            console.log(data.data);
        })
    }




    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                #
                            </th>
                            <th>Class Image</th>
                            <th>Class Name</th>
                            <th>Instructor Name</th>
                            <th>Instructor Email</th>
                            <th>Available Seats</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th>Change Status</th>

                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}

                        {
                            classes.map((item, index) => <tr>
                                <th>
                                    {index + 1}
                                </th>
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <img src={item.cImage} alt="" />

                                    </div>
                                </td>
                                <td>
                                    <h1>{item.cName}</h1>
                                </td>
                                <td>{item.iName}</td>
                                <td>{item.email}</td>
                                <td>{item.seat}</td>
                                <td>{item.price}</td>
                                <td>{item.status}</td>
                                <th>
                                    <button onClick={() => approve(item._id)} className="btn btn-ghost btn-xs">Approve</button>
                                    <button onClick={() => denied(item._id)} className="btn btn-ghost btn-xs">Deny</button>
                                    <button onClick={()=>feedback(item._id)}><button onClick={() => window.my_modal_5.showModal(item._id)} className="btn btn-ghost btn-xs">Send Feedback</button></button>
                                </th>
                            </tr>

                            )
                        }
                        <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                            <form method="dialog" className="modal-box">
                                <h3 className="font-bold text-lg">Feedback</h3>
                                <p className="py-4">
                                <textarea id='feedback' placeholder="Reason of rejection" className="textarea textarea-bordered textarea-lg w-full max-w-xs" ></textarea>
                                </p>
                                <div className="modal-action">
                                    {/* if there is a button in form, it will close the modal */}
                                    <button onClick={()=>sendFeedback()} className="btn">Send</button>
                                </div>
                            </form>
                        </dialog>

                    </tbody>
                    {/* foot */}


                </table>
            </div>

        </div>
    );
};

export default ManageClasses;