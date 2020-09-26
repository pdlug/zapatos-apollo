import { Resolvers } from "../../generated/resolver-types";

import * as Items from "./Items";
import * as Users from "./Users";

export const resolvers: Required<Pick<Resolvers, "Mutation" | "Query">> = {
  Query: {
    ...Items.Query,
    ...Users.Query,
  },
  Mutation: {
    ...Items.Mutation,
    ...Users.Mutation,
  },
};
