import React from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

import {
  plusItem,
  minusItem,
  deleteItemFromCart,
} from "../redux/slices/itemSlice";

import { useDispatch } from "react-redux";

const CartItemCard = ({ title, price, count, imageUrl, id }) => {
  const dispatch = useDispatch();

  const onHandlePlus = () => {
    dispatch(plusItem(id));
  };
  const onHandleMinus = () => {
    dispatch(minusItem(id));
  };
  const onHandleDelete = () => {
    if (window.confirm("Вы действительно хотите удалить товар?")) {
      dispatch(deleteItemFromCart(id));
    }
  };

  return (
    count > 0 && (
      <div className="flex items-center justify-between">
        <div className="">
          <img className="h-[150px] w-[150px] " src={imageUrl} alt="cartimg" />
        </div>
        <div className="text-blue-500 font-[500] text-lg">{title}</div>
        <div className="flex items-center gap-2">
          <button
            className="py-1 px-4 rounded-md bg-gray-300"
            onClick={onHandleMinus}
          >
            -
          </button>{" "}
          <span className="py-1 px-3 border rounded-md">{count}</span>
          <button
            className="py-1 px-4 rounded-md bg-gray-100"
            onClick={onHandlePlus}
          >
            +
          </button>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-lg font-[700] ">{price * count}</span>
          <div
            className="flex flex-col items-center cursor-pointer"
            onClick={onHandleDelete}
          >
            <span>
              <DeleteOutlineIcon />
            </span>
            <span className="font-[600]">Удалить</span>
          </div>
        </div>
      </div>
    )
  );
};

export default CartItemCard;
