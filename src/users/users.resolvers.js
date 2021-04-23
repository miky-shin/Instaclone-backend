import client from "../client";

export default {
  User: {
    totalPhotos: ({ id }) =>
      client.user.count({
        where: {
          Photos: {
            some: {
              id,
            },
          },
        },
      }),
    totalFollowing: ({ id }) =>
      client.user.count({
        where: {
          followers: {
            some: {
              id,
            },
          },
        },
      }),
    totalFollowers: ({ id }) =>
      client.user.count({
        where: {
          following: {
            some: {
              id,
            },
          },
        },
      }),
    Photos: ({ id }) =>
      client.photo.findMany({
        where: { userId: id },
      }),
    isMe: ({ id }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }
      return id === loggedInUser.id;
    },
    isFollowing: async ({ id }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }
      const exists = await client.user.count({
        where: {
          username: loggedInUser.username,
          following: {
            some: {
              id,
            },
          },
        },
      });
      return Boolean(exists);
    },
    //photos: ({id}) => client.user.findUnique({where:{id}}).photos(),
  },
};
