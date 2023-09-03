import NextAuth, { Session } from "next-auth";
import KakaoProvider from "next-auth/providers/kakao";

export default NextAuth({
  secret: process.env.JWT_SECRET,
  session: {
    strategy: "jwt",
  },
  providers: [
    KakaoProvider({
      clientId: process.env.KAKAO_ID!,
      clientSecret: process.env.KAKAO_SECRET!,
    }),
  ],
  callbacks: {
    signIn: async ({ user, account, profile }) => {
      if (account) {
        return true;
      }
      return "/auth";
    },

    jwt: async ({ token, trigger, user, session }) => {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.picture = user.image;
      }
      if (trigger === "update" && session?.accessToken) {
        token["accessToken"] = session.accessToken;
      }
      return token;
    },

    session: async ({ session, token }) => {
      session.user = {
        id: token.id as string,
        name: token.name as string,
        email: token.email as string,
        image: token.picture as string,
      };
      // session.accessToken = token.accessToken as string;

      return session;
    },
  },
});
