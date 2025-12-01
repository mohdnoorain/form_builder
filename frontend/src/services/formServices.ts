const BASE_URL = "http://localhost:8200/api/v1";

const API_URLS = {
    getForm: `${BASE_URL}/form`,
    getFormsList: `${BASE_URL}/form/list`,
    submitForm: `${BASE_URL}/submission`,
    getSubmissionsList: `${BASE_URL}/submission/list`,
}
export type FieldType = "text" | "number" | "select" | "multi-select" | "date" | "textarea" | "switch";
export interface Step {
    name: string
    title: string
    desc: string
    label?: string,
    placeholder: string
    type: FieldType
    options?: {
        label: string,
        value: string | number
    }[]
    validations: {
        required?: boolean
        minLength?: number
        maxLength?: number
        regex?: string
        min?: number
        max?: number
        minSelect?: number
        maxSelect?: number
        minDate?: string
    }
}
export type Steps = Step[];

export type GetFormType = Partial<Record<"uuid" | "name", string>>;
export type GetFormsListType = Partial<Record<"limit" | "page" | "name", string>>;

export interface SubmitFormType {
    form: string,
    answers: Record<string, string | string[]>
}

export async function getForm(payload: GetFormType) {
    const params = new URLSearchParams(payload);

    const res = await fetch(`${API_URLS.getForm}?${params.toString()}`);
    if (!res.ok) throw new Error("Failed");
    return res.json();
}

export async function getFormsList(payload: GetFormsListType) {
    const params = new URLSearchParams(payload);

    const res = await fetch(`${API_URLS.getFormsList}?${params.toString()}`);
    if (!res.ok) throw new Error("Failed");
    return res.json();
}
export async function getSubmissionsList(payload: GetFormsListType) {
    const params = new URLSearchParams(payload);

    const res = await fetch(`${API_URLS.getSubmissionsList}?${params.toString()}`);
    if (!res.ok) throw new Error("Failed");
    return res.json();
}

export async function postSubmittion(payload: SubmitFormType) {
    console.log("post")
    const res = await fetch(`${API_URLS.submitForm}`, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
            "Content-Type": "application/json"
        }
    });
    if (!res.ok) throw new Error("Failed");
    return res.json();
}
