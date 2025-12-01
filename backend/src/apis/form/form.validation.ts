import { object, string, number, boolean, array } from "yup";

export const createFormSchema = object({
    name: string().required("Form name is required."),
    steps: array().required("steps are required."),
});

export const patchFormSchema = object({
    uuid: string().uuid().required(),
    name: string(),
    steps: array()
}).test("no-payload", "atlead one field required.", (value) => !!(value?.name || value?.steps));

export const getFormSchema = object({
    uuid: string().uuid(),
    name: string(),
}).test("uuid-or-name", "Uuid or name is required.", (value) => !!(value?.uuid || value?.name));

export const getFormListSchema = object({
    limit: number(),
    page: number(),
    name: string()
});

export interface CreateFormDto {
    uuid: string,
    steps: string
}

export type PatchFromDto = Pick<CreateFormDto, "steps">

export interface GetFormDto {
    uuid: string
    name: string
}

export interface GetFormListDto {
    limit: number
    page: number
    name: string
}