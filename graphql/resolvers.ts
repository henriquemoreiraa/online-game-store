import prisma from "../lib/prisma";

export const resolvers = {
  Query: {
    user: async (parent, args, ctx) => await ctx.prisma.user.findMany(),
    games: async (parent, args, ctx) =>
      await ctx.prisma.games.findMany({
        include: {
          genre: true,
        },
      }),
    game: async (parent, args, ctx) =>
      await ctx.prisma.games.findUnique({
        where: {
          id: args.id,
        },
        include: {
          genre: true,
        },
      }),
    genres: async (parent, args, ctx) => await ctx.prisma.genres.findMany(),
  },
};
