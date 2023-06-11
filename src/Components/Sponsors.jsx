import React from 'react';
import { Zoom } from 'react-awesome-reveal';


const Sponsors = () => {
    return (
        <div className='container mx-auto'>
            <h1 className='text-4xl text-center font-semibold mt-32 mb-10'>Athlete Escapes Sponsor's</h1>
            <Zoom>
            <div data-aos="zoom-in" className='grid grid-cols-2 md:flex justify-around '>
                <div className='md:w-36 w-24'>
                    <img src="https://cdn4.iconfinder.com/data/icons/logos-3/600/React.js_logo-1024.png" alt="" />
                    <h1 className='text-center text-xl font-medium'>React</h1>
                </div>
                <div className='md:w-36 w-24'>
                    <img src="https://cdn4.iconfinder.com/data/icons/logos-3/456/nodejs-new-pantone-black-1024.png" alt="" />
                    <h1 className='text-center text-xl font-medium'>Node Js</h1>
                </div>
                <div className='md:w-36 w-24'>
                    <img src="https://cdn4.iconfinder.com/data/icons/logos-3/512/mongodb-2-1024.png" alt="" />
                    <h1 className='text-center text-xl font-medium'>MongoDB</h1>
                </div>
                <div className='md:w-36 w-24'>
                    <img src="https://cdn4.iconfinder.com/data/icons/google-i-o-2016/512/google_firebase-2-1024.png" alt="" />
                    <h1 className='text-center text-xl font-medium'>Firebase</h1>
                </div>
                <div className='md:w-36 w-24'>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg" alt="" />
                    <h1 className='text-center text-xl font-medium'>TailWind</h1>
                </div>
            </div>
            </Zoom>
            
        </div>
    );
};

export default Sponsors;