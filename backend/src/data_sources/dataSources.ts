import "reflect-metadata";
import { DataSource } from "typeorm";
import { Forms } from "../entity/forms.entity";
import { Submissions } from "../entity/submissions.entity";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",       // change this
    password: "",   // change this
    database: "formBuilder",    // change this
    synchronize: false,      // auto-create tables in dev
    logging: true,
    entities: [Forms, Submissions],
    migrations: [],
    subscribers: [],
});
