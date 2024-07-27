import { z } from "zod";
import { Response, NextFunction, Request } from "express";

export function validate(schema: z.Schema) {
    return function(req: Request, _res: Response, next: NextFunction): void {
        const result = schema.safeParse({
            params: req.params,
            query: req.query,
            body: req.body
        })

        if (result.success) {
            req.locals = {};
            req.locals.params = result.data.params,
            req.locals.query = result.data.query,
            req.locals.body = result.data.body

            return next();
        }

        throw new Error("Validation error");
    }
}