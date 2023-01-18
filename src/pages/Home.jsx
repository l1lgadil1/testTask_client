import React from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "../axios";
import ItemCard from "../components/ItemCard";
import { setData } from "../redux/slices/itemSlice";

const Home = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.items.data);

  const fetchData = async () => {
    const { data } = await axios.get("/items");
    dispatch(setData(data));
  };

  React.useEffect(() => {
    try {
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, []);



  const [isSortOpen, setIsSortOpen] = React.useState(false);

  const sortTypes = ["возрастанию", "убыванию"];
  const [currentSort, setCurrentSort] = React.useState();

  const [searchValue, setSearchValue] = React.useState("");

  if (!items) {
    return <div className="text-xl ">Загрузка...</div>;
  }

  return (
    <div className="container mx-auto p-5 shadow-xl bg-gray-100 rounded-md">
      <div className="my-5 flex justify-between items-cetner">
        <div onClick={() => setIsSortOpen((prev) => !prev)} className="">
          <div className="relative  text-xl font-[600] text-center flex items-center gap-1 cursor-pointer bg-blue-500 rounded-md text-white">
            <span> Сортировка по:</span>
            {currentSort >= 0 && (
              <span className="underline decoration-dotted text-2xl text-orange-200">
                {sortTypes[currentSort]}
              </span>
            )}
          </div>
          {isSortOpen && (
            <ul className="w-full z-10 left-0 bg-white rounded-md">
              {sortTypes.map((item, index) => (
                <li
                  onClick={() => setCurrentSort(index)}
                  className="text-black font-[600] w-full text-lg  py-1 border hover:opacity-50 cursor-pointer"
                  key={index}
                >
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>

        <input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          type="text"
          placeholder="search..."
          className="px-2 py-3 rounded-md outline-none border border-blue-500"
        />
      </div>
      <div className="grid grid-cols-3 gap-3">
        {currentSort !== 1 || 0
          ? items
              .filter((item) => {
                if (
                  item.title.toLowerCase().includes(searchValue.toLowerCase())
                ) {
                  return true;
                }
                return false;
              })
              .map((item, index) => (
                <ItemCard bottomIsShown={true} key={index} {...item} />
              ))
          : items
              .sort(function (a, b) {
                if (currentSort === 0) {
                  return b.price - a.price;
                }
              })
              .map((item, index) => (
                <ItemCard bottomIsShown={true} key={index} {...item} />
              ))}
      </div>
    </div>
  );
};

export default Home;
