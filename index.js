const { GraphQLServer } = require("graphql-yoga");
const { PrismaClient } = require("@prisma/client");
const Query = require("./src/resolvers/Query");
const Mutation = require("./src/resolvers/Mutation");
const User = require("./src/resolvers/User");
const Link = require("./src/resolvers/Link");

// const links = [
//   {
//     id: "link-0",
//     url: "www.twitter.com",
//     description: "This is a social media platform.",
//   },
//   {
//     id: "link-1",
//     url: "www.facebook.com",
//     description: "This is a social media platform.",
//   },
// ];

// let idCount = links.length;

const resolvers = {
  Query,
  Mutation,
  User,
  Link,
};

// const resolvers = {
//   Query: {
//     info: () => `This is the API for Hackernews Clone`,
//     feed: async (parent, args, context) => {
//       return context.prisma.link.findMany();
//     },
//   },

//   Mutation: {
//     post: (parent, args, context) => {
//       const newLink = context.prisma.link.create({
//         data: {
//           url: args.url,
//           description: args.description,
//         },
//       });
//       return newLink;
//     },
//   },

// Mutation: {
//   post: (parent, args, context) => {
//     const link = {
//       id: `link-${idCount++}`,
//       description: args.description,
//       url: args.url,
//     };
//     links.push(link);
//     return link;
//   },
// },
// };

const prisma = new PrismaClient();

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers,
  context: (request) => {
    return {
      ...request,
      prisma,
    };
  },
});

server.start(() => console.log("Server is running on http://localhost:4000"));
