import { getDataSource } from "../config/db.js"
import bcrypt from "bcryptjs"

export class UserController {
    appInstance: any
    bcryptjs = bcrypt

    constructor() {
        this.appInstance = getDataSource()
    }

    getAllUsers = async (req: any, res: any) => {
        const dataSource = await this.appInstance
        const userRepository = dataSource.getRepository("User")
        const users = await userRepository.find()
        res.json(users)
    }

    getUserById = async (req: any, res: any) => {
        const dataSource = await this.appInstance
        const userRepository = dataSource.getRepository("User")
        const userId = req.params.id
        const user = await userRepository.findOneBy({ id: userId })
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }
        res.json(user)
    }


    updateUser = async (req: any, res: any) => {
        const dataSource = await this.appInstance
        const userRepository = dataSource.getRepository("User")
        const userId = req.params.id
        const updatedUser = await userRepository.findOneBy({ id: userId })
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" })
        }
        const salt = await this.bcryptjs.genSalt(10)
        const hashedPassword = await this.bcryptjs.hash(req.body.password, salt)
        req.body.password = hashedPassword
        userRepository.merge(updatedUser, req.body)
        const result = await userRepository.save(updatedUser)
        res.json(result)
    }

    deleteUser = async (req: any, res: any) => {
        const dataSource = await this.appInstance
        const userRepository = dataSource.getRepository("User")
        const userId = req.params.id
        const deleteResult = await userRepository.delete(userId)
        if (deleteResult.affected === 0) {
            return res.status(404).json({ message: "User not found" })
        }
        res.json({ message: "User deleted successfully" })
    }
}