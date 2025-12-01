import { Request, Response } from "express";
import { AppDataSource } from "../../data_sources/dataSources";
import { ResData } from "../../interfaces/common.interfaces";
import { RES_MSG, RES_STATUS, RES_TYPE } from "../../constants/server.constants";
import { FormRepo, SubmissionsRepo } from "../../data_sources/repositories";
import { CreateFormDto, GetFormDto, GetFormListDto, PatchFromDto } from "./form.validation";
import { Forms } from "../../entity/forms.entity";

export const formService = {

    async createForm(data: CreateFormDto) {

        const form = await FormRepo.save({ ...data });

        const resData: ResData = {
            type: RES_TYPE.created,
            message: "Created successfully",
            body: { uuid: form.uuid, name: form.name }
        }

        return resData;
    },

    async patch(data: PatchFromDto) {

        const form = await FormRepo.save({ ...data });

        const resData: ResData = {
            type: RES_TYPE.created,
            message: "Updated successfully",
            body: { uuid: form.uuid, name: form.name }
        }

        return resData;
    },

    async get(data: GetFormDto) {

        const form = await FormRepo.findOne(
            {
                where: [
                    { uuid: data.uuid },
                    { name: data.name },
                ]
            }
        );

        const resData: ResData = {
            type: RES_TYPE.success,
            message: "Fetched successfully",
            body: null
        }

        if (form) {
            resData.body = form;
        } else {
            resData.message = "Not found";
            resData.body = data;
        }

        return resData;
    },

    async getList(data: GetFormListDto) {
        const { page = 1, limit = 10, name = "" } = data;

        const form = await AppDataSource.query(`
            SELECT f.uuid, f.name, COUNT(s.uuid) AS submission_count
            FROM forms f
            LEFT JOIN submissions s ON f.uuid = s.formUuid
            ${name ? `WHERE f.name LIKE CONCAT('%', '${name}', '%')` : ""}
            GROUP BY f.uuid, f.name 
            ORDER BY submission_count DESC 
            LIMIT ${limit * (page - 1)}, ${limit}`)


        const total = await AppDataSource.query(`
            SELECT COUNT(*) AS total
            FROM forms f 
            ${name ? `WHERE f.name LIKE CONCAT('%', '${name}', '%')` : ""}
            `)

        const resData: ResData = {
            type: RES_TYPE.success,
            message: "Fetched successfully",
            body: null
        }

        if (form?.length > 0) {
            resData.body = { list: form, ...total?.[0] || 0 };
        } else {
            resData.message = "Not found";
            resData.body = data;
        }

        return resData;
    }

    // todo : restrict access only to owner
    // async getAllPlan(_REQ: Request, _RES: Response) {
    //     const { businessProfileUuid }: GetAllPlanDto = _REQ.body;

    //     const plans = await planService.PlanRepository.findBy(
    //         { businessProfile: { uuid: businessProfileUuid } }
    //     );

    //     if (plans.length === 0) {
    //         const resData: ResData = {
    //             type: RES_TYPE.notFound,
    //             message: RES_MSG.notFoundOrInactive,
    //         }
    //         responseHelper(RES_STATUS.notFound, resData, _RES);
    //         return;
    //     }
    //     const resData: ResData = {
    //         type: RES_TYPE.success,
    //         message: "",
    //         body: plans
    //     }
    //     responseHelper(RES_STATUS.success, resData, _RES);
    // }

    // async getPlan(_REQ: Request, _RES: Response) {
    //     const { uuid, name }: GetPlanDto = _REQ.body;

    //     const plan = await planService.PlanRepository.findOneBy([{ uuid }, { name }]);

    //     if (!plan?.uuid) {
    //         const resData: ResData = {
    //             type: RES_TYPE.notFound,
    //             message: RES_MSG.notFoundOrInactive,
    //         }
    //         responseHelper(RES_STATUS.notFound, resData, _RES);
    //         return;
    //     }
    //     const resData: ResData = {
    //         type: RES_TYPE.success,
    //         message: "",
    //         body: plan
    //     }
    //     responseHelper(RES_STATUS.success, resData, _RES);
    // }

    // async getPlanSubscriptions(_REQ: Request, _RES: Response) {
    //     const { uuid, name }: GetPlanDto = _REQ.body;

    //     const plan = await planService.PlanRepository.findOne(
    //         {
    //             select: ['name', "uuid"],
    //             where: { uuid: uuid },
    //             relations: {
    //                 subscribtions: {
    //                     subscriber: true
    //                 }
    //             }
    //         }
    //     );

    //     if (!plan?.uuid) {
    //         const resData: ResData = {
    //             type: RES_TYPE.notFound,
    //             message: RES_MSG.notFoundOrInactive,
    //         }
    //         responseHelper(RES_STATUS.notFound, resData, _RES);
    //         return;
    //     }
    //     const resData: ResData = {
    //         type: RES_TYPE.success,
    //         message: "",
    //         body: plan
    //     }
    //     responseHelper(RES_STATUS.success, resData, _RES);
    // }

    // async updatePlan(_REQ: Request, _RES: Response) {

    //     const { uuid }: UpdatePlanDto = _REQ.body;
    //     const plan = await planService.PlanRepository.update(
    //         { uuid },
    //         { ..._REQ.body }
    //     );

    //     if (plan?.affected === 0) {
    //         const resData: ResData = {
    //             type: RES_TYPE.notFound,
    //             message: RES_MSG.notFoundOrInactive, // could be inactive
    //         }
    //         responseHelper(RES_STATUS.notFound, resData, _RES);
    //         return;
    //     }
    //     const resData: ResData = {
    //         type: RES_TYPE.success,
    //         message: "",
    //     }
    //     responseHelper(RES_STATUS.success, resData, _RES);
    // }
}