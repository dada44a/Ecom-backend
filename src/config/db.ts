import { DataSource } from "typeorm"
import { Product } from "../models/Product.js"
import { User } from "../models/User.js"
import { Cart } from "../models/Cart.js"

const AppDataSource = new DataSource({
    type: "mongodb",
    host: "localhost",
    port: 27017,
    database: "test",
    entities: [Product, User, Cart],
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