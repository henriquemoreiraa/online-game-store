import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { Game } from "../types";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Login from "./Login";
import { useState } from "react";
import { gql } from "apollo-server-micro";
import gqlClient from "../../graphql/apollo-client";

type Props = {
  btn: string;
  game: Game;
  setCartData?: (e: Game[]) => void;
};

const stripePromise = loadStripe(
  "pk_test_51LYC8vHMLZENtycSCx1gMmFRziFySVln3xDTVCHgN90qRvPOiKzu8eFPXRdUaNLFHU0JgN0c9ngAb7Tc7mxSQIyO00UnMF5k65"
);

function Button({ btn, setCartData, game: { price, name } }: Props) {
  const [isLogin, setIsLogin] = useState(false);

  const router = useRouter();
  const { id } = router.query;
  const { data, status } = useSession();

  const handleClick = async () => {
    if (btn === "buy") {
      if (status === "authenticated") {
        try {
          const {
            data: { sessionId },
          } = await axios.post(`/api/stripe`, {
            user: data.user.email,
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
      } else {
        setIsLogin(true);
      }
    } else {
      if (status === "authenticated") {
        const res = await gqlClient.mutate({
          mutation: gql`
            mutation getGame($email: String! = "${data.user.email}", $game: ID! = "${id}") {
              addGameOnUserCart(email: $email, game: $game) {
                  cart {
                    id
                    name
                    game_img
                    price 
                    genre {
                      name
                    }
                  }
                }
              }
            `,
        });
        setCartData(res.data.addGameOnUserCart.cart);
      } else {
        setIsLogin(true);
      }
    }
  };

  return (
    <div className="mb-2 text-xs font-semibold">
      {isLogin && <Login setIsLogin={setIsLogin} />}
      <button
        className={`${btn === "buy" ? `bg-indigo-600` : "bg-transparent"} ${
          btn !== "buy" && "border border-gray-500"
        } w-full  py-3 rounded-md`}
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
