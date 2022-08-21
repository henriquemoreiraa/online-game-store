import { FiSearch } from "react-icons/fi";
import { IoGrid, IoCartSharp } from "react-icons/io5";
import { gql } from "apollo-server-micro";
import gqlClient from "../../graphql/apollo-client";
import { getSession, useSession } from "next-auth/react";
import { Game } from "../types";
import Cart from "./Cart";
import { useEffect, useState } from "react";
import Link from "next/link";

type Props = {
  setIsCart: (e: boolean) => void;
  cartData?: Game[];
  isCart: boolean;
  setCartData: (e: Game[]) => void;
};

function Header2({ cartData, setIsCart, isCart, setCartData }: Props) {
  const [searchGame, setSearchGame] = useState("");
  const [games, setGames] = useState<Game[]>([]);

  const session = useSession();

  const filteredGames =
    searchGame.length > 0
      ? games.filter((user) =>
          user.name.toLowerCase().includes(searchGame.toLowerCase())
        )
      : [];

  useEffect(() => {
    if (session.data) {
      (async () => {
        const res = await gqlClient.query({
          query: gql`
          query getUser($email: String! = "${session.data.user.email}") {
              user(email: $email) {
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
        setCartData(res.data.user.cart);
      })();
    }
    (async () => {
      const { data } = await gqlClient.query({
        query: gql`
          query {
            games {
              id
              name
              price
              game_img
            }
          }
        `,
      });
      setGames(data.games);
    })();
  }, [session.data]);

  return (
    <div className=" flex flex-row justify-between  py-5 sticky top-0 z-10 bg-neutral-900">
      {isCart && (
        <Cart
          cartData={cartData}
          setIsCart={setIsCart}
          setCartData={setCartData}
        />
      )}
      <div className="flex">
        <button
          disabled
          className="bg-neutral-800 px-3 h-10 rounded-tl-3xl rounded-bl-3xl cursor-default"
        >
          <FiSearch />
        </button>
        <div className="relative">
          <input
            className="bg-neutral-800 rounded-tr-3xl rounded-br-3xl border-none text-white p-3 w-28 text-xs placeholder-white"
            type="text"
            placeholder="Search game"
            onChange={(e) => setSearchGame(e.target.value)}
            value={searchGame}
          />
          <div>
            {searchGame.length > 0 ? (
              <div className="absolute p-5 w-48 bg-neutral-800 -left-12 top-12 overflow-auto">
                {filteredGames.map((game) => (
                  <a href={`/game/${game.id}`}>
                    <p className="text-xs mb-3 cursor-pointer">{game.name}</p>
                  </a>
                ))}
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-row items-center text-ms">
        {session.status === "authenticated" && (
          <Link href="/library">
            <p className="mr-5 cursor-pointer flex items-center hover:opacity-80">
              <span className="mx-2">
                <IoGrid />
              </span>
              Library{" "}
            </p>
          </Link>
        )}
        <p
          onClick={() => setIsCart(true)}
          className="cursor-pointer flex items-center hover:opacity-80"
        >
          <span className="mx-2">
            <IoCartSharp size={"1.2em"} />
          </span>
          Cart {cartData && cartData.length > 0 && cartData.length}
        </p>
      </div>
    </div>
  );
}

export default Header2;
