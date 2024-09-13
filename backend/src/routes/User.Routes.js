import { Router } from "express";

const router = Router();

import {
  registro,
  login,
  Logut,
  profile,
} from "../controllers/user.controllers.js";

import { authRequired } from "../middleware/validations.token.js";

import { validateSchema } from "../middleware/validations.user.js";

import { registerSchema, loginSchema } from "../schema/User.schema.js";
//rutas
router.post("/register", validateSchema(registerSchema), registro);

router.post("/login", validateSchema(loginSchema), login);

router.post("/cierre", Logut);

router.get("/profile", authRequired, profile);

export { router };
