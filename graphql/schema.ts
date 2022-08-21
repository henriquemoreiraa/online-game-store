import { gql } from "apollo-server-micro";

export const typeDefs = gql`
  type User {
    id: String
    email: String
    name: String
    cart: [Games]
    user_games: [Games]
  }

  type Games {
    id: String
    name: String
    price: String
    game_img: String
    game_trailer: String
    genre: [Genres]
  }

  type Genres {
    id: String
    name: String
    games: [Games]
  }

  type Query {
    users: [User]!
    user(email: String!): User!
    games: [Games]!
    game(id: ID!): Games!
    genres: [Genres]!
  }

  type Mutation {
    addGameOnUserAcc(email: String!, game: ID!): User!
    addGameOnUserCart(email: String!, game: ID!): User!
    deleteGameOnUserCart(email: String!, game: ID!): User!
  }
`;
