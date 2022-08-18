import { gql } from "@apollo/client";
import gqlClient from "../../graphql/apollo-client";
import { Games } from "../types";
import Banner from "../components/Banner";
import GamesList from "../components/GamesList";
import Header from "../components/Header";
import Header2 from "../components/Header2";

type Props = {
  games: Games[];
};

function Home({ games }: Props) {
  return (
    <div className="flex flex-col items-center text-white h-fit">
      <Header />
      <div className="w-4/5 ">
        <Header2 />
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
