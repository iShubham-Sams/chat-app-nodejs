// express-session.d.ts
import * as session from "express-session";

declare module "express-session" {
  interface SessionData {
    user: any; // Replace 'any' with the actual type of your user data
    destroy: () => void;
  }
}
