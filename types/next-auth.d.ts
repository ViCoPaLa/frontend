import NextAuth from "next-auth";
import { User } from "./user";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: User;
  }
  interface User {
    id: string;
    name?: string;
    image?: string;
    email?: string;
  }
}
