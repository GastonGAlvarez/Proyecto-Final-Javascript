// DOM añado los productos al html usando Jquery onload
$(() => {

    // Añado todos los productos al DOM
    for(product in arrayProducts){
        arrayProducts[product].id = product;
        $(".products-row").append(` <!-- Product ${parseInt(product)+1} -->
                                        <div class="products-col">
                                            <div class="product-card">
                                                <img src="resources/${arrayProducts[product].nombre}.jpg" alt="${arrayProducts[product].nombre}">
                                                <h3>${arrayProducts[product].nombre}</h3>
                                                <b>$${arrayProducts[product].precio}</b>
                                                <button type="button" data-id="${product}" class="btnProduct">Añadir al Carro</button>
                                            </div>
                                        </div>`);
    }
    
    // Creo el botón para abrir el Carro
    $("main").append(`<button type="button" class="carroButton">Abrir Carro</button>`);

    // Creo el <div> .carrito 
    createCarritoOnLoad();

    // Obtengo el arreglo de productos del Carro al cargar
    let arrayTemp = [];
    arrayTemp = JSON.parse(localStorage.getItem("Productos en el Carrito"));
    if(arrayTemp != null){    
        for(temp of arrayTemp){
            arrayProductsCarrito.push(temp);
        }
    }

    // Deshabilito los botones de los productos que ya estan en el Carro
    if(arrayProductsCarrito.length != 0){
        for(product in arrayProductsCarrito){
            $(`button[data-id='${arrayProductsCarrito[product].id}']`).prop("disabled",true).text("Añadido al Carro");
        }
    }

    // Evento "click" en los botones "añadir al carro"
    $(".btnProduct").click((e) =>{ 
        // Guardo el id del producto
        let dataId = $(e.currentTarget).attr("data-id");
        
        // Encuentro la posición del producto
        let index = arrayProducts.findIndex(element => 
                        element.id == dataId);

        // Lo añado al array del Carrito
        if(index != -1){
            arrayProductsCarrito.push(arrayProducts[index]);
        }

        // Deshabilito el botón del producto
        $(e.currentTarget).prop("disabled",true).text("Añadido al carro");

        // Lo añado al localStorage
        setProductLocalStorage();

    });
    
    // Evento "click" en el botón Abrir Carro
    $(".carroButton").click((e) =>{

        // Desahabilito el botón
        $(e.currentTarget).prop("disabled",true);
        $(".carrito").show();
        // Cargo todo los productos al Carro
        arrayProductsCarrito.forEach(crearCarro);

        let removeButton = null;
        removeButton = $(".removeProduct");

        // Evento "click" para eliminar productos del carro
        removeButton.click((e) =>{
            // Guardo el id del producto del Carro
            let dataProd = $(e.currentTarget).attr("data-id");
            
            // Habilito los botones del producto
            $(`button[data-id='${dataProd}']`).prop("disabled",false).text("Añadir al Carro");

            // Elimino el producto del carrito
            $(e.currentTarget).parents(".carritoProduct").remove();
            carritoRemove(dataProd);
 
        });

        // Creo el botón de cierre del Carro
        $(".carrito").append(`<button type="button" class="closeCarro">Cerrar Carro</button>`);

        // Evento "click" en el botón de cierre
        $(".closeCarro").click((e) =>{
            $(".carrito").empty().hide();

            // Habilito el botón
            $(".carroButton").prop("disabled",false);
        });
        
        
    });

});

// Funciones <---->

// Función para crear el <div> .Carrito
function createCarritoOnLoad(){
    // Creo el <div> donde irá el carrito
    $("main").append("<div class=\"carrito\"></div>");
}

// Función para crear el Carro
function crearCarro(item){

    $(".carrito").append(`  <div class="carritoProduct"> 
                                <img src="resources/${item.nombre}.jpg" alt="${item.nombre}">
                                <h3>${item.nombre}</h3>
                                <b>$${item.precio}</b>
                                <form>
                                    <input type="number" id="amount" min="0" max="${item.stock}"></input>
                                    <button type="submit" id="submitProduct">Cargar</button>
                                    <button type="button" class="removeProduct" data-id="${item.id}">X</button>
                                </form>
                            </div>`);
}

// Función para añadir el producto al LocalStorage
function setProductLocalStorage(){
    localStorage.removeItem("Productos en el Carrito");
    let productJSON = JSON.stringify(arrayProductsCarrito);
    localStorage.setItem("Productos en el Carrito", productJSON);
}

// Función para eliminar el producto del carrito
function carritoRemove(dataProd){
    let dataId = arrayProductsCarrito.findIndex(element =>
        element.id == dataProd
    );

    arrayProductsCarrito.splice(dataId,1);
    setProductLocalStorage();
}

