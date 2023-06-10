import React from 'react';
import Banner from '../Components/Banner';
import PopularClasses from '../Components/PopularClasses';
import PopularInstructors from '../Components/PopularInstructors';

const HomePage = () => {
    return (
        <div>
            <Banner></Banner>
            <PopularClasses></PopularClasses>
            <PopularInstructors></PopularInstructors>
        </div>
    );
};

export default HomePage;