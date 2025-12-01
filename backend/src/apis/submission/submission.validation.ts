import { object, string, array, number } from "yup";
import { Forms } from "../../entity/forms.entity";

export const createSubmissionSchema = object({
    form: string().uuid().required(),
    answers: object().required("answers are required.").strip(false),
});

export const patchSubmissionSchema = object({
    uuid: string().uuid().required(),
    name: string(),
    steps: array()
}).test("no-payload", "atlead one field required.", (value) => !!(value?.name || value?.steps));

export const getSubmissionSchema = object({
    uuid: string().uuid().required()
})
export const getListSubmissionSchema = object({
    limit: number(),
    page: number(),
    name: string()
})
export interface CreateSubmissionDto {
    uuid: string,
    form: Pick<Forms, "uuid">,
    answers: string
}

export type PatchFromDto = Pick<CreateSubmissionDto, "uuid">
export interface GetSubmissionDto {
    uuid: string
}
export interface GetListSubmissionDto {
    limit: number
    page: number
    name: string
}