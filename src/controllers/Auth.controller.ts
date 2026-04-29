import { getDataSource } from "../config/db.js"
import Jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"

export class AuthController {
    appInstance: any
    jwt = Jwt
    bcryptjs = bcrypt

    constructor() {
        this.appInstance = getDataSource()
    }

    login = async (req: any, res: any) => {
        const dataSource = await this.appInstance
        const userRepository = dataSource.getRepository("User")
        const { email, password } = req.body
        const user = await userRepository.findOneBy({ email })
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }
        const isPasswordValid = await this.bcryptjs.compare(password, user.password)
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid password" })
        }
        const token = this.jwt.sign({ userId: user.id }, "your_jwt_secret", { expiresIn: "1h" })
        res.json({ message: "Login successful", user, token })
    }

    signUp = async (req: any, res: any) => {
        const dataSource = await this.appInstance
        const userRepository = dataSource.getRepository("User")
        const salt = await this.bcryptjs.genSalt(10)
        const hashedPassword = await this.bcryptjs.hash(req.body.password, salt)
        req.body.password = hashedPassword
        const newUser = userRepository.create(req.body)
        const savedUser = await userRepository.save(newUser)
        res.json(savedUser)
    }


}