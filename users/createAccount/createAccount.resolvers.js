import bcrypt from "bcrypt";
import client from "../../client";

export default {
  Mutation: {
    createAccount: async (
      _,
      { firstName, lastName, username, email, password }
    ) => {
      try {
        // Check if username or email are already on DB
        const existingUser = await client.user.findFirst({
          where: {
            OR: [
              {
                username,
              },
              {
                email,
              },
            ],
          },
        });
        // console.log(existingUser);
        if (existingUser) {
          throw new Error("This username/password is already taken");
        }

        // hash password
        const uglyPassword = await bcrypt.hash(password, 10);

        // save and return the user
        return client.user.create({
          data: {
            firstName,
            lastName,
            username,
            email,
            password: uglyPassword,
          },
        });
      } catch (error) {
        return error;
      }
    },
  },
};
