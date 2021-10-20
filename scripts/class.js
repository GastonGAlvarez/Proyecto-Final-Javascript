class Products{
    constructor(nombre,precio,stock,id){
        this.nombre = nombre;
        this.precio = precio;
        this.stock = stock;
        this.id = id;
    }
}

class Carrito extends Products{
    constructor(compraProducto, cantidad){
        super(compraProducto.nombre, compraProducto.precio, compraProducto.stock);
        
        this.cantidad = cantidad;
    }

    productMore(){
        this.cantidad++;
    }
    productLess(){
        if(this.cantidad < 1){
            this.cantidad = 0;
        }
        else{
            this.cantidad--;
        }
    }


}
