import { createContext, useContext, useEffect, useState } from "react";
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    GoogleAuthProvider,
    signInWithPopup,        //le permite al usuario elegir con cuál cuenta de gmail quiere hacer login
    sendPasswordResetEmail,
    sendEmailVerification,
} from "firebase/auth";
import { auth } from "../firebase";

export const authContext = createContext(); //es quien tiene finalmente la info

export const useAuth = () => {
   const context = useContext(authContext)
   if (!context) throw new Error("There is not auth provider - Look at authContext")
   return context
}

export default function AuthProvider ({children}) {

    const [user, setUser ]  = useState(null);        //en user almacena el usuario que se loggeó
    const [loading, setLoading] = useState(true);


    const signup = async(email, password) => {
        await createUserWithEmailAndPassword(auth, email, password);

//------------------ Verification email -----------------
        const user = auth.currentUser;
        await sendEmailVerification(user);
    }
    
    const login = async (email, password) => {
        await signInWithEmailAndPassword(auth, email, password);
    };

    const logout = () => signOut(auth);

    const loginWithGoogle = () => {
        const googleProvider = new GoogleAuthProvider()
        return signInWithPopup(auth, googleProvider)
    };

    const resetPassword = (email) => {
        sendPasswordResetEmail(auth, email )
    };

    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
    }, [])
     

    return (
        <authContext.Provider
         value={{
            signup,
            login,
            user,
            logout,
            loading,
            loginWithGoogle,
            resetPassword,
        }}>
            {children}
        </authContext.Provider>
    ) ; 
}