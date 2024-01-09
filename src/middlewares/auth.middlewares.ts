import { Request, Response, NextFunction } from "express";

const isLogin = (req: Request, res: Response, nex: NextFunction) => {
  try {
    if (req.session.user) {
    } else {
      res.redirect("/api/v1");
    }
  } catch (error) {
    console.log(error);
  }
};

const isLogout = (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.session.user) {
      res.redirect("/api/v1/dashboard");
    }
    next();
  } catch (error) {
    console.log(error);
  }
};

export { isLogin, isLogout };
