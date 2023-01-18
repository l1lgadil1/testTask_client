import React from "react";
import { Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { createConsumer, setConsumerInfo } from "../redux/slices/consumerSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CheckOut = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const consumerInfo = useSelector((state) => state.consumer.consumerInfo);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      adress: "",
      city: "",
      email: "",
      phone: "",
    },
  });

  const [name, setName] = React.useState("");
  const [adress, setAdress] = React.useState("");
  const [city, setCity] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");

  React.useEffect(() => {
    if (consumerInfo) {
      setName(consumerInfo.name);
      setAdress(consumerInfo.adress);
      setCity(consumerInfo.city);
      setEmail(consumerInfo.email);
      setPhone(consumerInfo.phone);
    }
  }, [consumerInfo]);

  const onSubmit = (values) => {
    dispatch(setConsumerInfo(values));
    navigate("/confirm", values);
  };

  return (
    <div className="container mx-auto ">
      <div className="text-lg font-[500]">Введите данные чтобы продолжить</div>
      <div className="">
        <h1 className="text-lg font-[600] pb-2 border-b">Account info</h1>
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col  my-4 pb-2 border-b">
            <div className="">
              <div className="text-lg font-[600]">Name:</div>
              <input
                value={name}
                {...register("name", { required: "Введите имя" })}
                className="outline-none bg-gray-100 p-3 w-1/3 h-[30px]  rounded-md border"
                placeholder="name"
                onChange={(e) => setName(e.target.value)}
              />
              {errors.name && <span role="alert">{errors.name.message}</span>}
            </div>
            <div className="">
              <div className="text-lg font-[600]">Adress:</div>
              <input
                value={adress}
                {...register("adress", { required: "Введите адресс" })}
                className="outline-none bg-gray-100 p-3 w-1/3 h-[30px]  rounded-md border"
                onChange={(e) => setAdress(e.target.value)}
                placeholder="adress"
              />
              {errors.adress && (
                <span role="alert">{errors.adress.message}</span>
              )}
            </div>
            <div className="">
              <div className="text-lg font-[600]">City</div>
              <input
                value={city}
                {...register("city", { required: true })}
                className="outline-none bg-gray-100 p-3 w-1/3 h-[30px]  rounded-md border"
                placeholder="city"
                onChange={(e) => setCity(e.target.value)}
              />
              {errors.city && <span role="alert">{errors.city.message}</span>}
            </div>
          </div>
          <div className="">
            <h1 className="text-lg font-[600]">Contact information</h1>
            <div className="flex flex-col my-4  ">
              <div className="">
                <div className="text-lg font-[600]">email:</div>
                <input
                  value={email}
                  {...register("email", {
                    required: "Введите почту",
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: "Введите верный формат почты",
                    },
                  })}
                  className="outline-none  bg-gray-100 p-3 w-1/3 h-[30px]  rounded-md border"
                  placeholder="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && (
                  <span role="alert">{errors.email.message}</span>
                )}
              </div>
              <div className="">
                <div className="text-lg font-[600]">phone</div>
                <input
                  value={phone}
                  {...register("phone", { required: "Введите телефон" })}
                  className="outline-none bg-gray-100 p-3 w-1/3 h-[30px]  rounded-md border"
                  placeholder="phone"
                  onChange={(e) => setPhone(e.target.value)}
                />
                {errors.phone && (
                  <span role="alert">{errors.phone.message}</span>
                )}
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <Button type="submit" variant="contained">
              Сохранить
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckOut;
