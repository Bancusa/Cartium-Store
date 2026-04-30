import productRepository from "../rerpository/products.repository.js"



class ProductService {

    getAllServiceProducts() {
        /* DB */
        return productRepository.getAll()
    }
    deleteServiceProducts = () =>{}
    updateServiceProducts = () =>{}
    createServiceProducts = () =>{}
    getByIdServiceProducts = () =>{}

}

export default new ProductService()

