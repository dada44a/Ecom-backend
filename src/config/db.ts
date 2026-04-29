import { DataSource } from "typeorm"
import { Product } from "../models/Product.js"
import { User } from "../models/User.js"
import { Cart } from "../models/Cart.js"
import dotenv from "dotenv"

dotenv.config()

const AppDataSource = new DataSource({
    type: "mongodb",
    url: process.env.MONGODB_URI!,
    entities: [Product, User, Cart],
    synchronize: true,
})

let initPromise: Promise<DataSource> | null = null

export function getDataSource() {
    if (!initPromise) {
        initPromise = AppDataSource.initialize()
            .then((ds) => {
                console.log("Data Source has been initialized!")
                return ds
            })
    }

    return initPromise
}