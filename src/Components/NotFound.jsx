import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="hero min-h-screen" style={{ backgroundImage: `url("/BG/404/Na_Nov_26.jpg")` }}>
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-center text-neutral-content">
                <div className="max-w-md">
                    <h1 className="mb-5 text-5xl font-bold">Wo No You Lost</h1>
                    <p className="mb-5">Go back to home </p>
                    <Link to={'/'}><button className="btn btn-primary">Go Back to Home</button></Link>
                </div>
            </div>
        </div>
    );
};

export default NotFound;