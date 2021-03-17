import client from "../../client";
import { protectedResolver } from "../../users/users.utils";
import { processHashtags } from "../photos.utils";

export default {
  Mutation: {
    uploadPhoto: protectedResolver(
      async (_, { file, caption }, { loggedInUser }) => {
        let hashtagObjs = [];
        if (caption) {
          /// parse caption
          hashtagObjs = processHashtags(caption);
        }
        return client.photo.create({
          data: {
            file,
            caption,
            user: {
                connect: {
                    id: loggedInUser.id,
                },
            },
            ...(hashtagObjs.length > 0 && {
                hashtags: {
                  connectOrCreate: hashtagObjs,
                },
              }
            ),
          },
        });
        /// get or create Hashtags
        // save the photo WITH the parsed hash tags
        // add the photo to the hashtags
      }
    ),
  },
};
