export default {
  Comment: {
    user: ({ userId }) => client.user.findUnique({ where: { id: userId } }),
    isMine: ({ userId }, _, { loggedInUser }) => {
      if (!loggedInUser) {
          console.log(userId);
        return false;
      }
      return userId === loggedInUser.id;
    },
  },
};
