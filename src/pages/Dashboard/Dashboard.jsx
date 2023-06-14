import React from "react";
import { useAuth } from "../../context/authContext";
import { useSelector } from "react-redux";
import DashboardUsers from "../../components/DashboardUsers/DashboardUsers";

export default function Dashboard() {
  const { user } = useAuth();
  const allUsers = useSelector((state) => state.allUsers);
  if (user && allUsers) {
    const users = allUsers.filter((u) => {
      return u.id !== user.uid;
    });
    return (
      <div>
        {users.map((u) => {
          return (
            <DashboardUsers
              key={u.id}
              id={u.id}
              username={u.username}
              email={u.email}
              ban={u.isBan}
              admin={u.isAdmin}
            />
          );
        })}
      </div>
    );
  }
}
