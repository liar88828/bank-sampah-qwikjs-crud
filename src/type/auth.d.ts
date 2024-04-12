import { User, JWT, Session, Auth } from "@auth/core";

declare module "@auth/core/types" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface User {
    // email: string;
    // alamat: string;
    // nama: string;
    // id: number;
    // no_hp: string;
  }
  interface JWT {
    /** OpenID ID Token */
    idToken?: string;
  }

  interface Session {
    loggedUser: {} & DefaultSession["user"];
    user: {
      // email: string;
      // alamat: string;
      // nama: string;
      id: string;
      // no_hp: string;
      /** The user's postal address. */
    } & DefaultSession["user"];
  }
}
