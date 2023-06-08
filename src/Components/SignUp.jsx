import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { userAuth } from '../Providers/UserProvider';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {

    let { createUser, updateUser , googlePopUp} = useContext(userAuth);

    let navigate = useNavigate()

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => {
        console.log(data);
        createUser(data.email, data.password)
        .then(userCredential=>{
            let user = userCredential.user;
            console.log(user);
            updateUser(data.name, data.photo)
            let newUser = {name: data.name, email: user.email, photo:data.photo, role: 'student'}
            navigate('/')
            fetch('http://localhost:3000/users',{
                method: 'POST',
                headers: {
                    'content-type' : 'application/json'
                },
                body: JSON.stringify(newUser)
            })
            .then(res => res.json())
            .then(data => console.log(data))
        })
        .catch(err=>{
            console.log(err.message);
        })
    };

    let google = ()=>{
        googlePopUp()
        .then(newUser=>{
            navigate('/')
            console.log(newUser.user.displayName);
            let gUser = {name: newUser.user.displayName, email: newUser.user.email, photo: newUser.user.photoURL, role: 'student'}
            fetch('http://localhost:3000/users',{
                method: 'POST',
                headers: {
                    'content-type' : 'application/json'
                },
                body: JSON.stringify(gUser)
            })
            .then(res => res.json())
            .then(data => console.log(data))

        })
    }

    return (
        <div>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Sign Up now!</h1>
                        <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
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
                                    <span className="label-text">Password</span>
                                </label>
                                <input {...register("password", { required: true })} type="text" placeholder="Password" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Confirm Password</span>
                                </label>
                                <input type="text" placeholder="Confirm password" className="input input-bordered" />

                            </div>
                            <div className="form-control mt-6">
                                <input type="submit" value={'Sign Up '} className='btn btn-primary' />
                            </div>
                        </div>
                        <button onClick={google} className='btn'>G</button>
                    </form>
                    
                </div>
            </div>

        </div>
    );
};

export default SignUp;