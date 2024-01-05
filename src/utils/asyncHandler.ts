import { NextFunction, Request, Response } from "express";

const asyncHandler = (requestHandler: (req: Request, res: Response, nex: NextFunction) => void) => {
  return (req: Request, res: Response, nex: NextFunction) => {
    Promise.resolve(requestHandler).catch((err) => nex(err));
  };
};

export default asyncHandler;
