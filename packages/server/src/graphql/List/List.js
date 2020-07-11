import { gql } from 'apollo-server-express'

export const typeDefs = gql`
interface List {
  items:[Node!]!
  totalItems:Int!
}

enum ListSrtementEnum {
  ASC
  DESC
}

input ListSort {
  sorter:String!
  sortment:ListSrtementEnum!
}

`

export const ListSrtementEnum = Object.freeze({
  ASC: 'ASC',
  DESC: 'DESC'
})

export const resolvers = {
  List: {
    __resolveType: () => null,
  }
}