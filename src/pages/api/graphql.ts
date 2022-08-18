import { ApolloServer } from "apollo-server-micro";
import { typeDefs } from "../../../graphql/schema";
import { resolvers } from "../../../graphql/resolvers";
import { createContext } from "../../../graphql/context";
import Cors from "micro-cors";

export const config = {
  api: {
    bodyParser: false,
  },
};
const cors = Cors();

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: createContext,
});

const startServer = apolloServer.start();

export default cors(async function (req, res) {
  if (req.method === "OPTIONS") {
    res.end();
    return false;
  }

  await startServer;

  await apolloServer.createHandler({
    path: "/api/graphql",
  })(req, res);
});

// export default cors(handler);
