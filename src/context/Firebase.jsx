import React, { createContext, useContext } from "react";
import { useEffect, useState } from "react";
import { initializeApp } from "firebase/app"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, GoogleAuthProvider, signInWithPopup } from "firebase/auth"

const FirebaseContext = createContext();

const firebaseConfig = {
    apiKey: "AIzaSyDZxY41DEK4q9Z0oFTZ_eqGKxJY4ARnS0A",
    authDomain: "firstfiling-ada86.firebaseapp.com",
    databaseURL: "https://firstfiling-ada86-default-rtdb.firebaseio.com",
    projectId: "firstfiling-ada86",
    storageBucket: "firstfiling-ada86.firebasestorage.app",
    messagingSenderId: "820479415841",
    appId: "1:820479415841:web:aa9b78b95adee6f80df560"
};

//iNITIALIZE THE APP
const FirebaseApp = initializeApp(firebaseConfig)
const firebaseAuth = getAuth(FirebaseApp);
const googleProvider = new GoogleAuthProvider(FirebaseApp);

export const useFirebase = () => useContext(FirebaseContext);

export const FirebaseProvider = (props) => {


    const [user, setUser] = useState(null);

    useEffect(() => {
        onAuthStateChanged(firebaseAuth, (user) => {
            if (user) {
                console.log(user);
                setUser(user);

            } else {
                setUser(null);
            }
            ;
        })
    }, [])
    //FOR SIGNING UP THE USER 
    const registerUserWithEmailAndPassword = (email, password) => {
        createUserWithEmailAndPassword(firebaseAuth, email, password)
            .then(user => {
                alert("successfully created");
            })
            .catch((e) => alert(e))
    }
    //FOR SIGNING IN THE USER
    const signInUser = (email, password) => {
        signInWithEmailAndPassword(firebaseAuth, email, password)
            .then(user => alert("sign in successful"))
            .catch(e => alert(e));
    }
    //SIGNING OUT THE USER
    const signOutUser = signOut(firebaseAuth);

    const isLoggedIn = user ? true : false;
    const signinWithGoogle = () => signInWithPopup(firebaseAuth, googleProvider);
    return (
        <FirebaseContext.Provider value={{ registerUserWithEmailAndPassword, signInUser, isLoggedIn, signOutUser, signinWithGoogle }}>
            {props.children}
        </FirebaseContext.Provider>
    )
}