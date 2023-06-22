import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/authContext";
import { getUsers, registerUser } from "../../../redux/actions";

export default function NewUsersForm() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formUsername, setFormUsername] = useState(false);
  const [formPhone, setFormPhone] = useState(false);
  const { user } = useAuth();
  const userEmail = user.email;
  const userID = user.uid;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);
  const allUsers = useSelector((state) => state.allUsers);
  const [input, setInput] = useState({
    username: "",
    // password: "",
    // email: "",
    name: "",
    lastname: "",
    country: "",
    phone: "",
  });
  const usernameDB = allUsers.filter((u) => {
    return u.username === input.username;
  });
  const phoneDB = allUsers.filter((u) => {
    return u.phone === input.phone;
  });

  const [validation, setValidation] = useState({
    username: false,
    // password: false,
    // email: false,
    name: false,
    lastname: false,
    country: false,
    phone: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
    setValidation({ ...validation, [name]: value.trim() === "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      input.username.trim() === "" ||
      // input.password.trim() === "" ||
      // input.email.trim() === "" ||
      input.name.trim() === "" ||
      input.lastname.trim() === "" ||
      input.country.trim() === "" ||
      input.phone.trim() === ""
    ) {
      setFormSubmitted(true);
      return;
    } else if (usernameDB.length) {
      setFormUsername(true);
      return;
    } else if (phoneDB.length) {
      setFormPhone(true);
      return;
    }

    try {
      const user = {
        id: userID,
        username: input.username,
        name: input.name,
        lastname: input.lastname,
        email: userEmail,
        country: input.country,
        phone: Number(input.phone),
      };

      dispatch(registerUser(user));
      navigate("/home");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full max-w-xs m-auto">
      <h1 className="text-center text-2xl font-bold mb-3 text-blue-700">
        Complete Your Information!
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-gray-700 text-sm font-bold my-2"
          >
            Username:
            {formSubmitted && input.username.trim() === "" && (
              <span className="text-red-500">*</span>
            )}
          </label>
          <input
            type="username"
            name="username"
            id="username"
            placeholder="Your Username"
            value={input.username}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {formSubmitted && input.username.trim() === "" && (
            <div className="text-red-500 text-xs mt-1">Required field.</div>
          )}
          {formUsername && (
            <div className="text-red-500 text-xs mt-1">
              This username already exists
            </div>
          )}
        </div>

        {/* <div className="mb-4">
            <label htmlFor="password"
                   className="block text-gray-700 text-sm font-bold my-2"
            >
                Password:{formSubmitted && input.password.trim() === "" && (
                <span className="text-red-500">*</span>
                )}
            </label>
            <input
                type="password"
                name="password"
                id="password"
                placeholder="******"
                value={input.password}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
                {formSubmitted && input.password.trim() === "" && (
                    <div className="text-red-500 text-xs mt-1">Required field.</div>
                 )}
            </div> */}

        {/* 
            <div className="mb-4">
            <label htmlFor="email"
                   className="block text-gray-700 text-sm font-bold my-2"
            >
                Email:{formSubmitted && input.email.trim() === "" && (
                <span className="text-red-500">*</span>
                )}
            </label>
            <input
                type="email"
                name="email"
                id="email"
                placeholder="Your Email"
                value={input.email}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
                {formSubmitted && input.email.trim() === "" && (
                    <div className="text-red-500 text-xs mt-1">Required field.</div>
                 )}
            </div> */}

        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-gray-700 text-sm font-bold my-2"
          >
            Name:
            {formSubmitted && input.name.trim() === "" && (
              <span className="text-red-500">*</span>
            )}
          </label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Your Name"
            value={input.name}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {formSubmitted && input.name.trim() === "" && (
            <div className="text-red-500 text-xs mt-1">Required field.</div>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="lastname"
            className="block text-gray-700 text-sm font-bold my-2"
          >
            Lastname:
            {formSubmitted && input.lastname.trim() === "" && (
              <span className="text-red-500">*</span>
            )}
          </label>
          <input
            type="text"
            name="lastname"
            id="lastname"
            placeholder="Your Lastname"
            value={input.lastname}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {formSubmitted && input.lastname.trim() === "" && (
            <div className="text-red-500 text-xs mt-1">Required field.</div>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="country"
            className="block text-gray-700 text-sm font-bold my-2"
          >
            Country:
            {formSubmitted && input.country.trim() === "" && (
              <span className="text-red-500">*</span>
            )}
          </label>
          <input
            type="text"
            name="country"
            id="country"
            placeholder="Your Country"
            value={input.country}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {formSubmitted && input.country.trim() === "" && (
            <div className="text-red-500 text-xs mt-1">Required field.</div>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="phone"
            className="block text-gray-700 text-sm font-bold my-2"
          >
            Phone:
            {formSubmitted && input.phone.trim() === "" && (
              <span className="text-red-500">*</span>
            )}
          </label>
          <input
            type="number"
            name="phone"
            id="phone"
            placeholder="Your Phone"
            value={input.phone}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {formSubmitted && input.phone.trim() === "" && (
            <div className="text-red-500 text-xs mt-1">Required field.</div>
          )}
          {formPhone && (
            <div className="text-red-500 text-xs mt-1">
              This phone number already exists
            </div>
          )}
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold text-sm py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Let's Go!
          </button>
        </div>
      </form>
    </div>
  );
}
