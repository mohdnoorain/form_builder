import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { TimeStamps } from "./common.entity";
import { Forms } from "./forms.entity";

@Entity({ name: "submissions" })
export class Submissions extends TimeStamps {
    @PrimaryGeneratedColumn("uuid")
    uuid: string;

    @ManyToOne(() => Forms, (form) => form.submissions, { nullable: false })
    @JoinColumn()
    form: Forms;

    @Column({ transformer: [{ to: (v: string) => JSON.stringify(v), from: (v: string) => JSON.parse(v) }] })
    answers: string;
}


// // For creating a new profile
// export type CreateSubmittionsDto = Omit<Submittions,
//     "uuid" | "user" | "isEmailVerified" | "isPrimaryContactVerified" | "isSecondaryContactVerified" | "isActive" | "createdAt" | "updatedAt">;

// // For updating an existing profile (all optional)
// export type UpdateSubmittionsDto = Partial<Submittions>;
// export type DeleteSubmittionsDto = { userUuid: string, uuid: string };

// // For picking specific field
// export type GetAllProfileDto = { userUuid: string };
// export type GetProfileDto = Pick<Submittions, "uuid">;
