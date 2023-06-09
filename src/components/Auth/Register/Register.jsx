import { useState } from "react";
import { useAuth } from "../../../context/authContext";
import { Link, useNavigate } from "react-router-dom";
import Alert from "../Alert/Alert";

export default function Register() {

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { signup, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState();
 
//handleChange para ir actualizando el input-estado (email y password)
    const handleChange = ({target: { name, value } }) => {
    setUser({...user, [name]: value});
    };  
    

// para ver finalmente lo que tiene el estado
  const handleSubmit = async (e) => {
    e.preventDefault();                 //evita que se refresque la pág
    setError("");

    try {
      await signup(user.email, user.password);
      navigate("/newuser");            // si está todo OK, se dirige a NewUsersForm
    } catch (error) {
      console.log(error.code)
      if (error.code === "auth/missing-password") {
        setError("Missing Password!")
      }
      if (error.code === "auth/weak-password") {
        setError("Weak Password!")
      }
      if (error.code === "auth/invalid-email") {
        setError("Please fill in the empty boxes!")
      }    
      if (error.code === "auth/email-already-in-use") {
        setError("Email already in use!")
      }      
      if (error.code === "auth/missing-email") {
        setError("Missing email!")
      }     

      // setError(error.message);
    }
  };


  //------------------------- GOOGLE ------------------------------//

  const handleGoogleSignin = async () => {
    try {
      await loginWithGoogle()
      navigate("/welcome");     //si loggea OK redirige a HomeAuth
    } catch (error) {
      setError(error.message)      
    }
  };

      

  return (

   <div className="w-full max-w-xs m-auto">

    {error && <Alert message={error}/>}

    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">

      <div className="mb-4">
      <label htmlFor="email" 
             className="block text-gray-700 text-sm font-bold my-2"
      >
        Email
      </label>
      <input 
        type="email"
        name="email" 
        placeholder="youremail@example.com"
        onChange={handleChange}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
      </div>

      <div className="mb-4">
      <label htmlFor="password"
             className="block text-gray-700 text-sm font-bold my-2"
      >
        Password
      </label>
      <input 
        type="password" 
        name="password" 
        id="password"
        placeholder="******"
        onChange={handleChange}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
      </div>

      <div className="flex justify-center">
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold text-sm py-2 px-4 rounded focus:outline-none focus:shadow-outline">Register</button>
      </div>
    
    </form>

    <p className="my-4 text-sm flex justify-between px-3">Already have an Account? <Link to="/login">Login</Link></p>


    <button onClick={handleGoogleSignin} className="bg-slate-50 hover:bg-slate-200 text-black shadow-md rounded border-2 border-gray-300 py-2 px-4 w-full" >
      Register with Google
    </button>


   </div>
  )
}