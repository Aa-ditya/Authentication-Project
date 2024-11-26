import React, { useState, useEffect } from 'react'
import { useFirebase } from '../context/Firebase'
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const firebase = useFirebase();
    const navigate = useNavigate();
    useEffect(() => {
        if (!firebase.isLoggedIn) navigate('/signin')
    }, [])

    // CHECKS IF USER IS LOGGED IN OR NOT

    const handleClick = () => {
        console.log(firebase.isLoggedIn)
        firebase.signOutUser;
        console.log(firebase.isLoggedIn)

        navigate('/signin')
    }
    return (
        <div className=' gap-3 text-3xl flex white uppercase  justify-between'>
            <h1>Home</h1>
            {/* LOGOUT FUNCTIONALITY */}
            <button onClick={handleClick}>Logout</button>
        </div>
    )
}

export default Home