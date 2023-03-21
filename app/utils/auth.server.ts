import { Authenticator } from "remix-auth";
import { Auth0Strategy } from "remix-auth-auth0";
import { User } from "~/models/user.model";
import { sessionStorage } from "~/services/session.server";

// Create an instance of the authenticator, pass a generic with what your
// strategies will return and will be stored in the session
export const authenticator = new Authenticator<User>(sessionStorage);

let auth0Strategy = new Auth0Strategy(
  {
    callbackURL: "https://example.com/auth/auth0/callback",
    clientID: "YOUR_AUTH0_CLIENT_ID",
    clientSecret: "YOUR_AUTH0_CLIENT_SECRET",
    domain: "YOUR_TENANT.us.auth0.com",
  },
  async ({ accessToken, refreshToken, extraParams, profile }) => {
    // Get the user data from your DB or API using the tokens and profile
    // return User.findOrCreate({ email: profile.emails[0].value });
    return {}
  }
);

authenticator.use(auth0Strategy);