import { useEffect, useState } from "react";
import { useAuth } from "../../../context/authContext";
import { Link, useNavigate } from "react-router-dom";
import Alert from "../Alert/Alert";
import { getUsers, registerUser } from "../../../redux/actions";
import { useDispatch, useSelector } from "react-redux";

export default function Register() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);
  const allUsers = useSelector((state) => state.allUsers);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { signup, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState();
  const [showAlert, setShowAlert] = useState(false); //<-------- MENSAJE PARA VERIFICACION DEL MAIL


  //handleChange para ir actualizando el input-estado (email y password)
  const handleChange = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value });
  };


  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await signup(user.email, user.password);
      setShowAlert(true);
      // navigate("/newuser"); 
    } catch (error) {
      console.log(error.code);
      if (error.code === "auth/missing-password") {
        setError("Missing Password!");
      }
      if (error.code === "auth/weak-password") {
        setError("Weak Password!");
      }
      if (error.code === "auth/invalid-email") {
        setError("Please fill in the empty boxes!");
      }
      if (error.code === "auth/email-already-in-use") {
        setError("Email already in use!");
      }
      if (error.code === "auth/missing-email") {
        setError("Missing email!");
      }

      // setError(error.message);
    }
  };

  //------------------------- GOOGLE ------------------------------//

  const handleGoogleSignin = async () => {
    try {
      const userAvaible = await loginWithGoogle();
      if (userAvaible) {
        const userDB = allUsers.filter((u) => {
          return u.id === userAvaible.user.uid;
        });
        if (!userDB.length) {
          const userGoogle = {
            id: userAvaible.user.uid,
            username: userAvaible.user.displayName,
            email: userAvaible.user.email,
          };
          dispatch(registerUser(userGoogle));
          navigate("/home");
        } else {
          navigate("/home");
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="bg-slate-300 h-screen text-black flex">
      <div className="contenedorRegister w-full max-w-xs m-auto">
        {error && <Alert message={error} />}

        <form
          onSubmit={handleSubmit}
          className="correoRegistro bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className=" coso mb-4">
            <label
              htmlFor="email"
              className="textoEmail block text-gray-700 text-sm font-bold my-2"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="youremail@example.com"
              onChange={handleChange}
              className="textoOtroEmail shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="ParaPassword mb-4">
            <label
              htmlFor="password"
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
              className="TextPassword shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="flex justify-center">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold text-sm py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Register
            </button>
          </div>
        </form>
{/* --------------------- MENSAJE PARA QUE VERIFIQUEN EL EMAIL  -------------------*/}
          {showAlert && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4 text-center flex flex-col">
              <span className="text center mb-2">
              Please verify your email to continue with the registration.
              </span>
              <button
                onClick={() => {
                  setShowAlert(false);
                  navigate("/newuser");
                }}
                className="bg-red-500 hover:bg-red-700 text-white font-bold text-sm py-2 px-4 rounded focus:outline-none focus:shadow-outline mx-auto w-min"
              >
                Next
             </button>
           </div>
          )}
{/* -------------------------------------------------------------------------------- */}

        <p className="my-4 text-sm flex justify-between px-3">
          Already have an Account? <Link to="/login">Login</Link>
        </p>

        <button
          onClick={handleGoogleSignin}
          className="bg-slate-50 hover:bg-slate-200 text-black shadow-md rounded border-2 border-gray-300 py-2 px-4 w-full"
        >
          Register with Google
        </button>
      </div>
    </div>
  );
}
