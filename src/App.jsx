import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getBooks } from "./redux/actions/index";
import Landing from "./pages/Landing/Landing";
import Home from "./pages/Home/Home";
import Details from "./pages/Details/Details";
import Form from "./pages/Form/Form"; 
import About from "./pages/About/About";
import Buy from "./pages/Buy/Buy";
import Cart from "./pages/Cart/Cart"
//------------------------- AUTH COMPONENTS ------------------------------//
import HomeAuth from "./components/Auth/HomeAuth/HomeAuth";
import Login from "./components/Auth/Login/Login";
import Register from "./components/Auth/Register/Register";
import NewUsersForm from "./components/Auth/NewUsersForm/NewUsersForm";
import AuthProvider from "./context/authContext";



function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBooks());
  }, [dispatch]);
  const allBooks = useSelector((state) => state.allBooks);
  return (
    <div className="bg-slate-300 h-screen text-black flex"> {/*estilo tailwind*/}
    
      {/* <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements> */}

      <AuthProvider> {/*el Provider es quien me dice de dónde vienen los datos*/}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/book/:id" element={<Details allBooks={allBooks} />} />
        <Route path="/form" element={<Form />} />
        <Route path="/about" element={<About />} />
        <Route path="/buy" element={<Buy />} />
        <Route path="/cart" element={<Cart />} />
  //---------------------- AUTH ROUTES ------------------------------- //
        <Route path="/welcome" element={<HomeAuth />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/newuser" element={<NewUsersForm />} />
      </Routes>
      </AuthProvider>

    </div>
  );
}

export default App;