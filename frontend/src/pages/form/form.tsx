import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { getForm, postSubmittion, type FieldType, type GetFormType, type Step, type Steps } from "@/services/formServices";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { NavLink, redirect, useNavigate, useSearchParams } from "react-router";
import { string, date, array } from "yup";
import * as yup from "yup";
import { useForm } from '@tanstack/react-form';

export default function FormBuilder() {
    const navigator = useNavigate();
    const [searchParams] = useSearchParams();
    const uuid = searchParams.get("uuid") || "";
    const name = searchParams.get("name") || "";

    const params: GetFormType = {};
    if (name) { params.name = name; }
    if (uuid) { params.uuid = uuid; }

    const { data, isLoading, error } = useQuery({
        queryKey: ['form', name, uuid],
        queryFn: () => getForm(params),
    });

    const steps = useRef<Steps>([]);
    const currentStep = useRef<number>(0);
    const ans = useRef<Record<string, any>>({});
    const [step, setStep] = useState<Step>();
    const [isLast, setIslast] = useState<boolean>(false);

    // Mutations
    const { mutate, isPending, isError, isSuccess, reset } = useMutation({
        mutationFn: postSubmittion,
        onSuccess: (res) => {
            console.log("ress", res);
            if (!data?.body?.steps) {
                alert('invalid form redirecting to  forms list')
                navigator("/forms", { replace: true })
            }
        },
    })

    const nextStep = (key: string, val: any) => {
        ans.current = {
            ...ans.current,
            [key]: val
        };
        if (++currentStep.current < steps.current.length) {
            setStep(steps.current[currentStep.current]);
            if (currentStep.current === steps.current.length - 1) {
                setIslast(true);
            }
        } else {
            // alert("last step reached");
            mutate({ form: uuid, answers: ans.current });
            console.log(ans)
        }
    }

    const resetForm = () => {
        currentStep.current = 0;
        setStep(steps.current[0]);
        setIslast(false);
        ans.current = {};
        reset()
    }

    useEffect(() => {
        if (!isLoading && data?.body?.steps) {
            steps.current = data?.body?.steps;
            setStep(steps.current[currentStep.current]);
            console.log("set steps", data?.body)
        } else {

        }
    }, [data]);

    if (isLoading) { return (<div><p>Loading</p></div>) }
    if (error) { return (<div><p>OOps something went wrong</p></div>) }
    if (isSuccess) {
        return (
            <Card className="p-5">
                <CardTitle>
                    Submitted successfully
                </CardTitle>
                <Button onClick={resetForm}>reset</Button>
                <Button asChild>
                    <NavLink to={`/submissions?name=${data?.body?.name}`}>
                        View submissions
                    </NavLink>
                </Button>

            </Card>
        )
    }

    return (
        <div className="w-full">

            {
                step &&
                <Card className="gap-2 mx-auto w-[30%] py-10 flex justify-center items-center">
                    <CardTitle>
                        {step.title}
                    </CardTitle>
                    <CardDescription className="mb-4">
                        {step.desc}
                    </CardDescription>

                    <FieldType isLast={isLast} isError={isError} isPending={isPending} onNext={nextStep} step={step}></FieldType>
                </Card>
            }
        </div>
    )
};

const schemaType = (type: FieldType) => {
    if (type == "text") return string();
    if (type == "date") return date().typeError("Enter a valid date");
    if (type == "select") return string();
    if (type == "multi-select") return array();
    return string()
}

