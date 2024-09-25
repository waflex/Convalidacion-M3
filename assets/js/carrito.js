let InCart = document.getElementById("productos");

// Clase Producto
class Producto {
  constructor(nombre, precio) {
    this.nombre = nombre;
    this.precio = precio;
  }
}
// Clase Carrito
class Carrito {
    
  constructor() {
    this.productos = []; // Arreglo para almacenar los productos seleccionados
  }

  // Función para agregar productos al carrito
  agregarProducto(producto) {
    this.productos.push(producto);
    console.log(`${producto.nombre} ha sido agregado al carrito.`);
  }

  // Función para calcular el total de la compra
  calcularTotal() {
    let total = 0;
    this.productos.forEach((producto) => {
      total += producto.precio;
    });
    return total;
  }

  // Función para mostrar detalles de la compra
  mostrarDetalles() {
    const InCart = document.getElementById("productos");
    if (this.productos.length === 0) {
      console.log("El carrito está vacío.");
      InCart.textContent = "El carrito está vacío.";
    } else {
      let detalles = "Detalle de la compra:\n";
      let htmlDetalles = "<strong>Detalle de la compra:</strong><br>";

      this.productos.forEach((producto, index) => {
        detalles += `${index + 1}. ${producto.nombre} - $${producto.precio}\n`;
        htmlDetalles += `${index + 1}. ${producto.nombre} - $${producto.precio}<br>`;
      });

      detalles += `Total: $${this.calcularTotal()}`;
      htmlDetalles += `<strong>Total: $${this.calcularTotal()}</strong>`;

      console.log(detalles);
      InCart.innerHTML = htmlDetalles; // Mostramos los detalles en el elemento <p> del HTML
    }
  }

  // Función para finalizar la compra
  finalizarCompra() {
    if (this.productos.length === 0) {
      console.log("El carrito está vacío. No se puede finalizar la compra.");
    } else {      
        console.log("Compra finalizada. ¡Gracias por su compra!");
      this.productos = []; // Vaciar el carrito
    }
  }
}

// Productos disponibles
const productosDisponibles = [
  new Producto("Leche", 1000),
  new Producto("Pan de Molde", 2000),
  new Producto("Queso", 1200),
  new Producto("Mermelada", 890),
  new Producto("Azúcar", 1300),
];

// Función para validar que el producto exista
function validarProducto(nombre) {
  return productosDisponibles.find(
    (producto) => producto.nombre.toLowerCase() === nombre.toLowerCase()
  );
}

function mostrarProductosDisponibles() {
  let mensaje = "Productos disponibles:\n";
  productosDisponibles.forEach((producto) => {
    mensaje += `- ${producto.nombre} ($${producto.precio})\n`;
  });
  return mensaje;
}

// Función principal para gestionar el carrito de compras
function gestionarCarrito() {
  const carrito = new Carrito();
  let seguirAgregando = true;

  while (seguirAgregando) {
    const productoIngresado = prompt(
      mostrarProductosDisponibles() +
        "\nIngrese el nombre del producto que desea agregar al carrito (o escriba 'finalizar' para terminar):"
    );

    //Validacion Continuar Agregando Productos
    if (productoIngresado.toLowerCase() === "finalizar") {
      seguirAgregando = false;
      break;
    }

    const productoValido = validarProducto(productoIngresado);

    //Validar Si Producto Existe
    if (productoValido) {
      carrito.agregarProducto(productoValido);
    } else {
      console.log("Producto no disponible. Intente nuevamente.");
    }

    const continuar = prompt("¿Desea seguir agregando productos? (si/no):");
    seguirAgregando = continuar.toLowerCase() === "si";
  }

  carrito.mostrarDetalles();
  const confirmarCompra = prompt("¿Desea finalizar la compra? (si/no):");
  if (confirmarCompra.toLowerCase() === "si") {
    carrito.finalizarCompra();
  } else {
    console.log("Compra no finalizada.");
  }
}

// Ejecutar la función principal
gestionarCarrito();
