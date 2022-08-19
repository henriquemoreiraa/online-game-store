import prisma from "../lib/prisma";

export const resolvers = {
  Query: {
    users: async (parent, args, ctx) => await ctx.prisma.user.findMany(),
    user: async (parent, args, ctx) =>
      await ctx.prisma.user.findUnique({
        where: {
          id: args.id,
        },
        include: {
          user_games: true,
        },
      }),
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
