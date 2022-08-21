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
          cart: {
            include: {
              genre: true,
            },
          },
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
      return await ctx.prisma.user.update({
        where: {
          email: args.email,
        },
        data: {
          user_games: {
            connect: [{ id: args.game }],
          },
        },
        include: {
          user_games: true,
        },
      });
    },
    addGameOnUserCart: async (parent, args, ctx) => {
      return await ctx.prisma.user.update({
        where: {
          email: args.email,
        },
        data: {
          cart: {
            connect: [{ id: args.game }],
          },
        },
        include: {
          cart: {
            include: {
              genre: true,
            },
          },
        },
      });
    },
    deleteGameOnUserCart: async (parent, args, ctx) => {
      return await ctx.prisma.user.update({
        where: {
          email: args.email,
        },
        data: {
          cart: {
            disconnect: [{ id: args.game }],
          },
        },
        include: {
          cart: {
            include: {
              genre: true,
            },
          },
        },
      });
    },
  },
};
