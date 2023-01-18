import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "../axios";
import PurchaseCard from "../components/PurchaseCard";
import { getAllPurchases } from "../redux/slices/consumerSlice";

const Admin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [purchases, setPurchases] = React.useState([]);
  const [addStatusArr, setAddStatusArr] = React.useState([]);

  const fetchAllPurchases = async () => {
    const { data } = await axios.get("/consumer/getAll");
    setPurchases(data);
  };

  React.useEffect(() => {
    try {
      fetchAllPurchases();
    } catch (error) {
      console.log(error);
    }
  }, [purchases]);

  const [statusCategory, setStatusCategory] = React.useState([
    {
      title: "Новые",
      color: "red-300",
    },
    {
      title: "В процессе",
      color: "blue-200",
    },
    {
      title: "Завершенные",
      color: "green-200",
    },
  ]);

  const [selectedStatus, setSelectedStatus] = React.useState(0);
  const [statusArr, setStatusArr] = React.useState([
    "В обработке",
    "Выполнен частично",
    "Выполнен",
  ]);

  const isAuth = Boolean(useSelector((state) => state.auth.data));

  if (!isAuth) {
    return <Navigate to="/login" />;
  }

  if (!purchases) {
    return <div>Загрузка...</div>;
  }

  console.log(statusArr[selectedStatus]);
  return (
    <div className="container mx-auto  my-20">
      <div className="flex items-center gap-3">
        {statusCategory.map((obj, idx) => (
          <span
            key={idx}
            onClick={() => setSelectedStatus(idx)}
            className={`text-2xl cursor-pointer font-[600] bg-${
              obj.color
            } p-3 rounded-md text-zinc-900 ${
              selectedStatus === idx ? "border-2 border-black" : "opacity-70"
            }`}
          >
            {obj.title}
          </span>
        ))}

        <span className="text-2xl cursor-pointer font-[600] text-blue-300">
          + Добавить статус
        </span>
      </div>
      <div className="flex justify-between text-xl font-[700] p-5 border-y my-9">
        <div className="w-1/4">Заказ</div>
        <div className="">Статус</div>
        <div className="">Телефон</div>
        <div className="">Почта</div>
        <div className="">Имя</div>
        <div className="">Город</div>
        <div className="">Адрес</div>
      </div>
      <div className="">
        {purchases
          ?.filter((item) => {
            if (item.status === statusArr[selectedStatus]) {
              return true;
            }
            return false;
          })
          .map((item, index) => (
            <PurchaseCard {...item} key={index} />
          ))}
      </div>
    </div>
  );
};

export default Admin;
