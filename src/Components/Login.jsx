import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { userAuth } from '../Providers/UserProvider';
import { useLocation, useNavigate } from 'react-router-dom';

const Login = () => {

    let {signIn} = useContext(userAuth);

    let location = useLocation();
    // console.log(location);

    let go = location.state?.from?.pathname || '/'

    let navigate = useNavigate()

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data =>{
        console.log(data);

        signIn(data.email, data.password)
        .then(user=>{
            console.log(user.user);
            navigate(go)
        })
    };

    return (
        <div>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Login now!</h1>
                        <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <div className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input {...register("email", { required: true })}  type="text" placeholder="email" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input {...register("password", { required: true })} type="text" placeholder="password" className="input input-bordered" />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <input type="submit" value={'Login'} className='btn btn-primary' />
                            </div>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    );
};

export default Login;