//const { ApolloServer, gql} = require("apollo-server");
require("dotenv").config();
import http from "http";
import logger from "morgan";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { typeDefs, resolvers } from "./schema";
import { getUser } from "./users/users.utils";
import pubsub from "./pubsub";

console.log(pubsub);

const PORT = process.env.PORT;
const apollo = new ApolloServer({
  typeDefs,
  resolvers,
  context: async (ctx) => {
    if (ctx.req) {
      //ws는 req를 하지 않음
      return {
        loggedInUser: await getUser(ctx.req.headers.authorization),
      };
    } else {
      const {
        connection: { context },
      } = ctx;
      return {
        loggedInUser: context.loggedInUser,
      };
    }
  },
  subscriptions: {
    onConnect: async ({ Authorization }) => {
      if (!Authorization) {
        throw new Error("You can't listen(You need to log In).");
      }
      const loggedInUser = await getUser(Authorization);
      return {
        loggedInUser,
      };
    },
  },
});

const app = express();
app.use(logger("tiny"));
apollo.applyMiddleware({ app });
app.use("/static", express.static("uploads"));

const httpServer = http.createServer(app);
apollo.installSubscriptionHandlers(httpServer);

httpServer.listen(PORT, () => {
  console.log(
    `🚀 Server is running on http://localhost:${PORT + "/graphql"} 🧡`
  );
});
