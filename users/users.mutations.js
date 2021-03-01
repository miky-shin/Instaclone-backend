import client from "../client";

export default {
  Mutation: {
    createAccount: (_, { firstName, lastName, username, email, password }) =>
      client.user.create({
        data: {
          firstName,
          lastName,
          username,
          email,
          password,
        },
      }),
    // Check if username or email are already on DB
    // const existingUser = await client.user.findFirst({
    //     where: {
    //         OR: [
    //             {
    //                 username,
    //             },
    //             {
    //                 email
    //             }
    //         ]
    //     }
    // }),
    // hash password
    // save and return the user
  },
};
