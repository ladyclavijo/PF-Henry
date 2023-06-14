import { useAuth } from "../../context/authContext";
import { useDispatch, useSelector } from "react-redux";
import "./MyAccount.css";
import { useEffect } from "react";
import { getUsers } from "../../redux/actions/index";
import NavBar from "../../components/NavBar/NavBar";

const MyAccount = () => {
  const users = useSelector((state) => state.allUsers);
  const dispatch = useDispatch();
  const { user, loading, loginWithGoogle } = useAuth(); // Utiliza el hook useAuth del contexto
  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  if (loading) {
    // Aquí puedes mostrar un indicador de carga mientras se verifica la autenticación
    return <p>Loading...</p>;
  }

  const currentUser = users.find((u) => u.email === user?.email);

  return (
    <>
      <NavBar />
      <div className="my-account-container">
        <h2 className="welcome-title">
          WELCOME{" "}
          <span className="name" style={{ color: "#266386" }}>
            {currentUser ? currentUser.username.toUpperCase() : user.username }
          </span>
        </h2>

        {currentUser ? (
          <div className="user-info">
            {currentUser.username && currentUser.lastname && currentUser.country && currentUser.phone ? (
              <>
                <div className="info-item">
                  <strong>Name </strong> {currentUser.username} {currentUser.lastname}
                </div>
                <div className="info-item">
                  <strong>Email </strong> {currentUser?.email}
                </div>
                <div className="info-item">
                  <strong>Country </strong> {currentUser?.country}
                </div>
                <div className="info-item">
                  <strong>Phone </strong> {currentUser?.phone}
                </div>
              </>
            ) : (
              <div className="info-item">
                <strong>Email </strong> {currentUser?.email}
              </div>
            )}
          </div>
        ) : (
          <>
            <p className="no-user">No user logged in</p>
            <button onClick={loginWithGoogle}>Login with Google</button>
          </>
        )}
      </div>
    </>
  );
};

export default MyAccount;