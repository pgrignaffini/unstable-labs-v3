import NextAuth, { type NextAuthOptions } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from "@next-auth/prisma-adapter";

import { env } from "../../../env/server.mjs";
import { prisma } from "../../../server/db/client";

import { Novu } from "@novu/node";

export const authOptions: NextAuthOptions = {
  // Include user.id on session
  callbacks: {
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
    // async signIn(user) {
    //   const novu = new Novu(process.env.NOVU_API_KEY);
    //   const { status } = await novu.subscribers.identify(user?.user?.id, {
    //     email: user?.user?.email as string || undefined,
    //     firstName: user?.user?.name as string || undefined,
    //   })
    //   if (status === 201) {
    //     return true;
    //   } else {
    //     return false;
    //   }
    // }
  },
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  providers: [
    DiscordProvider({
      clientId: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_CLIENT_SECRET,
    }),
    // ...add more providers here
  ],
};

export default NextAuth(authOptions);
