
import { Router } from 'express';
import { submissionController } from './submission.controller';
import { validator } from '../../middlewares/validator';
import { createSubmissionSchema, getListSubmissionSchema, getSubmissionSchema } from './submission.validation';

const submissionRoutes = Router();

submissionRoutes.post("/", validator(createSubmissionSchema, { stripUnknown: false }), submissionController.create);
submissionRoutes.get("/", validator(getSubmissionSchema), submissionController.get);
submissionRoutes.get("/list", validator(getListSubmissionSchema), submissionController.getList);

export default submissionRoutes;