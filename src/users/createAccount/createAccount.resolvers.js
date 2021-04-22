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
        const updatedUser = await client.user.create({
          data: {
            firstName,
            lastName,
            username,
            email,
            password: uglyPassword,
          },
        });
        if(updatedUser){
          return {
            ok: true
          };
        }
      } catch (error) {
        return error;
      }
    },
  },
};
