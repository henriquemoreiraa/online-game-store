import { gql } from "apollo-server-micro";
import gqlClient from "../../../graphql/apollo-client";
import { Games } from "@prisma/client";
import Header from "../../components/Header";

type Props = {
  game: Games;
};

function Game({ game }: Props) {
  console.log(game);
  return (
    <div className="text-white">
      <Header />
      <div>{game.name}</div>
      <iframe
        width="560"
        height="315"
        src={`${game.game_trailer}`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      ></iframe>
    </div>
  );
}

export default Game;

export const getServerSideProps = async (context) => {
  const { data } = await gqlClient.query({
    query: gql`
      query getGame($gameId: ID! = "${context.params.id}") {
        game(id: $gameId) {
          name
          price
          game_img
          game_trailer
          genre {
            name
          }
        }
      }
    `,
  });

  return {
    props: {
      game: data.game,
    },
  };
};
