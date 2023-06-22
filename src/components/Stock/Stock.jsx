import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setQuantity } from "../../redux/actions";

export default function Stock({ id, stock, qty }) {
  const quantity = useSelector((state) => state.quantity);
  const [quantitys, setQuantitys] = useState(qty || 1);
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (quantitys >= stock) {
      setErrorMessage("Maximum stock reached");
    } else {
      setErrorMessage("");
    }
  }, [quantitys, stock]);
  const handleDecrease = () => {
    if (quantitys > 1) {
      dispatch(setQuantity({ id: id, qty: qty ? qty - 1 : quantity - 1 }));
      setQuantitys(quantitys - 1);
    }
  };

  const handleIncrease = () => {
    if (quantitys < stock) {
      dispatch(setQuantity({ id: id, qty: qty ? qty + 1 : quantity + 1 }));
      setQuantitys(quantitys + 1);
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
      value = null;
    } else {
      setErrorMessage("");
    }
    dispatch(setQuantity({ id: id, qty: value }));
    setQuantitys(value);
  };

  return (
    <div
      className={
        qty !== undefined
          ? "flex flex-col items-start"
          : "flex flex-col items-center m-2"
      }
    >
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
            value={quantitys}
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
