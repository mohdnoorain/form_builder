import { NextFunction, Request, Response } from "express";
import { boolean, number, object, string } from "yup";
import { exceptionHandler, responseHandler } from "../../helpers/responseHandler";
import { RES_STATUS, RES_TYPE } from "../../constants/server.constants";
import { ResData } from "../../interfaces/common.interfaces";
import { formService } from "./form.service";


export const formController = {

    async create(_REQ: Request, _RES: Response, _NEXT: NextFunction) {

        try {
            const result = await formService.createForm(_REQ.validated);
            responseHandler(RES_STATUS.created, result, _RES);
        } catch (error: any) {
            exceptionHandler(error, _RES);
        }
    },
    async patch(_REQ: Request, _RES: Response, _NEXT: NextFunction) {

        try {
            const result = await formService.patch(_REQ.validated);
            responseHandler(RES_STATUS.success, result, _RES);
        } catch (error: any) {
            exceptionHandler(error, _RES);
        }
    },

    async get(_REQ: Request, _RES: Response, _NEXT: NextFunction) {

        try {
            const result = await formService.get(_REQ.validated);
            responseHandler(RES_STATUS.success, result, _RES);
        } catch (error: any) {
            exceptionHandler(error, _RES);
        }
    },

    async getList(_REQ: Request, _RES: Response, _NEXT: NextFunction) {

        try {
            const result = await formService.getList(_REQ.validated);
            responseHandler(RES_STATUS.success, result, _RES);
        } catch (error: any) {
            exceptionHandler(error, _RES);
        }
    }



    // async updatePlan(_REQ: Request, _RES: Response, _NEXT: NextFunction) {

    //     try {
    //         const planValidationSchema = object({
    //             name: string(),
    //             duration: string(),
    //             price: number(),
    //             fixedSeat: boolean(),
    //             fixedSeatPrice: number(),
    //             totalSeats: number(),
    //             available: number(),
    //             benefits: string(),
    //             refundOrCancellationPolicy: string()
    //         });

    //         _REQ.body = await validationHelper(planValidationSchema, _REQ.body);

    //         _NEXT();

    //     } catch (error: any) {
    //         controllerExceptionHelper(error, _RES);
    //     }
    // }

    // async getAllPlan(_REQ: Request, _RES: Response, _NEXT: NextFunction) {
    //     try {

    //         const getPlanSchema = object({
    //             businessProfileUuid: string().uuid().required("Business id is required.")
    //         });

    //         _REQ.body = await validationHelper(getPlanSchema, { ..._REQ.params });

    //         _NEXT();

    //     } catch (error: any) {
    //         controllerExceptionHelper(error, _RES);
    //     }
    // }

    // async getPlan(_REQ: Request, _RES: Response, _NEXT: NextFunction) {
    //     try {

    //         const getPlanSchema = object({
    //             uuid: string().uuid().required("Plan id is required.")
    //         });

    //         _REQ.body = await validationHelper(getPlanSchema, { ..._REQ.params });

    //         _NEXT();

    //     } catch (error: any) {
    //         controllerExceptionHelper(error, _RES);
    //     }
    // }

    // async getPlanSubscriptions(_REQ: Request, _RES: Response, _NEXT: NextFunction) {
    //     try {

    //         const getPlanSchema = object({
    //             uuid: string().uuid().required("Plan id is required.")
    //         });

    //         _REQ.body = await validationHelper(getPlanSchema, { ..._REQ.params });

    //         _NEXT();

    //     } catch (error: any) {
    //         controllerExceptionHelper(error, _RES);
    //     }
    // }


};