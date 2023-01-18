import React from "react";
import axios from "axios";

function EditAvatar() {
  const [img, setImg] = React.useState(null);
  const [avatar, setAvatar] = React.useState(null);
  const inputRef = React.useRef();

  const onHandleChange = React.useCallback(async () => {
    try {
      const data = new FormData();
      data.append("avatar", img);

      await axios
        .post("/uploads", data)
        .then((res) => setAvatar(res.data.url), {
          headers: {
            "content-type": "mulpipart/form-data",
          },
        });
    } catch (error) {
      console.log(error);
    }
  }, [img]);
  console.log(avatar);
  return (
    <div className="my-32 rounded-md ">
      {avatar ? (
        <img src={avatar} alt="asdas" />
      ) : (
        <img
          src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"
          alt="avatar"
          className="h-[300px] w-[300px] rounded-full"
        />
      )}

      <div className="py-10  bg-white  rounded-md my-5 text-center shadow-md flex items-center justify-between">
        <div
          className="bg-blue-400 px-2 rounded-sm text-white text-xl rounded-xs cursor-pointer font-mono active:opacity-50 "
          onClick={() => inputRef.current.click()}
        >
          Выбрать файл
        </div>
        <input
          onChange={(e) => setImg(e.target.files[0])}
          ref={inputRef}
          type="file"
          hidden
        />
        <button
          onClick={onHandleChange}
          className="px-2 rounded-sm bg-rose-400 text-white text-xl font-mono  active:opacity-50"
        >
          Изменить аватар
        </button>
      </div>
    </div>
  );
}

export default EditAvatar;
