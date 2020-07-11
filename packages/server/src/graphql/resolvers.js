import { resolvers as demandResolvers } from './Demands/Demand';
import {resolvers as clientResolvers} from './Client/Client'
import { resolvers as nodeResolvers } from './Node/Node';
import { resolvers as listResolvers } from './List/List';

const resolvers = {
  ...nodeResolvers,
  ...listResolvers,
  ...demandResolvers,
  ...clientResolvers,
  Query: {
    ...demandResolvers.Query,
    ...clientResolvers.Query
  },
};

export default resolvers;