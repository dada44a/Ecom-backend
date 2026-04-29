import "reflect-metadata"
import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate } from "typeorm"


@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({type: "varchar", length: 255})
    firstName!: string

    @Column({type: "varchar", length: 255})
    lastName!: string

    @Column({type: "int"})
    age!: number

    @Column({type: "varchar", length: 255})
    email!: string

    @Column({type: "varchar", length: 255})
    password!: string

    @Column({type: "varchar", length: 255} )
    role!: string

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

