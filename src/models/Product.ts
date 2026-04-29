import { BeforeInsert, BeforeUpdate, Column, Entity, ObjectIdColumn } from "typeorm"
import "reflect-metadata"

@Entity()
export class Product {

   @ObjectIdColumn()
    id!: string
    @Column({type: "varchar", length: 255})
    name!: string
    @Column({type: "decimal", precision: 10, scale: 2})
    price!: number
    @Column({type: "text"})
    description!: string
    @Column({type: "datetime"})
    createdAt!: Date
    @Column({type: "datetime"})
    updatedAt!: Date

    @BeforeInsert()
    async setTimestamps() {
        const now = new Date()
        this.createdAt = now
        this.updatedAt = now
    }

    @BeforeUpdate()
    async updateTimestamp() {
        this.updatedAt = new Date()
    }

}