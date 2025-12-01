import { Forms } from "../entity/forms.entity";
import { Submissions } from "../entity/submissions.entity";
import { AppDataSource } from "./dataSources";

const FormRepo = AppDataSource.getRepository(Forms);
const SubmissionsRepo = AppDataSource.getRepository(Submissions);

export { FormRepo, SubmissionsRepo }