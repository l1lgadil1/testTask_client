import React from "react";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useSelector } from "react-redux";
import { Button } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Link } from "react-router-dom";

const CartPopup = () => {
  const [isCartOpen, setIsCartOpen] = React.useState(false);

  const cart = useSelector((state) => state.items.cart);

  const totalPrice = useSelector((state) => state.items.totalPrice);
  const totalCount = cart.reduce((sum, item) => {
    return sum + item.count;
  }, 0);

  return (
    <div className="">
      <div
        className="cursor-pointer"
        onClick={() => setIsCartOpen((prev) => !prev)}
      >
        <ShoppingCartOutlinedIcon />
      </div>
      {isCartOpen && (
        <div className="p-2 h-auto min-w-[500px] flex flex-col absolute right-0 z-10 bg-white rounded-md border shadow ">
          <h1 className="text-lg font-[600]">Items in cart:</h1>
          <div className="flex flex-col items-center gap-2 pb-2 border-b">
            {cart.map((item, index) => (
              <div className="flex items-center gap-2" key={index}>
                <img
                  className="w-[80px] h-[80px]"
                  src={item.imageUrl}
                  alt="itemimg"
                />
                <h1 className="text-md font-[600]">
                  {item.title} x({item.count})
                </h1>
                <b className="text-sm w-1/6">{item.price * item.count}</b>
              </div>
            ))}
          </div>
          <div className="flex justify-between py-2 border-b">
            <div className="text-xl">
              <span className="font-[600] ">Subtotal</span>{" "}
              <span>({totalCount})</span>{" "}
            </div>
            <span className="font-[700] text-2xl">{totalPrice}</span>
          </div>
          <div className="flex justify-between items-center">
            <Button
              onClick={() => setIsCartOpen(false)}
              className="flex items-center gap-1"
            >
              <span>
                <ArrowBackIosIcon />
              </span>
              <span> Continue shopping</span>
            </Button>
            <Link to="cart">
              <Button
                onClick={() => setIsCartOpen(false)}
                className="flex items-center gap-1"
              >
                <span>Check out</span>
                <span>
                  <ArrowForwardIosIcon />
                </span>
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPopup;
