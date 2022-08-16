import { gql } from "@apollo/client";
import gqlClient from "../../graphql/apollo-client";
import { Games } from "../types";
import Banner from "../components/Banner";
import GamesList from "../components/GamesList";
import Header from "../components/Header";
import { FiSearch, FiShoppingCart, FiHeart } from "react-icons/fi";

type Props = {
  games: Games[];
};

function Home({ games }: Props) {
  return (
    <div className="flex flex-col items-center text-white h-fit">
      <Header />
      <div className="w-4/5 ">
        <div className=" flex flex-row justify-between  py-5 sticky top-0 z-10 bg-neutral-900">
          <div className="flex">
            <button
              disabled
              className="bg-neutral-800 px-3  rounded-tl-3xl rounded-bl-3xl cursor-default"
            >
              <FiSearch />
            </button>
            <input
              className="bg-neutral-800 rounded-tr-3xl rounded-br-3xl border-none text-white p-3 w-32 text-xs placeholder-white"
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
          genre {
            name
          }
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
