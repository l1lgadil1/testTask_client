import React from "react";
import { useParams } from "react-router-dom";
import axios from "../axios";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { deleteConsumer, updateConsumer } from "../redux/slices/consumerSlice";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const AdminPurchase = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();
  const [arr, setArr] = React.useState([]);

  const [newName, setNewName] = React.useState(arr.name);
  const [newAdress, setNewAdress] = React.useState(arr.adress);
  const [newCity, setNewCity] = React.useState(arr.city);
  const [newEmail, setNewEmail] = React.useState(arr.email);
  const [newPhone, setNewPhone] = React.useState(arr.phone);
  //   const [newStatus, setNewStatus] = React.useState(arr.status);

  const [isStatusOpen, setIsStatusOpen] = React.useState(false);

  const statusArr = ["В обработке", "Выполнен частично", "Выполнен"];

  const [currentStatus, setCurrentStatus] = React.useState(0);
  console.log(`status-${statusArr[currentStatus]}`);

  const onHandleStatus = () => {
    setIsStatusOpen((prev) => !prev);
  };

  const fetchPurchase = async () => {
    try {
      const { data } = await axios.get(`/admin/${id}`);
      setArr(data);
    } catch (error) {}
  };

  React.useEffect(() => {
    fetchPurchase();
  }, []);

  const finalData = {
    name: newName,
    adress: newAdress,
    city: newCity,
    email: newEmail,
    phone: newPhone,
    cart: arr.cart,
    status: statusArr[currentStatus],
  };
  const onHandleSubmit = () => {
    dispatch(updateConsumer({ id: id, data: finalData }));
    alert("Изменено!");
    navigate("/admin");
  };

  const onHandleDelete = () => {
    dispatch(deleteConsumer(id));
    alert("Заказ был удален");
    navigate("/admin");
  };

  return (
    <div className="container mx-auto ">
      <div className="text-lg font-bold my-5">Заказ № ${id}</div>
      <Link to="/admin">
        <Button variant="outlined">Назад</Button>
      </Link>
      <div className="my-20">
        <div className="flex items-center  justify-between  text-xl font-[500]">
          <div className="border-r p-5">
            <div className="">Имя</div>
            <input
              className="outline-none text-xl placeholder:text-black text-gray-600 border rounded-md my-5 py-2 px-1"
              onChange={(e) => setNewName(e.target.value)}
              placeholder={arr.name}
            />
          </div>
          <div className="border-r  p-5">
            <div className="">Адрес</div>
            <input
              onChange={(e) => setNewAdress(e.target.value)}
              className="outline-none text-xl placeholder:text-black text-gray-600 border rounded-md my-5 py-2 px-1"
              placeholder={arr.adress}
            />
          </div>
          <div className="border-r  p-5">
            <div className="">Город</div>
            <input
              onChange={(e) => setNewCity(e.target.value)}
              className="outline-none text-xl placeholder:text-black text-gray-600 border rounded-md my-5 py-2 px-1"
              placeholder={arr.city}
            />
          </div>
          <div className="border-r  p-5">
            <div className="">Почта</div>
            <input
              onChange={(e) => setNewEmail(e.target.value)}
              className="outline-none text-xl placeholder:text-black text-gray-600 border rounded-md my-5 py-2 px-1"
              placeholder={arr.email}
            />
          </div>
          <div className="border-r  p-5">
            <div className="">Телефон</div>
            <input
              onChange={(e) => setNewPhone(e.target.value)}
              className="outline-none text-xl placeholder:text-black text-gray-600 border rounded-md my-5 py-2 px-1"
              placeholder={arr.phone}
            />
          </div>
          <div className="cursor-pointer " onClick={onHandleStatus}>
            <div className="">Статус</div>
            {!isStatusOpen && (
              <div className="text-amber-700 text-2xl">{arr.status}</div>
            )}
            {isStatusOpen && (
              <div className="flex flex-col mt-5 items-center">
                {statusArr.map((item, idx) => (
                  <span
                    onClick={() => setCurrentStatus(idx)}
                    key={idx}
                    className="p-2 bg-gray-200 hover:bg-gray-300"
                  >
                    {item}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex justify-between ">
        <button
          onClick={onHandleDelete}
          className="p-3 bg-red-500 rounded-md text-white font-[500] text-xl"
        >
          Удалить
        </button>
        <Button variant="contained" onClick={onHandleSubmit}>
          Изменить
        </Button>
      </div>
    </div>
  );
};

export default AdminPurchase;
