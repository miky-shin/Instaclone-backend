import { gql } from "apollo-server";

export default gql`
  type Mutation {
    togglelike(id: Int!): MutationResponse!
  }
`;