//DB
const listaDeProductos = [
        { id: 1, nombre: "Mouse bueno", precio: 25000 },
        { id: 2, nombre: "Teclado Mecánico", precio: 45000 },
        { id: 3, nombre: "Teclado Mecánico", precio: 45000 },
        { id: 4, nombre: "Teclado Mecánico", precio: 45000 },
        { id: 5, nombre: "Teclado Mecánico", precio: 45000 },
        { id: 6, nombre: "Teclado Mecánico", precio: 45000 },
        { id: 7, nombre: "Teclado Mecánico", precio: 45000 },
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

export default new ProductRepository()
/* module.exports.default = new ProductRepository(); */