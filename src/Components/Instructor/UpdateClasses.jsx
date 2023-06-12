import React from 'react';
import { useContext } from 'react';
import { userAuth } from '../../Providers/UserProvider';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';

const UpdateClasses = () => {

    let { user } = useContext(userAuth);
    let [axiosSecure] = useAxiosSecure()

    let {id} = useParams()
    console.log(id);
    const { data: instructorClasses = [], refetch } = useQuery({
        queryKey: ['ic'],
        queryFn: async () => {
            let res = await axiosSecure(`/instructorClassById/${id}`)
            return res.data
        },
    })


    

    // const { register, setValue, handleSubmit, watch, formState: { errors } } = useForm();
    
    // const onSubmit = async data => {
    //     console.log(data);
    //     let price = parseFloat(data.price)
    //     let seat = parseFloat(data.seats)
    //     let newClass = {  seat, price, description : data.description }
    //     console.log(newClass);
    //     let res = await axiosSecure.put(`/updateClass/${id}`, newClass)
    //     console.log(res.data);


    // }

    let handelSubmit = async event =>{
        event.preventDefault()

        let price = parseFloat(event.target.price.value)
        let seat = parseFloat(event.target.seats.value) 
        let description = event.target.description.value

        let newClass = {  seat, price, description  }
        console.log(newClass);

           let res = await axiosSecure.put(`/updateClass/${id}`, newClass)
           .then(res=>{
            Swal.fire({
                position: '',
                icon: 'success',
                title: `${instructorClasses.cName} has been successfully Updated`,
                showConfirmButton: false,
                timer: 1500
              })
           })
      console.log(res.data);

    }
    return (
        <div>
              <h1 className='text-center text-3xl font-semibold my-10'>Update Class</h1>
            <form onSubmit={handelSubmit}className="max-w-sm lg:max-w-xl mx-auto bg-purple-200 p-6 rounded shadow-md">
                <div className='lg:flex justify-between '>
                   
                   
                </div>
             
                <div className='lg:flex justify-between'>
                   
                    <div className="mb-4">
                        <label htmlFor="price" className="block text-gray-700 font-bold mb-2">
                            Price 
                        </label>
                        <input
                            type="number"
                          
                            className="w-full px-3 py-2 border border-gray-300 rounded"
                            name='price'
                            required
                            
                            defaultValue={instructorClasses.price}
                            placeholder='Price'
                        />
                    </div>
                </div>
                <div className='lg:flex justify-between'>
                   
                <div className="mb-4">
                        <label htmlFor="quantity" className="block text-gray-700 font-bold mb-2">
                            Available Seats
                        </label>
                        <input defaultValue={instructorClasses.seat} className="w-full px-3 py-2 border border-gray-300 rounded" type="number"  name='seats' placeholder='Available Seats' />
                    
                    </div>
                  
                </div>
                <div className="mb-4">
                    <label htmlFor="description" className="block text-gray-700 font-bold mb-2">
                        Detail Description
                    </label>
                    <textarea
                     
                        id="description"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded"
                        name='description'
                        defaultValue={instructorClasses.description}
                        placeholder='Detail Description'
                    />
                </div>
                <button
                    type="submit"
                    className="btn btn-primary"
                >
                    Update Class
                </button>
            </form>

            
        </div>
    );
};

export default UpdateClasses;