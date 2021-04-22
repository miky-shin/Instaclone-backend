export default {
  Comment: {
    isMine: ({ userId }, _, { loggedInUser }) => {
      if (!loggedInUser) {
          console.log(userId);
        return false;
      }
      return userId === loggedInUser.id;
    },
  },
};
