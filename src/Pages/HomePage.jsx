import React from 'react';
import Banner from '../Components/Banner';
import PopularClasses from '../Components/PopularClasses';
import PopularInstructors from '../Components/PopularInstructors';
import Sponsors from '../Components/Sponsors';
import { Helmet } from 'react-helmet';
import ExtraSection from '../Components/ExtraSection';

const HomePage = () => {


    return (
        <div>
            <Helmet>
                <title>Home | Athlete Escapes</title>
            </Helmet>
            <Banner></Banner>
            <PopularClasses></PopularClasses>
            <PopularInstructors></PopularInstructors>
            <ExtraSection></ExtraSection>
            <Sponsors></Sponsors>
        </div>
    );
};

export default HomePage;