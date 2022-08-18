import { gql } from "apollo-server-micro";
import gqlClient from "../../../graphql/apollo-client";
import { Games } from "@prisma/client";
import Header from "../../components/Header";
import Button from "../../components/Button";
import Header2 from "../../components/Header2";

type Game = {
  id: String;
  name: String;
  price: String;
  game_img: String;
  game_trailer: String;
  genre: {
    name: String;
  };
};

type Props = {
  game: Game;
};

function Game({ game }: Props) {
  console.log(game);
  return (
    <>
      <Header />
      <div className="text-white h-screen flex flex-col items-center ">
        <div className=" w-11/12 ">
          <Header2 />
          <div className="flex flex-col md:flex-row justify-evenly my-5  h-4/5">
            <div className="w-full md:w-3/6 h-full">
              <h1 className="text-2xl md:text-3xl font-semibold mb-10 ">
                {game.name}
              </h1>
              <iframe
                width={"100%"}
                height={"90%"}
                src={`${game.game_trailer}`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              ></iframe>
            </div>
            <div className="mt-28 md:my-20 md:w-1/4">
              <p className="mb-5">${game.price}.00</p>
              <Button btn="buy" />
              <Button btn="cart" />
              <Button btn="wish" />
              <p className="border-b	border-gray-500 flex justify-between text-gray-400 mt-5">
                Genre: <span className="text-white">{game.genre.name}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
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
