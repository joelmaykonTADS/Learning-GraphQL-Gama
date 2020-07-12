import { gql } from 'apollo-server-express';
import createRepository from '../../io/Database/createRepository';
import { ListSrtementEnum } from '../List/List';
import * as uuid from 'uuid';

const clientRepository = createRepository('client')

export const typeDefs = gql`
  type Client implements Node {
    id:ID!,
    name:String!
    email:String!,
    disabled:Boolean!
  }

  type ClientList implements List {
    items:[Client!]!
    totalItems:Int!
  }

  input ClientListFilter {
    name:String
    email:String,
    disabled:Boolean
  }

  input ClientListOptions {
    take:Int
    skip:Int
    filter:ClientListFilter
    sort:ListSort
  }

  extend type Query {
    client(id:ID!):Client
    clients(options:ClientListOptions):ClientList
  }

  input CreateClientInput {
    name:String!
    email:String!
  }

  input UpdateClientInput {
    id:ID!
    name:String!
    email:String!
  }

  extend type Mutation {
    createClient(input:CreateClientInput!):Client!
    updateClient(input:UpdateClientInput):Client!
  }
`;

export const resolvers = {
  Query: {
    client: async (_, { id }) => {
      const clients = await clientRepository.read();
      console.log(clients)
      return clients.find(client => client.id == id);
    },
    clients: async (_, args) => {
      const {
        skip = 0,
        take = 10,
        sort,
        filter
      } = args.options || {};

      /**
       * @type {Array.<*>}
       */
      const clients = await clientRepository.read();

      if (sort) {
        clients.sort((clientA, clientB) => {
          if (!['name', 'email', 'disabled'].includes(sort.sorter))
            throw new Error(`Cannot sort by field ${sort.sorter}`);
          const fieldA = clientA[sort.sorter];
          const fieldB = clientB[sort.sorter];
          if (typeof fieldA === 'string') {
            if (sort.sortment === ListSrtementEnum.ASC) {
              return fieldA.localeCompare(fieldB)
            } else
              return fieldB.localeCompare(fieldB);
          }
          if (sort.sortment === ListSrtementEnum.ASC) {
            return Number(fieldA) - Number(fieldB);
          } else
            return Number(fieldB) - Number(fieldA);
        })
      }

      const filtredClients = clients.filter((client) => {
        if (!filter || Object.keys(filter).length === 0) {
          return true
        }
        return Object.entries(filter)
          .every(([field, value]) => {
            if (client[field] === null || client[field] === undefined)
              return false
            if (typeof (value) === 'string') {
              if (value.startsWith('%') && value.endsWith('%')) {
                return client[field].includes(value.substr(1, value.length - 2))
              }
              if (value.startsWith('%')) {
                return client[field].includes(value.substr(1))
              }
              if (value.endsWith('%')) {
                return client[field].includes(value.substr(0, value.length - 1))
              }
              return client[field] === value
            }
            return client[field] === value
          })
      })

      return {
        items: filtredClients.slice(skip, skip + take),
        totalItems: filtredClients.length
      };
    }
  },

  Mutation: {
    createClient: async (_, { input }) => {
      const clients = await clientRepository.read();
      const client = {
        id: uuid.v4(),
        name: input.name,
        email: input.email,
        disabled:false
      }

      await clientRepository.write([...clients, client]);
      return client
    },
    updateClient: async (_, { input }) => {
      const clients = await clientRepository.read();

      const currentClient = clients.find((client) => client.id === input.id);

      if (!currentClient) {
        throw new Error(`No client with this id"${input.id}"`)
      };

      const updateClient = {
        ...currentClient,
        name: input.name,
        email: input.email,
      };

      const updateClients = clients.map((client) => {
        if (client.id === updateClient.id) return updateClient;
        return client;
      });

      await clientRepository.write(updateClients);
      return updateClient;
    }
  }
}  