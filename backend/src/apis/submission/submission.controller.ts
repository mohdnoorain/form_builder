import { NextFunction, Request, Response } from "express";
import { RES_STATUS } from "../../constants/server.constants";
import { responseHandler, exceptionHandler } from "../../helpers/responseHandler";
import { formService } from "../form/form.service";
import { submittionService } from "./submission.service";

export const submissionController = {

    async create(_REQ: Request, _RES: Response, _NEXT: NextFunction) {

        try {
            const result = await submittionService.createForm(_REQ.validated);
            responseHandler(RES_STATUS.created, result, _RES);
        } catch (error: any) {
            exceptionHandler(error, _RES);
        }
    },

    async get(_REQ: Request, _RES: Response, _NEXT: NextFunction) {

        try {
            const result = await submittionService.get(_REQ.validated);
            responseHandler(RES_STATUS.created, result, _RES);
        } catch (error: any) {
            exceptionHandler(error, _RES);
        }
    },
    async getList(_REQ: Request, _RES: Response, _NEXT: NextFunction) {

        try {
            const result = await submittionService.getList(_REQ.validated);
            responseHandler(RES_STATUS.created, result, _RES);
        } catch (error: any) {
            exceptionHandler(error, _RES);
        }
    }
}