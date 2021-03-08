import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import client from "../../client";

export default {
  Mutation: {
    editProfile: async (
      _,
      { firstName, lastName, username, email, password: newPassword },
      { Authorization }
    ) => {

      const { id } = await jwt.verify(Authorization, process.env.SECRET_KEY);
      let uglyPassword = null;
      if (newPassword) {
        uglyPassword = await bcrypt.hash(newPassword, 10);
      }
      const updatedUser = await client.user.update({
        where: {
          id,
        },
        data: {
          firstName,
          lastName,
          username,
          email,
          ...(uglyPassword && { password: uglyPassword }),
        },
      });
      if (updatedUser.id) {
        return {
          ok: true,
        };
      } else {
        return {
          ok: false,
          error: "Could not update Profile.",
        };
      }
    },
  },
};
