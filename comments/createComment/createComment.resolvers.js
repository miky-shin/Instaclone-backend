import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    createComment: protectedResolver(
      async (_, { photoId, payload }, { loggedInUser }) => {
        const photo = await client.photo.findUnique({
          where: {
            id: photoId,
          },
          select: {
            id: true,
          },
        });
        if (!photo) {
          return {
            ok: false,
            error: "Photo not found.",
          };
        }
        //   const CommentWhere = {
        //     photoId_userId: {
        //       userId: loggedInUser.id,
        //       photoId: id,
        //     },
        //   };
        //   const comment = await client.comment.findUnique({
        //     where: CommentWhere,
        //   });
        //   if (comment) {
        //     await client.comment.delete({
        //       where: CommentWhere,
        //     });
        //   } else {
        await client.comment.create({
          data: {
            payload,
            user: {
              connect: {
                id: loggedInUser.id,
              },
            },
            photo: {
              connect: {
                id: photoId,
              },
            },
          },
        });
        //}
        return {
          ok: true,
        };
      }
    ),
  },
};
