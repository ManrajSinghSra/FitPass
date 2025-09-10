import express from "express"
import * as userC from "../controllers/user.js"
import {body} from "express-validator"
export const userRouter=express.Router()
import {Auth} from "../middleware/Auth.js"

userRouter.post("/register",[
    body("fullName.firstName").isLength({min:3}).withMessage("First name must be at least 3 characters long"),
    body("emailId").isEmail().withMessage("Email must be a valid mail"),
    body("password").isLength({min:6}).withMessage("Password cannot be that short")
],userC.register);
userRouter.post("/login",[body("emailId").isEmail().withMessage("Email must be a valid mail")],userC.login);
userRouter.get("/profile",Auth,userC.profile)
userRouter.get("/logout",userC.logout)



