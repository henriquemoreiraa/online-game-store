import { gql } from "@apollo/client";
import gqlClient from "../../graphql/apollo-client";
import { Games } from "../types";
import Banner from "../components/Banner";
import GamesList from "../components/GamesList";

type Props = {
  games: Games[];
};

function Home({ games }: Props) {
  return (
    <div className="flex flex-col items-center text-white h-fit">
      {/* <Header /> */}
      <div className="w-4/5 h-screen">
        <div className="flex flex-row justify-between m-3 my-8">
          <input
            className="bg-neutral-800 rounded-3xl border-none text-white p-3 w-36 text-xs placeholder-white"
            type="text"
            placeholder="Search game"
          />
          <div className="flex flex-row items-center text-ms">
            <p className="mr-8 cursor-pointer">Wish List</p>
            <p className="cursor-pointer">Cart</p>
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
