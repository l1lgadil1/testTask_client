import React from "react";
import { useSelector } from "react-redux";
import CartItemCard from "../components/CartItemCard";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";
import { clearCart } from "../redux/slices/itemSlice";
import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";

const Cart = () => {
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.items.cart);
  const totalPrice = useSelector((state) => state.items.totalPrice);
  const totalCount = cartItems.reduce((sum, item) => {
    return sum + item.count;
  }, 0);

  const onHandleClearCart = () => {
    if (window.confirm("Вы действительно хотите очистить корзину?")) {
      dispatch(clearCart());
    }
  };

  return cartItems.length > 0 ? (
    <div className="container mx-auto my-2">
      <h1 className="text-4xl font-[600]">Корзина</h1>
      <div className="flex justify-between items-center my-5">
        <div
          className="flex items-center gap-2 text-lg font-[500] cursor-pointer"
          onClick={onHandleClearCart}
        >
          <span>
            <DeleteIcon />
          </span>
          <span>Очистить корзину</span>
        </div>
        <div className="">
          <Link to="/checkout">
            <Button variant="contained">
              <span className="text-white text-md font-[600]">
                оформить заказ
              </span>
            </Button>
          </Link>
        </div>
      </div>
      <div className="flex flex-col ">
        <div className="flex items-center justify-between bg-gray-100 p-3 border-y">
          <span></span>
          <span className="text-lg font-[600]">Товар</span>
          <span className="text-lg font-[600]">Количество</span>
          <span className="text-lg font-[600]">Цена</span>
        </div>
        {cartItems.map((item, index) => (
          <CartItemCard {...item} key={index} />
        ))}
      </div>
      <div className="flex justify-between items-center gap-2 bg-gray-100 p-5">
        <div className="">
          <span className="text-lg font-[600]">Общее количество товаров:</span>
          <span className="text-xl font-[700]">{totalCount}</span>
        </div>
        <div className="">
          <span className="text-lg font-[600]"> Общая стоимость:</span>
          <span className="text-xl font-[700]">{totalPrice}</span>
        </div>
      </div>
    </div>
  ) : (
    <div className="text-4xl font-[600] text-center my-20">
      <p>Корзина пуста</p>
      <p>Добавьте товар, чтобы продолжить </p>
    </div>
  );
};

export default Cart;
