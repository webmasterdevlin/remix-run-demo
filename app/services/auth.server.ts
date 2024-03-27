import { Authenticator } from "remix-auth";
import type { User } from "~/models/user.model";
import { sessionStorage } from "~/services/session.server";
import { FormStrategy } from "remix-auth-form";


// Create an instance of the authenticator, pass a generic with what
// strategies will return and will store in the session
export let authenticator = new Authenticator<User>(sessionStorage);

// Tell the Authenticator to use the form strategy
authenticator.use(
    new FormStrategy(async ({ form }: any) => {
      let email = form.get("email");
      let password = form.get("password");
      let user = { email, password } as any;
      // let user = await login(email, password);
      // the type of this user must match the type you pass to the Authenticator
      // the strategy will automatically inherit the type if you instantiate
      // directly inside the `use` method
      return user;
    }),
    // each strategy has a name and can be changed to use another one
    // same strategy multiple times, especially useful for the OAuth2 strategy.
    "user-pass"
  );