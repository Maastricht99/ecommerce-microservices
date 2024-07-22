import { z } from "zod";
import { Request, Response, NextFunction } from "express";

export function validate(schema: z.Schema) {
    return function(req: Request, _: Response, next: NextFunction): void {
        const result = schema.safeParse({
            params: req.params,
            query: req.query,
            body: req.body
        })

        if (result.success) {
            req.params = result.data.params,
            req.query = result.data.query,
            req.body = result.data.body

            return next();
        }

        throw new Error("Validation error");
    }
}