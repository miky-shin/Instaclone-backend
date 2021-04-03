import client from "../../client";
import { protectedResolver } from "../users.utils";

export default {
  Query: {
    // me: protectedResolver(
    //     (_, __, { loggedInUser }) => {
    //   client.user.findUnique({
    //     where: {
    //       id: loggedInUser.id,
    //     },
    //   }),
    //   console.log(loggedInUser.username);
    // }),

    me: protectedResolver(async (_, __, { loggedInUser }) => {
      const myprofile = await client.user.findUnique({
        where: {
          id: loggedInUser.id,
        },
      });
    return myprofile;
    }),
  },
};
