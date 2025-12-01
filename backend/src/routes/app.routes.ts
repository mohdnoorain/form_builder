import express from 'express';
import formRoutes from '../apis/form/form.routes';
import submissionRoutes from '../apis/submission/submission.routes';

const appRoutes = express.Router()

appRoutes.use("/form", formRoutes);
appRoutes.use("/submission", submissionRoutes);

export { appRoutes }