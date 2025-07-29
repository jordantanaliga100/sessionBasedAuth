import express from "express";
import {
  CURRENT_USER,
  LOGIN_USER,
  LOGOUT_USER,
  REGISTER_USER,
} from "./auth.controller.js";
const router = express.Router();

// MODE ONE
router.get("/me", CURRENT_USER);
router.post("/sign-up", REGISTER_USER);
router.post("/sign-in", LOGIN_USER);
router.get("/logout", LOGOUT_USER);

// Export the router
const AuthRoutes = router;
export default AuthRoutes;
