import { z } from "zod";

export const userRegisterZodValidation = z.object({
  body: z.object({
    name: z.string({
      required_error: "Please fill name",
      invalid_type_error: "Name must be string",
    }),
    email: z.string({
      required_error: "Please fill email",
      invalid_type_error: "Email must be string",
    }),
    password: z.string({
      required_error: "Please fill Password",
      invalid_type_error: "Password must be string",
    }),
  }),
});

export const userLoginZodValidation = z.object({
  body: z.object({
    email: z.string({
      required_error: "Please fill email",
      invalid_type_error: "Email must be string",
    }),
    password: z.string({
      required_error: "Please fill Password",
      invalid_type_error: "Password must be string",
    }),
  }),
});
