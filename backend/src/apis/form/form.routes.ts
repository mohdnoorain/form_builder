
import { Router } from 'express';
import { formController } from './form.controller';
import { validator } from '../../middlewares/validator';
import { createFormSchema, getFormListSchema, getFormSchema, patchFormSchema } from './form.validation';

const formRoutes = Router();
formRoutes.post("/", validator(createFormSchema), formController.create);
formRoutes.get("/", validator(getFormSchema), formController.get);
formRoutes.get("/list", validator(getFormListSchema), formController.getList);
formRoutes.patch("/", validator(patchFormSchema), formController.patch);
// planRoutes.get("/getAll/:businessProfileUuid", planController.getAllPlan, planService.getAllPlan);
// planRoutes.get("/:uuid", planController.getPlan, planService.getPlan);
// planRoutes.get("/subscriptions/:uuid", planController.getPlanSubscriptions, planService.getPlanSubscriptions);

export default formRoutes;