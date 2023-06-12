import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { userAuth } from '../Providers/UserProvider';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { FaGoogle } from 'react-icons/fa';

const SignUp = () => {

    let { createUser, updateUser, googlePopUp } = useContext(userAuth);

    let navigate = useNavigate()
    let [err, setErr] = useState(null)

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => {

        setErr(null)

        if(data.password != data.cPassword){
            setErr('Password Did not match')
            return 
        }

        console.log(data);
        createUser(data.email, data.password)
            .then(userCredential => {
                let user = userCredential.user;
                console.log(user);
                updateUser(data.name, data.photo)
                let newUser = { name: data.name, email: user.email, photo: data.photo, role: 'student' }
                navigate('/')
                fetch('https://assignment-12-server-ochre-rho.vercel.app/users', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(newUser)
                })
                    .then(res => res.json())
                    .then(data => console.log(data))
            })
            .catch(err => {
                console.log(err.message);
                setErr(err.message);
            })
    };
    console.log(errors);

    let google = () => {
        setErr(null)
        googlePopUp()
            .then(newUser => {
                navigate('/')
                console.log(newUser.user.displayName);
                let gUser = { name: newUser.user.displayName, email: newUser.user.email, photo: newUser.user.photoURL, role: 'student' }
                fetch('https://assignment-12-server-ochre-rho.vercel.app/users', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(gUser)
                })
                    .then(res => res.json())
                    .then(data => console.log(data))

            })
            .catch(err=>{
                setErr(err)
            })
            
    }

    return (
        <div>
            <div className="hero min-h-screen ">
                <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left card flex-shrink-0 w-full max-w-sm space-y-2 ">
                        <h1 className="text-5xl font-bold">Sign Up !!!</h1>
                        <img src="https://img.freepik.com/free-vector/mobile-login-concept-illustration_114360-83.jpg?w=740&t=st=1686458373~exp=1686458973~hmac=c9d39d2fdaa53a1ad831f78f3a3b13008039939a9d2b0d6577cefe0b344df4a4" alt="" />
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <div className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input {...register("name", { required: true })} type="text" placeholder="Your Name" className="input input-bordered" />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Photo</span>
                                </label>
                                <input {...register("photo", { required: true })} type="text" placeholder="Your Photo" className="input input-bordered" />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input {...register("email", { required: true })} type="text" placeholder="email" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Create Password</span>
                                </label>
                                <input {...register("password", { required: true, pattern: /[A-Z]+[!@#$%^&*]/ })} type="password" placeholder="Password" className="input input-bordered" />
                            </div>
                            {errors.password && errors.password.type === 'pattern' && (
                                <span className="text-error">
                                    Password should have at least 6 characters. Having a Capital latter and special character
                                </span>
                            )}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Confirm Password</span>
                                </label>
                                <input {...register("cPassword", { required: true })} type="password" placeholder="Confirm password" className="input input-bordered" />

                            </div>
                            <div className='text-sm my-2'>
                                Already have account, Please <Link className='font-bold' to={'/login'}>login</Link>
                            </div>
                            <div>
                                {
                                    err && <span className='text-error'>{err}</span>
                                }
                            </div>
                           
                            <div className="form-control mt-6">
                                <input type="submit" value={'Sign Up '} className='btn btn-primary' />
                            </div>
                            <button onClick={google} className='btn btn-primary btn-outline my-2'><FaGoogle></FaGoogle> Sign Up with Google</button>
                        </div>
                        
                    </form>

                </div>
            </div>

        </div>
    );
};

export default SignUp;