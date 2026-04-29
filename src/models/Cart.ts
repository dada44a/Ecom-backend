import { ObjectId } from "mongodb"
import "reflect-metadata"
import { Column, Entity, ObjectIdColumn } from "typeorm"
import { Product } from "./Product.js"
import { User } from "./User.js"

@Entity()
export class Cart {
    @ObjectIdColumn()
    id!: number

    @Column({type: "int"})
    userId!: number
    @Column((type) => Product)
    product!: Product
    @Column((type) => User)
    user!: User
    @Column({type: "int"})
    quantity!: number
    @Column({type: "datetime"})
    createdAt!: Date
    @Column({type: "datetime"})
    updatedAt!: Date
}