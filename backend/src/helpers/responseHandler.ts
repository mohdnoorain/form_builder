import { Request, Response } from "express";
import { ValidationError } from "yup";
import { RES_TYPE, RES_MSG, RES_STATUS, MYSQL_ERR_CODES } from "../constants/server.constants";
import { ResData } from "../interfaces/common.interfaces";
import { QueryFailedError } from "typeorm";

const REGEX_FOR_SINGLE_QUOTED_SUB_STRING = /'([^']*)'/g;

export const responseHandler = (status: RES_STATUS, data: ResData, _RES: Response,) => {
    _RES.status(status).json(data); return;
};

const getValidationErrResponse = (error: ValidationError) => {
    const { inner } = error;
    const invalidFields: Array<{ key: string, errors: string[] }> = [];
    inner.forEach(item => {
        const { path, type, value, errors } = item;
        if (errors) {
            invalidFields.push({
                key: path || type || value,
                errors
            })
        }
    });
    const errData: ResData = {
        type: RES_TYPE.badRequest,
        message: RES_MSG.validationErr,
        body: { invalidFields }
    }

    return errData;
}

const filterQueryFailedError = (error: QueryFailedError) => {
    const invalidFields: Array<{ key: string, errors: string[] }> = [];
    const match = error?.message?.match(REGEX_FOR_SINGLE_QUOTED_SUB_STRING);

    if (match?.length === 2) {
        invalidFields.push({
            key: match[1].replaceAll("'", ""),
            errors: [error?.message]
        });
        const errData: ResData = {
            type: RES_TYPE.internalServerError,
            message: RES_MSG.validationErr,
            body: { invalidFields }
        };
        return errData;
    } else {
        return false
    }


}
export const exceptionHandler = (error: any, _RES: Response) => {
    // validation error
    if (error instanceof ValidationError) {
        const errData = getValidationErrResponse(error)
        responseHandler(RES_STATUS.badRequest, errData, _RES);
        return
    }
    // QueryFailedError
    if (error instanceof QueryFailedError) {
        const errData = filterQueryFailedError(error);
        if (errData) {
            responseHandler(
                RES_STATUS.badRequest,
                errData,
                _RES
            );
            return
        }
    }

    // exception or runtime error
    console.error(error);
    responseHandler(
        RES_STATUS.internalServerError,
        { type: RES_TYPE.internalServerError, message: RES_MSG.controllerErr, },
        _RES
    );
};