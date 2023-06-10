import React from 'react';
import Banner from '../Components/Banner';
import PopularClasses from '../Components/PopularClasses';
import PopularInstructors from '../Components/PopularInstructors';
import Sponsors from '../Components/Sponsors';

const HomePage = () => {
    return (
        <div>
            <Banner></Banner>
            <PopularClasses></PopularClasses>
            <PopularInstructors></PopularInstructors>
            <Sponsors></Sponsors>
        </div>
    );
};

export default HomePage;