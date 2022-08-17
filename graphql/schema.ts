import { gql } from "apollo-server-micro";

export const typeDefs = gql`
  type User {
    id: String
    email: String
    name: String
    wish_list: [Games]
    cart: [Games]
  }

  type Games {
    id: String
    name: String
    price: String
    game_img: String
    game_banner: String
    genre: Genres
  }

  type Genres {
    id: String
    name: String
    games: [Games]
  }

  type Query {
    user: [User]!
    games: [Games]!
    game(id: ID!): Games!
    genres: [Genres]!
  }
`;
