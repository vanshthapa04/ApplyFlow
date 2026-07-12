console.log("Company routes loaded");
import { Router } from "express";
import companyController from "../controllers/company.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();


// All company routes require authentication
router.use(authenticate);

router.post("/", companyController.createCompany);

router.get("/", companyController.getCompanies);

router.get("/:id", companyController.getCompanyById);

router.put("/:id", companyController.updateCompany);

router.delete("/:id", companyController.deleteCompany);

export default router;