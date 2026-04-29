import { getDataSource } from "../config/db.js"

export class CartController {
    // Implement cart-related methods here]
    appInstance: any

    constructor() {
        this.appInstance = getDataSource()
    }

    getAllUsersCart = async (req: any, res: any) => {
        const dataSource = await this.appInstance
        const cartRepository = dataSource.getRepository("Cart")
        const userId = req.params.userId
        const carts = await cartRepository.find({ where: { userId } })
        res.json(carts)
    }

    addToCart = async (req: any, res: any) => {
        const dataSource = await this.appInstance
        const cartRepository = dataSource.getRepository("Cart")
        const newCartItem = cartRepository.create(req.body)
        const savedCartItem = await cartRepository.save(newCartItem)
        res.json(savedCartItem)
    }

    plusCartItem = async (req: any, res: any) => {
        const dataSource = await this.appInstance
        const cartRepository = dataSource.getRepository("Cart")
        const cartItemId = req.params.cartItemId
        const updatedCartItem = await cartRepository.findOneBy({ id: cartItemId })
        if (!updatedCartItem) {
            return res.status(404).json({ message: "Cart item not found" })
        }
        updatedCartItem.quantity += 1
        const result = await cartRepository.save(updatedCartItem)
        res.json(result)
    }

    minusCartItem = async (req: any, res: any) => {
        const dataSource = await this.appInstance
        const cartRepository = dataSource.getRepository("Cart")
        const cartItemId = req.params.cartItemId
        const updatedCartItem = await cartRepository.findOneBy({ id: cartItemId })
        if (!updatedCartItem) {
            return res.status(404).json({ message: "Cart item not found" })
        }
        if (updatedCartItem.quantity > 1) {
            updatedCartItem.quantity -= 1
        } else {
            return res.status(400).json({ message: "Quantity cannot be less than 1" })
        }   
        const result = await cartRepository.save(updatedCartItem)
        res.json(result)
    }

    removeFromCart = async (req: any, res: any) => {
        const dataSource = await this.appInstance
        const cartRepository = dataSource.getRepository("Cart")
        const cartItemId = req.params.cartItemId
        const deleteResult = await cartRepository.delete(cartItemId)
        if (deleteResult.affected === 0) {
            return res.status(404).json({ message: "Cart item not found" })
        }
        res.json({ message: "Cart item removed successfully" })
    }


}