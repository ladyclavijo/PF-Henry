import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./redux/store.jsx";
import "./index.css";
import { createHashRouter, RouterProvider } from 'react-router-dom'
import About from './pages/About/About.jsx'
import Details from './pages/Details/Details.jsx'
import Form from './pages/Form/Form.jsx'
import Home from './pages/Home/Home.jsx'
import Landing from './pages/Landing/Landing.jsx'


const router = createHashRouter([

  { path: '/', element: <Landing /> },

  { path: '/about', element: <About /> },

  { path: '/book/:id', element: <Details /> },

  { path: '/form', element: <Form /> },

  { path: '/home', element: <Home /> },

])

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);
