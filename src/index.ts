import { GraphQLServer } from 'graphql-yoga'
import { prisma } from './generated/prisma-client'
import { Context } from './utils'

const resolvers = {
  Query: {
    clinicians(parent, { where, orderBy, skip, after, before, first, last }, context: Context) {
      return context.prisma.clinicians({ where, orderBy, skip, after, before, first, last })
    },
    clinician(parent, { id }, context: Context) {
      return context.prisma.clinician({ id })
    },
    practices(parent, { where, orderBy, skip, after, before, first, last }, context: Context) {
      return context.prisma.practices({ where, orderBy, skip, after, before, first, last })
    },
    practice(parent, { id }, context: Context) {
      return context.prisma.practice({ id })
    }
  },
  Practice: {
    group_status(parent) {
      return prisma.practice({ id: parent.id }).group_status()
    }
  }
}

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: { prisma },
})
server.start(() => console.log('Server is running on http://localhost:4000'))
