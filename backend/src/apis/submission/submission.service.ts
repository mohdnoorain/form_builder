import { RES_TYPE } from "../../constants/server.constants";
import { AppDataSource } from "../../data_sources/dataSources";
import { SubmissionsRepo } from "../../data_sources/repositories";
import { ResData } from "../../interfaces/common.interfaces";
import { CreateFormDto } from "../form/form.validation";
import { CreateSubmissionDto, GetListSubmissionDto, GetSubmissionDto } from "./submission.validation";

export const submittionService = {

    async createForm(data: CreateSubmissionDto) {
        console.log(data)
        const form = await SubmissionsRepo.save({ ...data });

        const resData: ResData = {
            type: RES_TYPE.created,
            message: "Created successfully",
            body: { uuid: form.uuid }
        }

        return resData;
    },

    async get(data: GetSubmissionDto) {
        const submission = await SubmissionsRepo.findOne(
            {
                where: [
                    { uuid: data.uuid }
                ]
            }
        );

        const resData: ResData = {
            type: RES_TYPE.success,
            message: "Fetched successfully",
            body: null
        }

        if (submission) {
            resData.body = submission;
        } else {
            resData.message = "Not found";
            resData.body = data;
        }

        return resData;
    },

    async getList(data: GetListSubmissionDto) {
        const { page = 1, limit = 10, name = "" } = data;
        const submission: any[] = await AppDataSource.query(`
            SELECT s.uuid, s.answers, s.createdAt, f.name 
            FROM submissions s 
            LEFT JOIN forms f ON f.uuid = s.formUuid 
            ${name ? `WHERE f.name LIKE CONCAT('%', '${name}', '%')` : ""}
            ORDER BY s.createdAt 
            LIMIT ${limit * (page - 1)}, ${limit}
            `)

        const total = await AppDataSource.query(`
            SELECT COUNT(*) AS total
            FROM submissions s 
            LEFT JOIN forms f ON f.uuid = s.formUuid 
            ${name ? `WHERE f.name LIKE CONCAT('%', '${name}', '%')` : ""}
            `)

        const resData: ResData = {
            type: RES_TYPE.success,
            message: "Fetched successfully",
            body: null
        }

        if (submission?.length > 0) {
            resData.body = {
                list: submission?.map((item: any) => {
                    return {
                        ...item,
                        answers: JSON.parse(item.answers)
                    }
                }),
                ...total?.[0] || 0
            };
        } else {
            resData.message = "Not found";
            resData.body = data;
        }

        return resData;
    },
}