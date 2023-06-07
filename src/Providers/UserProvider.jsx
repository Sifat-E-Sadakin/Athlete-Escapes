import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { app } from '../Firebase/Firebase.config';

export let userAuth = createContext(null)

const UserProvider = ({children}) => {

    let [user, setUser] = useState(null)
    let [loading, setLoading] = useState(true)

    const auth = getAuth(app);

    let createUser = (email, password)=>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }

    let signIn = (email, password)=>{
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }

    useEffect(()=>{
        let unsubscribe = onAuthStateChanged(auth, getUser=>{
            setUser(getUser);
            console.log('onAuthState', getUser);
            setLoading(false)

            if(getUser){
                fetch(`http://localhost:3000/jwt`,{
                method: 'POST',
                headers : {
                    'content-type' : 'application/json'
                },
                body : JSON.stringify(getUser)
            })
            .then(res=> res.json())
            .then(data =>{
                console.log(data);
                localStorage.setItem('WT', data.token)
               
            })
            }
            else{
                localStorage.removeItem('WT')
            }

            

        })

        return() =>{
            unsubscribe();
        }
    },[])

    let logOut = ()=>{
        setLoading(true)
        return signOut(auth);
    }

    let userInfo = {
        user,
        createUser,
        signIn,
        loading,
        logOut
    }


    return (
        <userAuth.Provider value={userInfo}>
            {children}
        </userAuth.Provider>
    );
};

export default UserProvider;