import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { userAuth } from '../Providers/UserProvider';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaGoogle } from 'react-icons/fa';

const Login = () => {

    const [showPassword, setShowPassword] = useState(false);
    let { signIn, googlePopUp } = useContext(userAuth);

    let [err, setErr] = useState(null)

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };


    let location = useLocation();
    // console.log(location);

    let go = location.state?.from?.pathname || '/'

    let navigate = useNavigate()

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => {
        setErr(null)
        console.log(data);

        signIn(data.email, data.password)
            .then(user => {
                console.log(user.user);
                navigate(go)
            })
            .catch(err=>{
                setErr(err.message)
            })
    };

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
                <div className="hero-content flex-col lg:flex-row">
                    <div className="text-center lg:text-left card flex-shrink-0 w-full max-w-sm space-y-2 bg-base-100">
                        <h1 className="text-5xl font-bold">Login now!</h1>
                        <img src="https://img.freepik.com/free-vector/privacy-policy-concept-illustration_114360-7853.jpg?w=740&t=st=1686458120~exp=1686458720~hmac=46834e243cc43a51115b38b10399707d59cb29811fb7b2735548654c949a182f" alt="" />
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <div className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input {...register("email", { required: true })} type="text" placeholder="email" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input  {...register("password", { required: true })} type={showPassword ? 'text' : 'password'} placeholder="password" className="input input-bordered" />

                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>


                            </div>
                            <p className='btn btn-ghost btn-xs' onClick={togglePasswordVisibility}>
                                {showPassword ? 'Hide' : 'Show'} Password
                            </p>
                            <div className='text-sm my-2'>
                                Are You In Athlete Escapes, Please <Link className='font-bold' to={'/signUp'}>Sign Up</Link>
                            </div>
                            <div>
                                {
                                    err && <span className='text-error'>{err}</span>
                                }
                            </div>
                            <div className="form-control mt-6">
                                <input type="submit" value={'Login'} className='btn btn-primary' />
                            </div>
                            <button onClick={google} className='btn btn-primary btn-outline my-2'><FaGoogle></FaGoogle> Sign Up with Google</button>
                            
                        </div>
                       
                    </form>

                </div>
            </div>

        </div>
    );
};

export default Login;