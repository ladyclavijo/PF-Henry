import React, { Fragment, useEffect, useMemo, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import NavBar from "../../components/NavBar/NavBar.jsx";
import { Link } from "react-router-dom";
import { deleteCarts, deleteFromCart } from "../../redux/actions/index.jsx";
import { clearCart, getCartsDB } from "../../redux/actions/index.jsx";
import { FaTrash } from "react-icons/fa";
import { useAuth } from "../../context/authContext.jsx";
import "../Cart/Cart.css";
import { ThemeContext } from "../../components/ThemeProvider/ThemeProvider.jsx";
import Swal from "sweetalert2";
import "../../Styles/colors.css";
import Stock from "../../components/Stock/Stock.jsx";

export default function Cart() {
  const cartItems = useSelector((state) => state.cart);
  const { user } = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCartsDB());
  }, [cartItems]);

  const allCarts = useSelector((state) => state.allCarts);

  const findCartByUser = allCarts.filter((c) => c.userId === user.uid);

  const handleRemoveCartFromCart = async (productId) => {
    const confirmRemoval = async () => {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "This product will be removed from the cart.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, remove it!",
        cancelButtonText: "Cancel",
      });

      if (result.isConfirmed) {
        const loadingAlert = Swal.fire({
          title: "Removing product...",
          text: "Please wait while the product is being removed.",
          allowOutsideClick: false,
          showConfirmButton: false,
          willOpen: () => {
            Swal.showLoading();
          },
        });

        try {
          await dispatch(
            deleteCarts({
              userId: user.uid,
              bookId: productId,
            })
          );

          await dispatch(deleteFromCart(productId));
          loadingAlert.close();
          Swal.fire("Product removed", "", "success");
        } catch (error) {
          loadingAlert.close();
          Swal.fire(
            "Error",
            "An error occurred while removing the product",
            "error"
          );
        }
      } else {
        console.log("Operation canceled");
      }
    };

    await confirmRemoval();
  };

  const handleClearAllCart = async () => {
    const confirmRemoval = async () => {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "All products in the cart will be removed.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, remove them!",
        cancelButtonText: "Cancel",
      });

      if (result.isConfirmed) {
        const loadingAlert = Swal.fire({
          title: "Removing products...",
          text: "Please wait while the products are being removed.",
          allowOutsideClick: false,
          showConfirmButton: false,
          willOpen: () => {
            Swal.showLoading();
          },
        });

        try {
          for (let i = 0; i < findCartByUser.length; i++) {
            await dispatch(
              deleteCarts({
                userId: findCartByUser[i].userId,
                bookId: findCartByUser[i].bookId,
              })
            );
          }

          await dispatch(clearCart());
          loadingAlert.close();
          Swal.fire("Products removed", "", "success");
        } catch (error) {
          loadingAlert.close();
          Swal.fire(
            "Error",
            "An error occurred while removing products",
            "error"
          );
        }
      } else {
        console.log("Operation canceled");
      }
    };

    await confirmRemoval();
  };
  const { theme } = useContext(ThemeContext);

  const styles = {
    container: {
      backgroundColor: "var(--color-background)",
      color: "var(--color-text)",
    },
    container2: {
      color: "var(--color-text)",
    },
  };
  return (
    <div
      className={`bg-slate-300 min-h-screen flex flex-col`}
      style={styles.container}
    >
      <NavBar />
      <div className="m-6 ">
        <div className="flex items-center justify-between">
          <h1 className="mt-16 font-bold text-3xl ml-10">Your Cart</h1>
          <div>
            <button
              className="mt-2 mt-5 mr-10 px-4 py-2 text-white bg-red-700 rounded hover:bg-red-500"
              onClick={handleClearAllCart}
            >
              Clean Cart
            </button>
          </div>
        </div>
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="mt-5 flex items-start bg-green-200 m-10 p-3 relative card-background"  style={styles.container}
          >
            <img
              className="w-32"
              src={item.cover}
              alt={`${item.title} cover`}
            />
            <div className="ml-2 flex flex-col flex-grow self-start">
              <h3 className="self-start font-bold text-xl">{item.title}</h3>
              <p
                className={`self-start text-gray-500`}
                style={styles.container2}
              >
                Stock: {item.stock}
              </p>
              <div className="color-input">
              <Stock
                id={item.id}
                stock={item.stock}
                qty={item.quantity}
              ></Stock>
              </div>
              <p
                className={`self-start text-gray-500`}
                style={styles.container2}
              >
                Price: {item.price}
              </p>
              <div className="flex flex-col items-start">
                <p className="mt-2 text-green-600 font-bold self-start">
                  Total: {Number((item.price * item.quantity).toFixed(2))}
                </p>
                <button
                  className="mt-2 text-red-600"
                  onClick={() => handleRemoveCartFromCart(item.id)}
                >
                  <FaTrash size={17} />
                </button>
              </div>
            </div>
          </div>
        ))}
        <div className="flex justify-center mt-6">
          <Link to="/buy">
            <button className="px-4 py-2 text-white bg-blue-900 rounded hover:bg-blue-600">
              Complete Purchase
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
