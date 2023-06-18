import { useEffect, useState } from "react";
import { useAuth } from "../../../context/authContext";
import { Link, useNavigate } from "react-router-dom";
import Alert from "../Alert/Alert";
import { getUsers, registerUser } from "../../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import Swal from 'sweetalert2'

export default function Login() {
  const [users, setUsers] = useState({
    email: "",
    password: "",
  });
  const { user, login, loginWithGoogle, resetPassword } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState();
  console.log('user firebase:', user?.email)

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);


  const allUsers = useSelector((state) => state.allUsers);
  console.log('userDb:' , allUsers)

  const handleChange = ({ target: { name, value } }) => {
    setUsers({ ...users, [name]: value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try{
      if (allUsers && allUsers.length > 0) {
        // Resto del código
        const isBanned =  allUsers.find((userData) => {
          console.log('isBan:', userData.isBan )

          return userData.email ===  users.email && userData.isBan === true
           
          });
          // const nameUser = allUsers.map((e) => e.email === users.email ? e.username : e.username )
        

          if(!isBanned){
            await login(users.email, users.password)
            navigate('/home')
            
          }else{
            const email = 'bookbuster@gmail.com';
            const subject = 'Banned Account';
            const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}`;
             // Reemplaza 'exampleuser@gmail.com' con el correo electrónico real del usuario
          
            const message = `The email user <span style="font-weight: bold; color:#5D5D69;">${users.email}</span> has been banned. Please contact <a href="${mailtoLink}" style="color: #8e6cff;">bookbuster@gmail.com</a> customer support for more information.`;
          
            Swal.fire({
              title: 'Banned!',
              html: message,
              confirmButtonText: 'Ok'
            });
            }
          }
    } catch (error) { 
      console.log(error.code);
      if (error.code === "auth/user-not-found") {
        setError("User Not Found!");
      }
      if (error.code === "auth/wrong-password") {
        setError("Wrong Password!");
      }
      if (error.code === "auth/invalid-email") {
        setError("Please fill in the empty boxes!");
      }
      if (error.code === "auth/missing-password") {
        setError("Missing Password!");
      }

      // setError(error.message);
    }

  }
  //------------------------- GOOGLE ------------------------------//
  const handleGoogleSignin = async () => {
    try {
      const userAvaible = await loginWithGoogle();
      // console.log('AvilableUser:', userAvaible.UserCredentialImpl.user.email)
      if (userAvaible) {
        
        const userDB = allUsers.filter((u) => {
          return u.id === userAvaible.user.uid;
        });

        const banedUserDb =  allUsers.find((u) => {
          // console.log('user1:', u.email)
          // console.log('user2:',userAvaible.user.email)
          // console.log('user3:',u.isBan )
          return u.email === userAvaible.user.email && u.isBan === true;
        });

        if(banedUserDb){
          if (banedUserDb) {
            const email = 'bookbuster@gmail.com';
            const subject = 'Banned Account';
            const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}`;
            const message = `The email user <span style="font-weight: bold; color:#5D5D69;">${userAvaible.user.email}</span> has been banned. Please contact <a href="${mailtoLink}" style="color: #8e6cff;">bookbuster@gmail.com</a> customer support for more information.`;
            
            Swal.fire({
              title: 'Banned!',
              html: message,
              confirmButtonText: 'Ok'
            });
          }
          
      }else if (!userDB.length) {
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

  //----------------- REESTABLECIMIENTO DE CONTRASEÑA --------------------//

  const handleResetPassword = async () => {
    if (!users.email) return setError("Please enter your email");
    try {
      await resetPassword(users.email);
      setError("We sent you an email with a link to reset your password!");
    } catch (error) {
      setError(error.message);
    }
  };

  
  return (
    <div className="bg-slate-300 h-screen text-black flex">
      <div className="w-full max-w-xs m-auto">
        {error && <Alert message={error} />}

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-fold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="youremail@example.com"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-fold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="******"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={handleChange}
            />
          </div>

          <div className="flex items-center justify-between">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Login
            </button>

            <a
              href="#!"
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              onClick={handleResetPassword}
            >
              Forgot Password?
            </a>
          </div>
        </form>

        <p className="my-4 text-sm flex justify-between px-3">
          Don't have an Account? <Link to="/register"> Register</Link>
        </p>

        <button
          onClick={handleGoogleSignin}
          className="bg-slate-50 hover:bg-slate-200 text-black shadow-md rounded border-2 border-gray-300 py-2 px-4 w-full"
        >
          Login with Google
        </button>
      </div>
    </div>
  );
}