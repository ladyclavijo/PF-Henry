import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo } from "react";
import { getBooks, getCartsDB, getUsers } from "./redux/actions/index";
import Landing from "./pages/Landing/Landing";
import Home from "./pages/Home/Home";
import Details from "./pages/Details/Details";
import Form from "./pages/Form/Form";
import About from "./pages/About/About";
import Buy from "./pages/Buy/Buy";
import Cart from "./pages/Cart/Cart";
import MyAccount from "./pages/MyAccount/MyAccount";
import Dashboard from "./pages/Dashboard/Dashboard";
import User from "./pages/User/User";
import Sales from "./pages/Sales/Sales";
import TermsandConditions from "./components/Footer/Tac/TermsandConditions";
import Privacy from "./components/Footer/Pp/Privacy";
import ReturnPolicies from "./components/Footer/Rp/ReturnPolicies";
import ReactGA from "react-ga";
ReactGA.initialize("G-P14D1VL6YW");
ReactGA.pageview(window.location.pathname + window.location.search);
//------------------------- AUTH COMPONENTS ------------------------------//
import Login from "./components/Auth/Login/Login";
import Register from "./components/Auth/Register/Register";
import NewUsersForm from "./components/Auth/NewUsersForm/NewUsersForm";
import AuthProvider from "./context/authContext";
import { ProtectedRoute } from "./components/Auth/ProtectedRoute/ProtectedRoute";
import { ProtectedRouteAdmin } from "./pages/Dashboard/ProtectedRouteAdmin";
import { ThemeProvider } from "./components/ThemeProvider/ThemeProvider"; // <--- para el darkMode

function App() {
  console.log("Hello World!!");
  const dispatch = useDispatch();
  const allBooks = useSelector((state) => state.allBooks);
  useEffect(() => {
    dispatch(getBooks());
    dispatch(getUsers());
    dispatch(getCartsDB());
  }, [dispatch]);

  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  return (
    <ThemeProvider>
      <div>
        {" "}
        {/*estilo tailwind*/}
        {/* <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements> */}
        <AuthProvider>
          {" "}
          {/*el Provider es quien me dice de dónde vienen los datos*/}
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/home" element={<Home />} />
            <Route path="/sales" element={<Sales />} />
            <Route path="/book/:id" element={<Details allBooks={allBooks} />} />
            <Route
              path="/form"
              element={
                <ProtectedRoute>
                  <Form />
                </ProtectedRoute>
              }
            />
            <Route path="/about" element={<About />} />
            <Route
              path="/buy"
              element={
                <ProtectedRoute>
                  <Buy />
                </ProtectedRoute>
              }
            />
            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <Cart />
                </ProtectedRoute>
              }
            />
            <Route
              path="/myaccount"
              element={
                <ProtectedRoute>
                  <MyAccount />
                </ProtectedRoute>
              }
            />
            <Route
              path="/termsandconditions"
              element={<TermsandConditions />}
            />
            <Route path="/privacypolicy" element={<Privacy />} />
            <Route path="/returnpolicies" element={<ReturnPolicies />} />
            {/*---------------------- AUTH ROUTES ------------------------------- */}

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/newuser" element={<NewUsersForm />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRouteAdmin>
                  <Dashboard />
                </ProtectedRouteAdmin>
              }
            />
            <Route
              path="/user/:id"
              element={
                <ProtectedRouteAdmin>
                  <User />
                </ProtectedRouteAdmin>
              }
            />
          </Routes>
        </AuthProvider>
      </div>
    </ThemeProvider>
  );
}

export default App;
