import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config";
import { TokenPayload } from "../types";

export async function authenticate(req: Request, _res: Response, next: NextFunction) {
    const authorization = req.headers["Authorization"] as string;
    if (!authorization) {
        throw new Error("Unauthorized");
    }

    const token = authorization.split(" ")[1];

    const payload = jwt.verify(token, config.jwt.secret) as TokenPayload;

    if (!payload) {
        throw new Error("Unauthorized");
    }

    req.auth.userId = payload.user_id;
    return next();
}