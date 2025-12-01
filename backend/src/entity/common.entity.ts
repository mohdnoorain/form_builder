import { CreateDateColumn, UpdateDateColumn } from "typeorm";

export abstract class TimeStamps {
    @CreateDateColumn()
    createdAt: string;

    @UpdateDateColumn()
    updatedAt: string;
}
