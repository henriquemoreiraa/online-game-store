import { gql } from "@apollo/client";
import gqlClient from "../../graphql/apollo-client";
import Banner from "../components/Banner";
import GamesList from "../components/GamesList";
import Header from "../components/Header";
import Header2 from "../components/Header2";
import Cart from "../components/Cart";
import { Game } from "../types";
import { useState } from "react";

type Props = {
  games: Game[];
};

function Home({ games }: Props) {
  const [isCart, setIsCart] = useState(false);
  const [cartData, setCartData] = useState<Game[]>([]);

  return (
    <div className="flex flex-col items-center text-white h-fit">
      <Header />
      <div className="w-4/5 ">
        <Header2
          setIsCart={setIsCart}
          isCart={isCart}
          setCartData={setCartData}
          cartData={cartData}
        />
        <Banner games={games} />
        <GamesList games={games} />
      </div>
    </div>
  );
}

export default Home;

export const getServerSideProps = async () => {
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

  return {
    props: {
      games: data.games,
    },
  };
};
