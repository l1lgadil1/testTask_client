import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { TextField, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { createConsumer } from "../redux/slices/consumerSlice";

import FinalModal from "../components/FinalModal";
import { clearCart } from "../redux/slices/itemSlice";

const ConfirmPage = ({ values }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const consumerInfo = useSelector((state) => state.consumer.consumerInfo);
  const cart = useSelector((state) => state.items.cart);
  console.log(cart);

  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const onSubmit = () => {
    setIsModalOpen((prev) => !prev);
    dispatch(
      createConsumer({
        name: consumerInfo.name,
        adress: consumerInfo.adress,
        city: consumerInfo.city,
        email: consumerInfo.email,
        phone: consumerInfo.phone,
        cart: cart,
      })
    );
    dispatch(clearCart());
  };

  console.log(consumerInfo);
  return (
    <div className="container mx-auto  my-10">
      {isModalOpen && <FinalModal />}
      <h1 className="text-lg font-[600]">Подтвердите ваши данные:</h1>
      <div className="flex justify-between flex-row-reverse">
        <div className="">
          <h1 className="text-lg font-[600]">Ваш заказ:</h1>
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
        </div>
        <div className="flex flex-col gap-3 w-1/3">
          <TextField
            label={consumerInfo.name}
            disabled={true}
            variant="outlined"
          />
          <TextField
            label={consumerInfo.adress}
            disabled={true}
            variant="outlined"
          />
          <TextField
            label={consumerInfo.city}
            disabled={true}
            variant="outlined"
          />
          <TextField
            label={consumerInfo.email}
            disabled={true}
            variant="outlined"
          />
          <TextField
            label={consumerInfo.phone}
            disabled={true}
            variant="outlined"
          />
        </div>
      </div>
      <div className="flex justify-between mt-8">
        <Link to="/checkout">
          <Button variant="outlined">Вернуться назад</Button>
        </Link>
        <Button onClick={onSubmit} variant="contained">
          Подтвердить
        </Button>
      </div>
    </div>
  );
};

export default ConfirmPage;
