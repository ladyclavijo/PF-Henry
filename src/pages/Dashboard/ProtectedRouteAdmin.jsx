import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { useSelector } from "react-redux";

export function ProtectedRouteAdmin({ children }) {
  // const { user } = useAuth();
  // const allUsers = useSelector((state) => state.allUsers);
  // if (user && allUsers) {
  //   const admin = allUsers.filter((u) => {
  //     return u.id === user.uid;
  //   });
  //   const isConditionMet = () => {
  //     if (!user) {
  //       return false;
  //     } else {
  //       if (admin.length > 0 && admin[0].isAdmin === true) {
  //         return true;
  //       } else {
  //         return false;
  //       }
  //     }
  //   };
  //   console.log('conditional', isConditionMet())
    return  <>{children}</> ;
  // } else {
  //   null;
  // }
}
