
import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../../context/authContext";
import { getUserDetail } from "../../redux/actions/index";
import NavBar from "../../components/NavBar/NavBar";
import {
  FaFileInvoiceDollar,
  FaUserTag,
  FaBook,
  FaShoppingBag,
  FaMoneyBillWave,
} from "react-icons/fa";

import {
  MdOutlinePayments
} from "react-icons/md"

import "../UserSales/UserSales.css";
import Footer from "../Footer/Footer";
const UserSales = () => {
  const dispatch = useDispatch();
  const userLogged = useAuth()?.user?.uid;
  const currentUser = useSelector((state) => state.userDetail);

  const [show_orders, setShow_orders] = useState(false)

  console.log(currentUser);
  useEffect(() => {
    dispatch(getUserDetail(userLogged));
  }, [dispatch, userLogged]);




  return (
    <div className="userSalesBody">
      <header className="header"> <NavBar></NavBar> </header>
      <main className="flex-col">
        <div className="revenue-salesperbook">
        <section className="total_revenue">
          <div className="finiquitar">
          <div className="revenueTitel">Total revenue</div>
          <div className="total_revenue_info">
          <MdOutlinePayments className="icon_revenue"/>
          <span>${currentUser?.mySales?.totalRevenue}</span>
          </div>
          </div>
        </section>
        <section className="revenueByBook_conteiner">
          <div className="revenuePerBook_title">
          <h2>Revenue per book</h2>
          </div>
          <div>
            {currentUser?.mySales?.revenueByBook?.map((element) => {
              return (
                <div className="revenueByBook">
                  <img src={element.cover} alt="bookImg" />
                  <div className="revenueByBook-info">
                  <h3 className="title">{element.title}</h3>
                  <div className="icon-info-revenue">
                      <FaMoneyBillWave className="icon" />
                      <h3>${element.total}</h3>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
        </div>
        <section className="Sales-Section">
          <div className="MySale-title" >
          <h2>My Sales</h2>
          </div>
           {currentUser?.mySales?.allOrders?.flat().map((elem) => {

            return (
              <div className="allOrders">
                <h1>{elem.purchasedAt.slice(0, 10)}</h1>
                <div className="orderContent">
                  <img src={elem.cover} alt="" />
                  <div>
                    <h3 className="title">{elem.title}</h3>
                    <div className="icon-info">
                      <FaFileInvoiceDollar className="icon" />
                      <h2>Orden number {elem.id}</h2>
                    </div>
                    <div className="icon-info">
                      <FaUserTag className="icon" />
                      <h2>Purchased by {elem.buyerId}</h2>
                    </div>
                    <div className="icon-info">
                      <FaBook className="icon" />
                      <h2>ID {elem.items.id}</h2>
                    </div>
                    <div className="icon-info">
                      <FaShoppingBag className="icon" />
                      <h2>Amount purchased {elem.items.qty}</h2>
                    </div>
                    <div className="icon-info-revenue">
                      <FaMoneyBillWave className="icon" />
                      <h3>${elem.total}</h3>
                    </div>
                  </div>
                </div>
              </div>
            );

          })} 
        </section>
      </main>
      <footer >
        <Footer/>

      </footer>
    </div>
  );
};

export default UserSales;
