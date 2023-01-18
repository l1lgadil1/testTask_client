import React from "react";
import { useParams } from "react-router-dom";
import axios from "../axios";

import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/slices/itemSlice";

const FullPost = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  console.log(id);
  const [item, setItem] = React.useState([]);

  const fetchData = async () => {
    const { data } = await axios.get(`items/${id}`);
    setItem(data);
  };
  React.useEffect(() => {
    try {
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const onAddToCart = () => {
    dispatch(addToCart(item));
  };

  if (!item) {
    return <>Загрузка...</>;
  }

  return (
    <div className="container mx-auto my-10 flex flex-col gap-4">
      <img
        className="max-h-[400px] max-w-[400px]"
        src={item.imageUrl}
        alt="itemimg"
      />
      <div className="text-xl font-[600]">{item.title}</div>
      <div className="text-2xl font-[700]">{item.price}</div>
      <div className="flex items-center gap-2 ">
        <Button onClick={onAddToCart}>Добавить в корзину</Button>
      </div>
    </div>
  );
};

export default FullPost;
