//DB
const listaDeProductos = [
        { id: 1, nombre: "Mancuerna 10kg", precio: 25000 },
        { id: 2, nombre: "Mancuerna 20kg", precio: 45000 },
        { id: 3, nombre: "Mancuernas dobles", precio: 100000 },
      
    ];


class ProductRepository {
    getAll() {
        return listaDeProductos
    }

    getById(id:string) {
        return  listaDeProductos.filter(p => p.id.toString() === id)
    }
    delete = () => {}
    update = () => {}
    create = () => {}
}
//EJEMPLO Y PRUEBA de que todo esta funcionando
export default new ProductRepository()
/* module.exports.default = new ProductRepository(); */