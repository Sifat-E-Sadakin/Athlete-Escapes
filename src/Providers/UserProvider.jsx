import React, { createContext, useEffect, useState } from 'react';
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { app } from '../Firebase/Firebase.config';

export let userAuth = createContext(null)

const UserProvider = ({children}) => {

    let [user, setUser] = useState(null)
    let [loading, setLoading] = useState(true)

    const auth = getAuth(app);

    const googleProvider = new GoogleAuthProvider();

    let googlePopUp = () =>{
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }

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
            console.log(loading);

            if(getUser){
                fetch(`https://assignment-12-server-ochre-rho.vercel.app/jwt`,{
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
               setLoading(false)
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

    let updateUser = (name, photo)=>{
        setLoading(true);
        return updateProfile(auth.currentUser,{
            displayName : name,
            photoURL : photo
        })
    }



    let logOut = ()=>{
        setLoading(true)
        return signOut(auth);
    }

    let userInfo = {
        user,
        createUser,
        signIn,
        loading,
        logOut,
        updateUser,
        googlePopUp
    }


    return (
        <userAuth.Provider value={userInfo}>
            {children}
        </userAuth.Provider>
    );
};

export default UserProvider;