import { Express } from "express";
import { ReqLocals, Auth } from "./index";

declare global {
  namespace Express {
    interface Request {
      locals: any;
      auth: any;
    }
  }
}