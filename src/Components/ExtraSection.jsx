import React from 'react';
import LazyLoad from 'react-lazy-load';
import { Link } from 'react-router-dom';


const ExtraSection = () => {
    return (

        <div>
            <h1 className='text-center text-3xl font-semibold my-20'>Became A Champion</h1>
            <LazyLoad>
                <div className="hero bg-fixed min-h-screen" style={{ backgroundImage: `url("/BG/full-shot-happy-kids-with-trophy.jpg")` }}>
                    <div className="hero-overlay bg-opacity-60"></div>
                    <div className="hero-content text-center text-neutral-content">
                        <div className="max-w-md">
                            <h1 className="mb-5 text-5xl font-bold">Have Passion In Football</h1>
                            <p className="mb-5">Passionate about football? Join our course! Enhance your skills, learn from expert instructors, and connect with fellow football enthusiasts. Take your game to the next level!</p>
                            <Link to={'/classes'}><button className="btn btn-primary">Get Started</button></Link>
                        </div>
                    </div>
                </div>
            </LazyLoad>
        </div>
    );
};

export default ExtraSection;