import { NextFunction, Request, Response } from "express";
import { ObjectSchema, ValidateOptions } from "yup";
import { exceptionHandler } from "../helpers/responseHandler";

export const validator = (objectSchema: ObjectSchema<any>, options?: ValidateOptions<any>) => {
    return async (_REQ: Request, _RES: Response, _NEXT: NextFunction) => {
        try {
            console.log(_REQ.body)
            _REQ.validated = await objectSchema.validate({ ..._REQ.body, ..._REQ.query }, { abortEarly: false, stripUnknown: true, ...options });
            console.log(_REQ.validated)
            _NEXT();
        } catch (error) {
            exceptionHandler(error, _RES);
        }
    };
}
