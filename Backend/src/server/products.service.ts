import productRepository from "../repository/products.repository.js"; 

class ProductService {
    
    getAllServiceProducts() {
        return productRepository.getAll();
    }

    
    createServiceProducts = async (productoNuevo: any) => {
        return await productRepository.create(productoNuevo);
    }

    deleteServiceProducts = () => {}
    updateServiceProducts = () => {}
    getByIdServiceProducts = () => {}
}

export default new ProductService();