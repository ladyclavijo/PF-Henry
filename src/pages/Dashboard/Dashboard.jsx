import React, { useState } from "react";
import { useAuth } from "../../context/authContext";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import DashboardUsers from "../../components/DashboardUsers/DashboardUsers";
import MyResponsivePie from "../../components/Graph/ReponsivePie";
import { FaUsers, FaChartBar, FaHome } from "react-icons/fa";
import NavBar from "../../components/NavBar/NavBar";
import "./sidebar.css";


export default function Dashboard() {
  const { user } = useAuth();
  const data = [
    {
      "id": "hack",
      "label": "hack",
      "value": 78,
      "color": "hsl(159, 70%, 50%)"
    },
    {
      "id": "css",
      "label": "css",
      "value": 113,
      "color": "hsl(40, 70%, 50%)"
    },
    {
      "id": "sass",
      "label": "sass",
      "value": 597,
      "color": "hsl(268, 70%, 50%)"
    },
    {
      "id": "python",
      "label": "python",
      "value": 333,
      "color": "hsl(215, 70%, 50%)"
    },
    {
      "id": "go",
      "label": "go",
      "value": 174,
      "color": "hsl(145, 70%, 50%)"
    }
  ]
  const allUsers = useSelector((state) => state.allUsers);
  const [selectedTab, setSelectedTab] = useState("users");

  if (user && allUsers) {
    const users = allUsers.filter((u) => u.id !== user.uid);

    const handleTabChange = (tab) => {
      setSelectedTab(tab);
    };

    return (
      <div className="home-page bg-slate-300 min-h-screen w-screen flex">
        <NavBar />
        <div className="sidebar bg-[#01017A] p-4 flex flex-col justify-between">
          <div className="sidebar-icons-container sticky top-6">
            <div>
              <Link to="/home" className="sidebar-icon text-2xl cursor-pointer">
                <FaHome />
              </Link>
              <div
                className={`sidebar-icon mt-4 ${
                  selectedTab === "users" ? "active" : ""
                } text-2xl mb-4 cursor-pointer`}
                onClick={() => handleTabChange("users")}
              >
                <FaUsers
                  className={`${
                    selectedTab === "users" ? "text-white" : "text-black"
                  } transition-colors duration-300`}
                />
              </div>
              <div
                className={`sidebar-icon ${
                  selectedTab === "graphics" ? "active" : ""
                } text-2xl cursor-pointer`}
                onClick={() => handleTabChange("graphics")}
              >
                <FaChartBar
                  className={`${
                    selectedTab === "graphics" ? "text-white" : "text-black"
                  } transition-colors duration-300`}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="p-4 text-black">
          {selectedTab === "users" && (
            <div>
              {users.map((u) => (
                <DashboardUsers
                  key={u.id}
                  id={u.id}
                  username={u.username}
                  email={u.email}
                  ban={u.isBan}
                  admin={u.isAdmin}
                />
              ))}
            </div>
          )}

          {selectedTab === "graphics" && (
            <div className="border border-red-500">
              <MyResponsivePie
              data={data}
              />
              HOLAAA
            </div>
          )}
        </div>
      </div>
    );
  }
}
