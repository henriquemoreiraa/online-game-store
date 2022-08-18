import { FiSearch, FiShoppingCart, FiHeart } from "react-icons/fi";

function Header2() {
  return (
    <div className=" flex flex-row justify-between  py-5 sticky top-0 z-10 bg-neutral-900">
      <div className="flex">
        <button
          disabled
          className="bg-neutral-800 px-3  rounded-tl-3xl rounded-bl-3xl cursor-default"
        >
          <FiSearch />
        </button>
        <input
          className="bg-neutral-800 rounded-tr-3xl rounded-br-3xl border-none text-white p-3 w-28 text-xs placeholder-white"
          type="text"
          placeholder="Search game"
        />
      </div>
      <div className="flex flex-row items-center text-ms">
        <p className="mr-5 cursor-pointer flex items-center hover:opacity-80">
          <span className="mx-2">
            <FiHeart />
          </span>
          Wish List{" "}
        </p>
        <p className="cursor-pointer flex items-center hover:opacity-80">
          <span className="mx-2">
            <FiShoppingCart />
          </span>
          Cart{" "}
        </p>
      </div>
    </div>
  );
}

export default Header2;
