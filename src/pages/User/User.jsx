import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getUserDetail } from "../../redux/actions";

export default function User() {
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserDetail(id));
  }, [dispatch, id]);
  const userDetail = useSelector((state) => state.userDetail);
  return (
    <div>
      <p>ID: {`${userDetail.id}`}</p>
      <p>Username: {`${userDetail.username}`}</p>
      <p>Name: {`${userDetail.name}`}</p>
      <p>Lastname: {`${userDetail.lastname}`}</p>
      <p>Email: {`${userDetail.email}`}</p>
      <p>Country: {`${userDetail.country}`}</p>
      <p>Postal Code: {`${userDetail.postalcode}`}</p>
      <p>Photo: {`${userDetail.photo}`}</p>
      <p>Phone: {`${userDetail.phone}`}</p>
      <p>Payment Method: {`${userDetail.paymentMethod}`}</p>
      <p>Shipping Address: {`${userDetail.shippingAddress}`}</p>
      <p>Active: {`${userDetail.isActive}`}</p>
      <p>Ban: {`${userDetail.isBan}`}</p>
      <p>Admin: {`${userDetail.isAdmin}`}</p>
      <p>Book ID: {`${userDetail.bookId}`}</p>
      <p>Orders: {userDetail.orders}</p>
    </div>
  );
}
