import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const FinalModal = () => {
  const navigate = useNavigate();

  const onHandleOk = () => {
    navigate("/");
  };
  return (
    <div
      className="h-[100%] w-[100%] fixed top-0 left-0 flex justify-center items-center bg-slate-900/50 z-10"
      onClick={onHandleOk}
    >
      <div className="p-10 bg-white  rounded-md flex flex-col gap-3">
        <p className="text-xl font-[600]">
          Ваши данные были успешно отправлены!
        </p>
        <p className="text-lg font-[600]">С вами скоро свяжется менеджер.</p>
        <div className="flex justify-center">
          <Button variant="contained" onClick={onHandleOk}>
            ok
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FinalModal;
