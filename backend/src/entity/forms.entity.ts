import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany } from "typeorm";
import { TimeStamps } from "./common.entity";
import { Submissions } from "./submissions.entity";

@Entity({ name: "forms" })
export class Forms extends TimeStamps {
    @PrimaryGeneratedColumn("uuid")
    uuid: string;

    @OneToMany(() => Submissions, (submissions) => submissions.form)
    submissions: Submissions;

    @Column({ type: "varchar", length: 50, unique: true })
    name: string;

    @Column({ transformer: [{ to: (v: string) => JSON.stringify(v), from: (v: string) => JSON.parse(v) }] })
    steps: string;
}

interface Step {
    title: string
    desc: string
    name: string
    label?: string,
    placeholder: string
    types: "text" | "number" | "select" | "multi-select" | "date" | "textarea" | "switch"
    options?: {
        label: string,
        value: string | number
    }
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


// export type CreateUserProfileDto = Partial<FormSchema>;

// export type UpdateFormSchemaDto = Partial<FormSchema>;

// export type GetOrDeleteFormSchemaDto = Pick<FormSchema, "uuid">;
