import express from "express";
import {controllers } from "./token.js";


const router = express.Router();

router.post("/sign-up", controllers.signUpControle);


router.post("/sign-in", controllers.signInControle )


router.post('/forgot-password', controllers.forgotpassword)

router.post('/reset-password/:token', controllers.resetPassword)

router.get('/verify',controllers.verifyUser  )
router.get('/logout', controllers.logoutFunction )


export { router as UserRouter };
