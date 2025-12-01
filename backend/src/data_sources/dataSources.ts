import "reflect-metadata";
import { DataSource } from "typeorm";
import { Forms } from "../entity/forms.entity";
import { Submissions } from "../entity/submissions.entity";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.HOST || "localhost",
    port: Number(process.env.PORT || 3306),
    username: process.env.USERNAME || "root",       // change this
    password: process.env.PASSWORD || "",   // change this
    database: process.env.DATABASE || "formBuilder",    // change this
    synchronize: false,      // auto-create tables in dev
    logging: true,
    entities: [Forms, Submissions],
    migrations: [],
    subscribers: [],
});
