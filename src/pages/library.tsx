import Header from "../components/Header";
import Header2 from "../components/Header2";
import gqlClient from "../../graphql/apollo-client";
import { useState } from "react";
import { gql } from "apollo-server-micro";
import { Game, User } from "../types";
import { getSession } from "next-auth/react";
import Cart from "../components/Cart";

type Props = {
  user: User;
};

function Library({ user }: Props) {
  const [isCart, setIsCart] = useState(false);
  const [cartData, setCartData] = useState<Game[]>([]);

  return (
    <div className="flex flex-col items-center text-white h-fit">
      <Header />
      <div className="w-4/5 h-screen">
        <Header2
          setIsCart={setIsCart}
          isCart={isCart}
          setCartData={setCartData}
          cartData={cartData}
        />
        <p className=" flex flex-row items-center sm:text-xl text-sm my-5 font-semibold w-full ">
          Your Games <span className="text-xs mx-3 text-gray-200">{`>`}</span>
        </p>
        <div className="h-full w-full flex flex-row flex-wrap justify-center md:justify-start gap-10">
          {user.user_games.map((game) => (
            <>
              <div
                key={game.id as string}
                className="w-52 h-3/5 mb-16 bg-emerald-500"
              >
                <img
                  className="w-full h-full object-cover"
                  src={`${game.game_img}`}
                  alt=""
                />
                <p className="font-semibold mt-3">{game.name}</p>
              </div>
            </>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Library;

export const getServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanet: false,
      },
    };
  }

  const { data } = await gqlClient.query({
    query: gql`
    query getUser($email: String! = "${session.user.email}") {
        user(email: $email) {
          name
          user_games {
            name
            game_img
          }
        }
      }
      `,
  });

  return {
    props: {
      user: data.user,
    },
  };
};
