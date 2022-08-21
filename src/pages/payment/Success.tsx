import { BsCheckCircle } from "react-icons/bs";
import gqlClient from "../../../graphql/apollo-client";
import { gql } from "apollo-server-micro";
import { GetServerSideProps } from "next";
import Link from "next/link";

function Success() {
  return (
    <div className=" text-white  flex flex-col justify-center items-center h-screen">
      <div className=" flex items-center mb-3">
        {" "}
        <BsCheckCircle color="rgb(129 140 248)" size={"1.5em"} />{" "}
        <p className="ml-3  text-2xl ">Successful payment</p>
      </div>
      <Link href="/library">
        <p className="border-b hover:opacity-90 cursor-pointer">
          Go to your library
        </p>
      </Link>
    </div>
  );
}

export default Success;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { data } = await gqlClient.mutate({
    mutation: gql`
    mutation getGame($email: String! = "${context.query.user}", $game: ID! = "${context.query.game}") {
      addGameOnUserAcc(email: $email, game: $game) {
          name
          user_games {
            name
          }
        }
      }
    `,
  });

  return {
    props: {
      game: data,
    },
  };
};
