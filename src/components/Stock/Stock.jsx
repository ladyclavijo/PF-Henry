import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setQuantity } from "../../redux/actions";

export default function Stock({ stock }) {
  const quantity = useSelector((state) => state.quantity);
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (quantity >= stock) {
      setErrorMessage("Maximum stock reached");
    } else {
      setErrorMessage("");
    }
  }, [quantity, stock]);
  const handleDecrease = () => {
    if (quantity > 1) {
      dispatch(setQuantity(quantity - 1));
    }
  };

  const handleIncrease = () => {
    if (quantity < stock) {
      dispatch(setQuantity(quantity + 1));
    }
  };

  const handleInputChange = (e) => {
    let value = parseInt(e.target.value);
    if (isNaN(value)) {
      value = 0;
    }
    if (value >= stock) {
      value = stock;
      setErrorMessage("Maximum stock reached");
    } else if (value <= 0) {
      value = 1;
    } else {
      setErrorMessage("");
    }
    dispatch(setQuantity(value));
  };

  return (
    <div className="flex flex-col items-center m-2">
      <div className="flex justify-between items-center">
        <div className="flex">
          <button
            className="p-2 w-10 bg-[#91AFAE] text-white hover:bg-[#74908F] transition duration-300 ease-in-out"
            onClick={handleDecrease}
          >
            -
          </button>
          <input
            type="numeric"
            value={quantity}
            className="p-2 mx-2 appearance-none w-14 text-center focus:outline-none"
            onChange={handleInputChange}
          />
          <button
            className="p-2 w-10 bg-[#91AFAE] text-white hover:bg-[#74908F] transition duration-300 ease-in-out"
            onClick={handleIncrease}
          >
            +
          </button>
        </div>
      </div>
      {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
    </div>
  );
}
