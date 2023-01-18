import React from "react";

import EditAvatar from "./pages/EditAvatar";
import Home from "./pages/Home";
import Navigation from "./components/Navigation";

import { Routes, Route, useParams } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { useDispatch } from "react-redux";
import { fetchGetMe } from "./redux/slices/authSlice";
import FullPost from "./pages/FullPost";
import Cart from "./pages/Cart";
import PageNotFound from "./pages/PageNotFound";
import Checkout from "./pages/Checkout";
import ConfirmPage from "./pages/ConfirmPage";
import { useSelector } from "react-redux";

import Admin from "./pages/Admin";
import AdminPurchase from "./pages/AdminPurchase";

const App = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchGetMe());
  }, []);

  return (
    <>
      <Navigation />
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<EditAvatar />} path="edit-avatar" />
        <Route element={<LoginPage />} path="login" />
        <Route element={<RegisterPage />} path="register" />
        <Route element={<FullPost />} path="/items/:id" />
        <Route element={<Cart />} path="cart" />
        <Route element={<Checkout />} path="/checkout" />
        <Route element={<ConfirmPage />} path="/confirm" />
        <Route element={<Admin />} path="/admin" />
        <Route element={<AdminPurchase />} path="/admin/:id" />
        <Route element={<PageNotFound />} path="*" />
      </Routes>
    </>
  );
};

export default App;
