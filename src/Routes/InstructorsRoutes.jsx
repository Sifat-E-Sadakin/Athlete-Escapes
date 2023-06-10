import { useContext } from 'react';
import useInstructor from '../Hooks/useInstructor';
import { userAuth } from '../Providers/UserProvider';
import { Navigate } from 'react-router-dom';


const InstructorsRoutes = ({children}) => {
  
    let {isInstructor, } =  useInstructor()
    let role = isInstructor?.isInstructor


    let {user, loading} = useContext(userAuth)

    if(user && role){
        return children
    }



    return <Navigate to={'/'}></Navigate>
};

export default InstructorsRoutes;