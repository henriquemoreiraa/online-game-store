import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import Game from "../pages/game/[id]";
import { useRouter } from "next/router";

type Props = {
  btn: string;
  game: Game;
};

const stripePromise = loadStripe(
  "pk_test_51LYC8vHMLZENtycSCx1gMmFRziFySVln3xDTVCHgN90qRvPOiKzu8eFPXRdUaNLFHU0JgN0c9ngAb7Tc7mxSQIyO00UnMF5k65"
);

function Button({ btn, game: { price, name } }: Props) {
  const router = useRouter();
  const { id } = router.query;

  const handleClick = async () => {
    if (btn === "buy") {
      try {
        const {
          data: { sessionId },
        } = await axios.post(`/api/stripe`, {
          name: name,
          price: price,
          gameId: id,
        });
        const stripe = await stripePromise;
        await stripe.redirectToCheckout({
          sessionId,
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="mb-2 text-xs font-semibold">
      <button
        className={`${btn === "buy" ? `bg-indigo-600` : "bg-transparent"} ${
          btn !== "buy" && "border border-gray-500"
        } w-full ${btn === "wish" ? "py-1" : "py-3"} rounded-md`}
        onClick={handleClick}
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
