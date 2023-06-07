import React, { useContext } from 'react';
import { userAuth } from '../Providers/UserProvider';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../Hooks/useAxiosSecure';

const AddClass = () => {

    let {user} = useContext(userAuth);
    let [axiosSecure] = useAxiosSecure()

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = async data =>{
        console.log(data);
        let price = parseFloat(data.price)
        let seat = parseFloat(data.seats)
        let newClass = {cName : data.cName, cImage : data.cPhoto, iName : data.iName, email : data.email , seat, price, status: data.status }
        console.log(newClass);
        let res= await axiosSecure.post('classes', newClass)
        console.log(res.data);
        
        
    }
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}className="max-w-sm lg:max-w-xl mx-auto bg-purple-200 p-6 rounded shadow-md">
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
                        <input
                            type="text"
                            {...register("seats", { required: true })}
                            className="w-full px-3 py-2 border border-gray-300 rounded"
                            name='quantity'
                            required
                            defaultValue={3}
                            placeholder='Available Quantity'
                        />
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
                        placeholder='Detail Description'
                    />
                </div>
                <button
                    type="submit"
                    className="btn btn-primary"
                >
                    Add item
                </button>
            </form>
        </div>
    );
};

export default AddClass;