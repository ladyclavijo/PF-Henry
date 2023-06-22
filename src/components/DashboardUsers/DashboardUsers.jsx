import React, { useState } from "react";
import { updateUser } from "../../redux/actions";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

export default function DashboardUsers({ id, username, email, admin, ban }) {
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    id,
    isAdmin: admin,
    isBan: ban,
  });
  const URL = `/user/${id}`;
  const handleAdmin = () => {
    if (user.isAdmin === true) {
      dispatch(updateUser({ ...user, isAdmin: false }));
      setUser({ ...user, isAdmin: false });
    } else {
      dispatch(updateUser({ ...user, isAdmin: true }));
      setUser({ ...user, isAdmin: true });
    }
  };
  const handleBan = () => {
    if (user.isBan === true) {
      dispatch(updateUser({ ...user, isBan: false }));
      setUser({ ...user, isBan: false });
    } else {
      dispatch(updateUser({ ...user, isBan: true }));
      setUser({ ...user, isBan: true });
    }
  };
  return (
    <div className="flex items-center justify-between  p-4">
      <div className="mr-4">
        <p>{username}</p>
        <p>{email}</p>
      </div>
      <div className="flex items-center">
        <div className="mr-2">
          {user.isAdmin === true ? (
            <button className="clear-filters-button" onClick={handleAdmin}>
              BAJAR RANGO
            </button>
          ) : (
            <button className="clear-filters-button" onClick={handleAdmin}>
              SUBIR RANGO
            </button>
          )}
        </div>
        <div>
          {user.isBan === true ? (
            <button className="clear-filters-button" onClick={handleBan}>
              QUITAR BAN
            </button>
          ) : (
            <button className="clear-filters-button" onClick={handleBan}>
              APLICAR BAN
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
