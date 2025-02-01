import { auth } from '../../firebaseConfig';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useHistory } from 'react-router-dom';

export const signInWithGoogle = () => {
    
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
    .then((result) => {
    // Handle successful login
    console.log("Logged in successfully", result.user);
    
    // history.push('/home');
    })
    .catch((error) => {
    // Handle errors
    console.error("Error during login", error);
    });
};