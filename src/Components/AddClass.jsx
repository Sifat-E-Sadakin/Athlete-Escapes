import React, { useContext } from 'react';
import { userAuth } from '../Providers/UserProvider';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet';

const AddClass = () => {

    let { user } = useContext(userAuth);
    let [axiosSecure] = useAxiosSecure()

    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();
    const onSubmit = async data => {
        console.log(data);
        let price = parseFloat(data.price)
        let seat = parseFloat(data.seats)
        let newClass = { cName: data.cName, iImage: data.iPhoto, cImage: data.cPhoto, iName: data.iName, email: data.email, seat: seat, price, status: data.status, student: 0, description : data.description }
        console.log(newClass);
        let res = await axiosSecure.post('classes', newClass)
        .then(res=>{
            Swal.fire({
                position: '',
                icon: 'success',
                title: `${data.cName} has been successfully added, Please for Approval From Admin`,
                showConfirmButton: false,
                timer: 1500
              })
              reset()
        })
        console.log(res.data);


    }
    return (
        <div>
            <Helmet>
                <title>Add class | Athlete Escapes</title>
            </Helmet>
              <h1 className='text-center text-3xl font-semibold my-10'>Add New Class</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="max-w-sm lg:max-w-xl mx-auto bg-purple-200 p-6 rounded shadow-md">
                <div className='lg:flex justify-between '>
                    <div className="mb-4">
                        <label htmlFor="photo" className="block text-gray-700 font-bold mb-2">
                            Class Name
                        </label>
                        <input
                            {...register("cName", { required: true })}
                            type="text"
                            className="w-full px-3  py-2 border border-gray-300 rounded"

                            required
                            placeholder='Name of the class'
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="toyName" className="block text-gray-700 font-bold mb-2">
                            Image of Class
                        </label>
                        <input
                            {...register("cPhoto", { required: true })}
                            type="text"

                            className="w-full px-3 py-2 border border-gray-300 rounded"

                            required
                            placeholder='Photo URL of the Class'
                        />
                    </div>
                </div>
                <div className='lg:flex justify-between '>
                    <div className="mb-4">
                        <label htmlFor="sellerName" className="block text-gray-700 font-bold mb-2">
                            Instructor Name
                        </label>
                        <input
                            type="text"
                            {...register("iName", { required: true })}
                            className="w-full px-3 py-2 border border-gray-300 rounded"
                            readOnly
                            defaultValue={user && user.displayName}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="sellerEmail" className="block text-gray-700 font-bold mb-2">
                            Instructor Email
                        </label>
                        <input
                            type="email"
                            {...register("email", { required: true })}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded"
                            readOnly
                            defaultValue={user && user.email}
                        />
                    </div>
                </div>
                <div className='lg:flex justify-between'>
                    <div className="mb-4">
                        <label htmlFor="sellerEmail" className="block text-gray-700 font-bold mb-2">
                            Class Status
                        </label>
                        <input
                            type="text"
                            {...register("status", { required: true })}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded"
                            readOnly
                            defaultValue={'pending'}
                        />

                    </div>
                    <div className="mb-4">
                        <label htmlFor="price" className="block text-gray-700 font-bold mb-2">
                            Price
                        </label>
                        <input
                            type="number"
                            {...register("price", { required: true })}
                            className="w-full px-3 py-2 border border-gray-300 rounded"
                            name='price'
                            required
                            placeholder='Price'
                        />
                    </div>
                </div>
                <div className='lg:flex justify-between'>

                    <div className="mb-4">
                        <label htmlFor="quantity" className="block text-gray-700 font-bold mb-2">
                            Available Seats
                        </label>
                        <input className="w-full px-3 py-2 border border-gray-300 rounded" type="number"  {...register("seats", { required: true })} placeholder='Available Seats' />

                    </div>
                    <div className="mb-4">
                        <label htmlFor="toyName" className="block text-gray-700 font-bold mb-2">
                            Image of Instructor
                        </label>
                        <input
                            {...register("iPhoto", { required: true })}
                            type="text"

                            className="w-full px-3 py-2 border border-gray-300 rounded"

                            required
                            placeholder='Photo URL of Instructor'
                        />
                    </div>
                </div>
                <div className="mb-4">
                    <label htmlFor="description" className="block text-gray-700 font-bold mb-2">
                        Detail Description
                    </label>
                    <textarea
                        {...register("description", { required: true })}
                        id="description"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded"
                        name='description'
                        placeholder='Detail Description'
                    />
                </div>
                <button
                    type="submit"
                    className="btn btn-primary"
                >
                    Add Class
                </button>
            </form>
        </div>
    );
};

export default AddClass;