import { validationResult } from "express-validator"
import { User } from "../models/user.js"
import { redisClient } from "../services/redis.js"
export const register = async (req, res) => {

   try {
      const { fullName, emailId, password } = req.body;

      if (!fullName || !emailId || !password) {
         throw new Error("Fields Cannot be Empty")
      }
      const error = validationResult(req)
      if (!error.isEmpty()) {
         return res.status(400).json({ errors: error.array() })
      }

      const ifExists = await User.findOne({ emailId })

      if (ifExists) {
         throw new Error("Please Login")
      }
      const hashPassword = await User.hashPassword(password)

      const user = await User.create({ fullName, emailId, password: hashPassword })
      res.json({ message: "User is Successfully Created" })

   } catch (error) {
      res.json({ error: error.message })

   }
}

export const login = async (req, res) => {

   try {

      const { emailId, password } = req.body;

      if (!emailId || !password) {
         throw new Error("Fields Cannot be Empty")
      }

      const error = validationResult(req)

      if (!error.isEmpty()) {
         return res.status(400).json({ errors: error.array() })
      }

      const ifExists = await User.findOne({ emailId })

      if (!ifExists) {
         throw new Error("Invalid Credentials")
      }

      const isValid = await ifExists.verifyPassword(password)

      if (!isValid) {
         throw new Error("Invalid Credentials")
      }

      const token = await ifExists.getToken()
      res.cookie("token", token, { expires: new Date(Date.now() + 1 * 3600000) })

      delete ifExists._doc.password

      return res.status(200).json({ data: ifExists })

   } catch (error) {
      res.json({ error: error.message })
   }

}

export const profile = (req, res) => {
   const user = req.user
   res.json({ data: user })
}

export const logout = (req, res) => {

   const token = req.cookies.token;
   redisClient.set(token, "logout", "EX", 60 * 60 * 24)
   res.clearCookie("token")
   res.json({ "message": "Logout Done" })
}