import { getDataSource } from "../config/db.js"

export class ProductController {

    appInstance: any

    constructor() {
        this.appInstance = getDataSource()
    }

    getAllProducts = async (req: any, res: any) => {
        const dataSource = await this.appInstance
        const productRepository = dataSource.getRepository("Product")
        const products = await productRepository.find()
        res.json(products)
    }

    getProductById = async (req: any, res: any) => {
        const dataSource = await this.appInstance
        const productRepository = dataSource.getRepository("Product")
        const productId = req.params.id
        const product = await productRepository.findOneBy({ id: productId })
        if (!product) {
            return res.status(404).json({ message: "Product not found" })
        }
        res.json(product)
    }

    createProduct = async (req: any, res: any) => {
        const dataSource = await this.appInstance
        const productRepository = dataSource.getRepository("Product")
        const newProduct = productRepository.create(req.body)
        const savedProduct = await productRepository.save(newProduct)
        res.json(savedProduct)
    }

    updateProduct = async (req: any, res: any) => {
        const dataSource = await this.appInstance
        const productRepository = dataSource.getRepository("Product")
        const productId = req.params.id
        const updatedProduct = await productRepository.findOneBy({ id: productId })
        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" })
        }
        productRepository.merge(updatedProduct, req.body)
        const result = await productRepository.save(updatedProduct)
        res.json(result)
    }

    deleteProduct = async (req: any, res: any) => {
        const dataSource = await this.appInstance
        const productRepository = dataSource.getRepository("Product")
        const productId = req.params.id
        const deleteResult = await productRepository.delete(productId)
        if (deleteResult.affected === 0) {
            return res.status(404).json({ message: "Product not found" })
        }
        res.json({ message: "Product deleted successfully" })
    }






}