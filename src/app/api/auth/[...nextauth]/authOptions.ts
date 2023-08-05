import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { account, ID } from "@/lib/appwrite";
export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
    GithubProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
    //TODO: Implement later
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const user = { id: "1", name: "J Smith", email: "jsmith@example.com" };
        const promise = account.listLogs();

        promise.then(
          function (response) {
            console.log(response); // Success
          },
          function (error) {
            console.log(error); // Failure
          }
        );
        // const promise = account.create(
        //   ID.unique(),
        //   credentials?.email,
        //   credentials?.password,
        //   credentials?.email
        // );

        // promise.then(
        //   function (response) {
        //     console.log(response);
        //   },
        //   function (error) {
        //     console.log(error);
        //   }
        // );
        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user;
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)
        // const res = await fetch("/api/auth", {
        //   method: "POST",
        //   body: JSON.stringify(credentials),
        //   headers: { "Content-Type": "application/json" },
        // });
        // console.log(res);
        // const user = await res.json();

        // // If no error and we have user data, return it
        // if (res.ok && user) {
        //   return user;
        // }
        // // Return null if user data could not be retrieved
        // return null;
      },
    }),
    // ...add more providers here
  ],
  theme: {
    colorScheme: "dark", // "auto" | "dark" | "light"
    brandColor: "#256464", // Hex color code
    logo: "https://cdn.pixabay.com/photo/2019/04/04/15/17/smartphone-4103051_1280.jpg", // Absolute URL to image
    buttonText: "#256464", // Hex color code
  },
  // pages: {
  //   signIn: "/login",
  // },
};
