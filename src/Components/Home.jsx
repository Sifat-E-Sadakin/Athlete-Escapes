import React, { useContext } from 'react';
import { userAuth } from '../Providers/UserProvider';

const Home = () => {
    let {user} = useContext(userAuth)
    return (
        <div>
            <h1>Home of </h1>
            
        </div>
    );
};

export default Home;