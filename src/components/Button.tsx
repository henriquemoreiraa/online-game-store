type Props = {
  btn: string;
};

function Button({ btn }: Props) {
  return (
    <div className="mb-2 text-sm font-semibold">
      <button
        className={`${btn === "buy" ? `bg-indigo-600` : "bg-transparent"} ${
          btn !== "buy" && "border border-gray-500"
        } w-full ${btn === "wish" ? "py-1" : "py-3"} rounded-md`}
      >
        {btn === "buy"
          ? "BUY NOW"
          : btn === "cart"
          ? "ADD TO CART"
          : "ADD TO WISHLIST"}
      </button>
    </div>
  );
}

export default Button;
