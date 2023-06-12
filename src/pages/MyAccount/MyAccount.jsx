import { useAuth } from "../../context/authContext";
import { useSelector } from "react-redux";
import "./MyAccount.css";

import NavBar from "../../components/NavBar/NavBar";

const MyAccount = () => {
  const users = useSelector((state) => state.allUsers);
  const { user } = useAuth();
  const currentUser = users.find((u) => u.email === user?.email);

  return (
    <>
      <NavBar />
      <div className="my-account-container">
        <h2 className="welcome-title">
          WELCOME{" "}
          <span className="name" style={{ color: "#266386" }}>
            {currentUser && currentUser.name
              ? currentUser.name.toUpperCase()
              : currentUser.username.toUpperCase()}
          </span>
        </h2>

        {currentUser ? (
          <div className="user-info">
            <div className="info-item">
              <strong>Name</strong>{" "}
              {currentUser && currentUser.name
                ? currentUser.name
                : currentUser.username}
            </div>
            <div className="info-item">
              <strong>Email</strong> {currentUser?.email}
            </div>
            <div className="info-item">
              <strong>Country</strong> {currentUser?.country}
            </div>
            <div className="info-item">
              <strong>Phone</strong> {currentUser?.phone}
            </div>
          </div>
        ) : (
          <p className="no-user">No user logged in</p>
        )}
      </div>
    </>
  );
};

export default MyAccount;
