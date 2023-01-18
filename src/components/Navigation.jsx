import React from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@mui/material";
import { logOut } from "../redux/slices/authSlice";
import CartPopup from "./CartPopup";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Navigation = () => {
  const isAuth = Boolean(useSelector((state) => state.auth.data));
  const dispatch = useDispatch();
  const onHandleLogOut = () => {
    dispatch(logOut());
    window.localStorage.removeItem("token");
  };

  const cartItems = useSelector((state) => state.items.cart);
  const totalCount = cartItems.reduce((sum, item) => {
    return sum + item.count;
  }, 0);
  const isAdmin = useSelector((state) => state.auth.admin);

  return (
    <div className="flex container mx-auto my-5 justify-between items-center text-xl font-mono text-[#1c1917]">
      <Link to="/">
        <div className="p-4 bg-blue-600 text-white font-bold rounded-lg">
          Shop
        </div>
      </Link>
      <div className=" flex gap-4 items-center">
        {isAuth ? (
          <>
            <div className="relative">
              <CartPopup />
              <span className="absolute bg-blue-500  flex justify-center items-center right-[-15px] top-[20px] text-white text-center font-bold rounded-full">
                {totalCount > 0 && totalCount}
              </span>
            </div>
            <div></div>
            <Link to="/admin">
              <Button variant="outlined">Заказы</Button>
            </Link>
            <Button variant="contained" onClick={onHandleLogOut}>
              Выйти
            </Button>
          </>
        ) : (
          <>
            <div className="relative">
              <CartPopup />
              <span className="absolute bg-blue-500  flex justify-center items-center right-[-15px] top-[20px] text-white text-center font-bold rounded-full">
                {totalCount}
              </span>
            </div>

            {/* <Link to="login">Login</Link>
            <Link to="register">Register</Link> */}
          </>
        )}
      </div>
    </div>
  );
};

export default Navigation;