const FieldType = ({ step, onNext, isError, isPending, isLast }: { isError: boolean, isPending: boolean, isLast: boolean, step: Step, onNext: (key: string, val: any) => void }) => {

    let stepSchema = schemaType(step.type)

    if (step.type == "text" && stepSchema instanceof yup.StringSchema) {
        if (step.validations?.required) {
            stepSchema = stepSchema.required()
        }
        if (step.validations?.minLength) {
            console.log("object", step.validations?.minLength)
            stepSchema = stepSchema.min(step.validations?.minLength)
        }
        if (step.validations?.regex) {
            stepSchema = stepSchema.matches(RegExp(step.validations?.regex), "Invalid format")
        }
    }


    if (step.type == "date" && stepSchema instanceof yup.DateSchema) {
        if (step.validations?.required) {
            console.log("re")
            stepSchema = stepSchema.required("should be a valid date")
        }
        if (step.validations?.minDate) {
            stepSchema = stepSchema.min(new Date(step.validations?.minDate), "date must be later than " + step.validations?.minDate)
        }
    }
    if (step.type == "select" && stepSchema instanceof yup.StringSchema) {
        if (step.validations?.required) {
            stepSchema = stepSchema.required()
        }
    }
    if (step.type == "multi-select" && stepSchema instanceof yup.ArraySchema) {
        if (step.validations?.required) {
            stepSchema = stepSchema.required()
        }
        if (step.validations.minSelect) {
            stepSchema = stepSchema.min(step.validations.minSelect)
        }
        if (step.validations.maxSelect) {
            stepSchema = stepSchema.min(step.validations.maxSelect)
        }
    }

    const FORM = useForm({
        defaultValues: {
            [step.name]: step.type === "multi-select" ? [""] : "",
        },
        validators: {
            onSubmit: (v) => {
                try {
                    console.log(v)
                    stepSchema.validateSync(v.value?.[step.name])
                    onNext(step.name, v.value?.[step.name])
                    return false
                } catch (err: any) {
                    console.log(err)
                    return { fields: { [step.name]: err?.message || "Invalid data entered" } }
                }
            }
        }
    });

    useEffect(() => {
        FORM.reset()
    }, [step.name])

    return (
        <>
            <form className="flex flex-col" onSubmit={(e) => {
                e.preventDefault(); e.stopPropagation()
                FORM.handleSubmit();
            }}>
                <FORM.Field
                    name={step.name}
                    children={
                        (field) => (
                            <>
                                <label>{step.label}</label>
                                {/* <br /> */}
                                {
                                    step.type === "select" &&
                                    <select
                                        className="border rounded p-1 px-2"
                                        value={field.state.value || ""}
                                        onBlur={field.handleBlur}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        name={step.name}
                                    >
                                        <option value="">{step.placeholder || "select"}</option>
                                        {
                                            step?.options?.map((item) => {
                                                return (
                                                    <option key={item.value} value={item.value}>{item.label}</option>
                                                )
                                            })
                                        }
                                    </select>
                                }
                                {
                                    step.type === "multi-select" &&
                                    <select
                                        className="border scroll-none rounded p-1 px-2"
                                        value={field.state.value || [""]}
                                        onBlur={field.handleBlur}
                                        onChange={(e) => field.handleChange(Array.from(e.target.selectedOptions, o => o.value))}
                                        name={step.name}
                                        multiple

                                    >
                                        {
                                            step?.options?.map((item) => {
                                                return (
                                                    <option key={item.value} value={item.value}>{item.label}</option>
                                                )
                                            })
                                        }
                                    </select>

                                }
                                {
                                    (step.type == "text" || step.type == "date") &&
                                    <Input
                                        value={field.state.value || ""}
                                        onBlur={field.handleBlur}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        name={step.name}
                                        type={step.type}
                                    />
                                }
                                {
                                    !field.state.meta.isValid &&
                                    <p className="text-red-600">
                                        {field.state.meta.errors?.join(",")}
                                    </p>
                                }
                            </>
                        )
                    }>

                </FORM.Field>

                {
                    isError &&
                    <p className="text-red-600">
                        something went wrong unable to submit form
                    </p>
                }
                <Button disabled={isPending} size={"lg"} className="mt-4" type="submit">
                    {isPending ? "Subitting...." : isLast ? "Submit" : "Next"}
                </Button>
            </form>
        </>
    )

}
