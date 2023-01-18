import React from "react";
import { TextField, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { fetchAuth } from "../redux/slices/authSlice";
import { Navigate } from "react-router-dom";

const LoginPage = () => {
  const dispatch = useDispatch();
  const isAuth = Boolean(useSelector((state) => state.auth.data));

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = async (values) => {
    const data = await dispatch(fetchAuth(values));

    if (!data.payload) {
      return alert("Не удалось авторизоваться!");
    }
    if ("token" in data.payload) {
      window.localStorage.setItem("token", data.payload.token);
    }
  };

  if (isAuth) {
    return <Navigate to="/admin" />;
  }

  return (
    <div className="container mx-auto bg-white py-5 rounded-md">
      <h1 className="text-2xl  font-bold text-center ">Login</h1>
      <form onSubmit={handleSubmit(onSubmit)} action="">
        <div className="flex flex-col justify-start items-center my-5 gap-5 py-5">
          <TextField
            {...register("email", {
              required: "Enter email",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Entered value does not match email format",
              },
            })}
            variant="outlined"
            label="email"
            className=""
          />
          {errors.email && <span role="alert">{errors.email.message}</span>}
          <TextField
            {...register("password", {
              required: "Enter password",
              minLength: {
                value: 2,
                message: "min length is 2",
              },
            })}
            variant="outlined"
            label="password"
          />
          {errors.password && (
            <span role="alert">{errors.password.message}</span>
          )}
          <Button type="submit" variant="contained">
            Sign in
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
