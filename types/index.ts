import {Blog, User} from "@prisma/client";

export type SafeListing = Omit<User, "createdAt"> & {
  createdAt: string;
};

export type SafeUser = Omit<
  User,
  "createdAt" | "updatedAt" | "emailVerified"
> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
};

export type SafeBlogs = Omit<Blog, "createAt"> & {
  createdAt:String
}