import { create } from "domain";
import prisma from "../lib/prisma";

export const resolvers = {
  Query: {
    users: async (parent, args, ctx) => await ctx.prisma.user.findMany(),
    user: async (parent, args, ctx) =>
      await ctx.prisma.user.findUnique({
        where: {
          email: args.email,
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

  Mutation: {
    addGameOnUserAcc: async (parent, args, ctx) => {
      const game = await prisma.games.findUnique({
        where: {
          id: args.game,
        },
        include: {
          genre: true,
        },
      });

      return await prisma.user.update({
        where: {
          email: args.email,
        },
        data: {
          user_games: {
            connect: [{ id: game.id }],
          },
        },
        include: {
          user_games: true,
        },
      });
    },
  },
};
