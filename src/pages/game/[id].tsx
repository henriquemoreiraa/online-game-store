import { gql } from "apollo-server-micro";
import gqlClient from "../../../graphql/apollo-client";
import { Games } from "@prisma/client";

type Props = {
  game: Games;
};

function Game({ game }: Props) {
  return <div className="text-white">{game.name}</div>;
}

export default Game;

export const getServerSideProps = async (context) => {
  const { data } = await gqlClient.query({
    query: gql`
      query getGame($gameId: ID! = "${context.params.id}") {
        game(id: $gameId) {
          name
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
