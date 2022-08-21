import { Game } from "../types";
import Button from "./Button";
import { gql } from "apollo-server-micro";
import gqlClient from "../../graphql/apollo-client";
import { useSession } from "next-auth/react";
import { IoClose } from "react-icons/io5";

type Props = {
  cartData: Game[];
  setIsCart: (e: boolean) => void;
  setCartData: (e: Game[]) => void;
};

function Cart({ cartData, setIsCart, setCartData }: Props) {
  const { data, status } = useSession();

  const removeGameFromCart = async (gameId: String) => {
    const res = await gqlClient.mutate({
      mutation: gql`
        mutation removeGame($email: String! = "${data.user.email}", $game: ID! = "${gameId}") {
        deleteGameOnUserCart(email: $email, game: $game) {
            name
            cart {
                name
                id
            }
            }
        }
        `,
    });
    const removeFromCartData = cartData.filter((game) => game.id !== gameId);
    setCartData(removeFromCartData);
  };

  return (
    <div className="scrolldiv fixed h-screen bg-neutral-800 right-0 top-0 z-40 p-5  overflow-auto w-full sm:w-fit">
      <div className="relative h-8">
        <IoClose
          onClick={() => setIsCart(false)}
          size={"1.5em"}
          className="absolute right-0 cursor-pointer"
        />
      </div>
      {cartData.map((game) => (
        <div className="flex mb-5 items-center" key={game.id as string}>
          <div className="w w-48 h-28">
            <img
              className="object-cover w-full h-full"
              src={`${game.game_img}`}
              alt=""
            />
          </div>
          <div className="ml-5 w-1/2">
            <p className="text-md font-semibold w-full flex flex-col sm:flex-row justify-between sm:items-center">
              {game.name}{" "}
              <span className="text-xs sm:ml-2 ">${game.price},00</span>
            </p>
            <p
              onClick={() => removeGameFromCart(game.id)}
              className="mb-3 text-gray-300 border-b border-gray-500 cursor-pointer w-fit"
            >
              Remove
            </p>
            <Button btn="buy" game={game} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default Cart;
