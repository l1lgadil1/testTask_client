import React from "react";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { addToCart, deleteFromFavorites } from "../redux/slices/itemSlice";
import { Link } from "react-router-dom";

const ItemCard = ({ imageUrl, title, price, id, bottomIsShown }) => {
  const [isHover, setIsHover] = React.useState(false);
  const dispatch = useDispatch();

  const [isLiked, setIsLiked] = React.useState(false);

  const onAddToCart = () => {
    dispatch(addToCart({ id, imageUrl, title, price }));
  };
  return (
    <div
      onMouseOver={() => setIsHover(true)}
      onMouseOut={() => setIsHover(false)}
      className="flex flex-col relative items-center justify-center gap-3 bg-white p-5 rounded-md"
    >
      <Link to={`/items/${id}`}>
        <img src={imageUrl} className="w-[200px] h-[200px]" alt="card-img" />
      </Link>
      <h1 className="text-xl font-[600]">{title}</h1>
      <b className="text-2xl font-[700]">{price}</b>
      {bottomIsShown ? (
        <div className="flex items-center gap-2 ">
          <Button onClick={onAddToCart}>Добавить в корзину</Button>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default ItemCard;
