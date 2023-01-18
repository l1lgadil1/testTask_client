import React from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const PurchaseCard = ({
  _id,
  status,
  cart,
  phone,
  email,
  name,
  city,
  adress,
}) => {
  const totalSum = cart.reduce((sum, item) => {
    return sum + item.count * item.price;
  }, 0);

  const onHandleChange = () => {};

  return (
    <div className="flex justify-between my-6 text-lg font-[600] h-64 border-b">
      <div className="flex flex-col w-1/4 gap-3 overflow-auto">
        <Link to={_id}>
          {cart.map((item, index) => (
            <div key={index}>
              <div className="">
                {item.title}X({item.count})
              </div>
            </div>
          ))}
          <div className="flex gap-2 items-center">
            <span className="text-xl font-[600]">Сумма</span>
            <span className="text-2xl font-[700] text-green-500">
              {totalSum}
            </span>
          </div>
        </Link>
      </div>
      <div className="text-amber-400 text-2xl">{status}</div>
      <div className="text-red-400">{phone}</div>
      <div className="text-red-400">{email}</div>
      <div className="">{name}</div>
      <div className="">{city}</div>
      <div className="">{adress}</div>
    </div>
  );
};

export default PurchaseCard;
