let listaProductos = [
  {
    id: 1,
    nombre: "Chorizo",
    categoria: "Chorizos",
    existencia: 0,
    precio: 4000,
    img: "chorizo.png",
  },
  {
    id: 2,
    nombre: "Arepa de pollo",
    categoria: "Arepas",
    existencia: 30,
    precio: 6000,
    img: "arepa_de_pollo.png",
  },
  {
    id: 3,
    nombre: "Picada con todo",
    categoria: "Picadas",
    existencia: 30,
    precio: 15000,
    img: "picada_con_todo.png",
  },
  {
    id: 4,
    nombre: "Arepa de Jamon",
    categoria: "Arepas",
    existencia: 10,
    precio: 4000,
    img: "arepa_de_jamon.png",
  },
  {
    id: 5,
    nombre: "Picada",
    categoria: "Picadas",
    existencia: 30,
    precio: 10000,
    img: "picada.png",
  },
  {
    id: 6,
    nombre: "Arepa de queso",
    categoria: "Arepas",
    existencia: 30,
    precio: 3500,
    img: "arepa_de_queso.png",
  },
  {
    id: 7,
    nombre: "Picada doble",
    categoria: "Picadas",
    existencia: 30,
    precio: 1800,
    img: "picada_doble.png",
  },
  {
    id: 8,
    nombre: "Arepa de Chorizo",
    categoria: "Arepas",
    existencia: 30,
    precio: 7500,
    img: "arepa_de_chorizo.png",
  },
  {
    id: 9,
    nombre: "Arepa de carne",
    categoria: "Arepas",
    existencia: 30,
    precio: 6500,
    img: "arepa_de_carne.png",
  },
];

const obtenerCarritoLS = () =>
  JSON.parse(localStorage.getItem("carrito")) || [];

const obtenerHistorialLS = () =>
  JSON.parse(localStorage.getItem("historial")) || [];

principal(listaProductos);

function principal(productos) {
  actualizarUnidades(productos);
  renderizarProductos(productos);
  cargarCantidadProductosCarrito();

  let botonBuscarProducto = document.getElementById("btn-buscar-producto");
  botonBuscarProducto.addEventListener("click", () =>
    filtrarYRenderizar(productos)
  );
  let botonVerComponenteProductos =
    document.getElementById("botonVerProductos");
  let botonVerComponenteCarrito = document.getElementById("botonVerCarrito");
  let botonVerHistorial = document.getElementById("botonVerHistorial");
  botonVerComponenteProductos.addEventListener("click", () =>
    verComponente("botonVerComponenteProductos", productos)
  );
  botonVerComponenteCarrito.addEventListener("click", () =>
    verComponente("botonVerComponenteCarrito", productos)
  );
  botonVerHistorial.addEventListener("click", () =>
    verComponente("botonVerComponenteHistorial", productos)
  );
}

function filtrarYRenderizar(productos) {
  let productosFiltrados = filtrarProductos(productos);
  renderizarProductos(productosFiltrados);
}

function filtrarProductos(productos) {
  let inputBusqueda = document.getElementById("inputBusqueda");
  let productosFiltrados = productos.filter(
    (producto) =>
      producto.nombre
        .toUpperCase()
        .includes(inputBusqueda.value.toUpperCase()) ||
      producto.categoria
        .toUpperCase()
        .includes(inputBusqueda.value.toUpperCase())
  );
  return productosFiltrados;
}

function renderizarProductos(productos) {
  let contenedorProductos = document.getElementById("content-products");
  contenedorProductos.innerHTML = "";
  if (productos.length > 0) {
    cargarProductos(productos, contenedorProductos);
  } else {
    sinProductos(contenedorProductos);
  }
}

function renderizarHistorial() {
  let contenedorHistorial = document.getElementById("contenedorHistorial");
  let historial = obtenerHistorialLS();
  contenedorHistorial.innerHTML = "";
  if (historial.length > 0) {
    cargarHistorial(historial, contenedorHistorial);
  } else {
    sinHistorial(contenedorHistorial);
  }
}

function cargarHistorial(historial, contenedorHistorial) {
  let tarjetaHistorial = document.createElement("div");
  tarjetaHistorial.className = "accordion";
  tarjetaHistorial.setAttribute("id", "accordionExample");

  historial.forEach((carrito, index) => {
    // Generar un identificador único para cada elemento
    let collapseId = `collapse${index + 1}`;
    let headingId = `heading${index + 1}`;
    let carritoHTML = carrito
      .map(
        (producto) =>
          `
      <div id="${collapseId}" class="accordion-collapse collapse" aria-labelledby="${headingId}" data-bs-parent="#accordionExample">
        <div class="accordion-body">
          <div class="card mb-2">
            <div class="card-header">
              Subtotal de la compra $ ${producto.subtotal}
            </div>
            <div class="card-body">
              <div class="row">
                <div class="col-md-2">
                  <img src="./Img/Productos/${producto.img}" class="img-fluid" alt="Imagen Venta #${producto.id}">
                </div>
                <div class="col-md-4">
                  <h5 class="card-title">${producto.nombre}</h5>
                  <p class="card-text">Cantidades compradas: ${producto.unidades}</p>
                  <p class="card-text">Precio del articulo: $ ${producto.precioUnitario}</p>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>`
      )
      .join("");

    tarjetaHistorial.innerHTML += `
      <div class="accordion-item">
        <h2 class="accordion-header" id="${headingId}">
          <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#${collapseId}" aria-expanded="true" aria-controls="${collapseId}">
            <h6 style="margin-top: 10px;">Venta ${index + 1}</h6>
            <i class="fas fa-chevron-down icon"></i>
          </button>
        </h2>
        ${carritoHTML}
      </div>`;
  });

  contenedorHistorial.appendChild(tarjetaHistorial);
}

function cargarProductos(productos, contenedorProductos) {
  productos.forEach(({ nombre, precio, img, id, existencia }) => {
    let existenciaTexto = "";
    let botonDeshabilitado = false;
    let claseBoton = "btn-carrito";
    let textoBoton = `<i class="fa-solid fa-cart-plus" style="margin-right: 5px"></i
    >Añadir al carrito`;
    if (existencia === 0) {
      existenciaTexto = "Producto agotado";
      botonDeshabilitado = true;
      claseBoton = "btn-carrito-deshabilitado";
      textoBoton = `<i class="fa-solid fa-circle-exclamation"></i>`;
    } else if (existencia <= 10) {
      existenciaTexto = `${existencia} ¡Poca existencia <i class="fa-solid fa-bell"></i>!`;
    } else {
      existenciaTexto = `${existencia}`;
    }
    let tarjetaProducto = document.createElement("div");
    tarjetaProducto.innerHTML = `
    <div class="card" style="background: #a9a9ec; width: 17rem">
      <img src=./Img/Productos/${img} class="card-img-top" alt="..." />
      <div class="card-body">
        <h3
          class="card-title"
          style="
            font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS',
              sans-serif;
          "
        >
          ${nombre}
        </h3>
        <h5
          class="card-title"
          style="
            font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS',
              sans-serif;
          "
        >
          $ ${precio}
        </h5>
        <p class="card-text" id="existencia${id}">Existencia: ${existenciaTexto}</p>
        <button id=btnCarrito${id} class="btn btn-primary ${claseBoton}" ${
      botonDeshabilitado ? "disabled" : ""
    }>
          ${textoBoton}
        </button>
      </div>
    </div>
        `;
    contenedorProductos.appendChild(tarjetaProducto);

    let btnAgregarAlCarrito = document.getElementById("btnCarrito" + id);
    btnAgregarAlCarrito.addEventListener("click", (e) =>
      agregarProductoAlCarrito(e, productos)
    );
  });
}

function cargarCarrito(productos, carrito, contenedorCarrito) {
  let total = carrito.reduce((accumulator, producto) => {
    return accumulator + producto.subtotal;
  }, 0);
  contenedorCarrito.innerHTML = "";
  let tarjetaProductoCarrito = document.createElement("div");
  tarjetaProductoCarrito.className = "row";
  let productosHTML = "";
  carrito.forEach(({ img, nombre, id, unidades, precioUnitario, subtotal }) => {
    let producto = productos.find((producto) => producto.id === id);
    textoBotonIncrementar = `<i class="fa-solid fa-plus"></i>`;
    let botonDeshabilitado = false;
    let claseBoton = "btn-cantidad";
    if (producto.existencia <= 1) {
      textoBotonIncrementar = `<i class="fa-solid fa-exclamation" style="margin-right: 1px"></i>`;
      botonDeshabilitado = true;
      claseBoton = "btn-incrementar-deshabilitado";
    }
    productosHTML += `
    <tr>
       <td><img src="./Img/Productos/${img}" width="200" alt="..." /></td>
       <td>${nombre}</td>
       <td><button id="botonDecrementar${id}" class="btn-cantidad" style="border-radius: 50px;"><i class="fa-solid fa-minus"></i></button>
       <label style="margin-left:5px; margin-right:5px">${unidades}</label>
       <button id="botonIncrementar${id}" class=${claseBoton} ${
      botonDeshabilitado ? "disabled" : ""
    } style="border-radius: 50px;">${textoBotonIncrementar}</button></td>
       <td>${precioUnitario}</td>
       <td>${subtotal}</td>
       <td><button id="botonEliminar${id}" style="color: #b3142e; border: none; background-color: transparent; font-size: 20px"><i class="fa-solid fa-trash-can"></i></button></td>
     </tr>
    `;
  });

  tarjetaProductoCarrito.innerHTML = `
    <div class="col-lg-9 col-md-9 col-sm-9 col-9" style="margin-top: 20px !important">
      <table class="tabla">
        <thead>
          <tr>
            <th>Imagen</th>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Precio</th>
            <th>Subtotal</th>
            <th>Accion</th>
          </tr>
        </thead>
        <tbody>
          ${productosHTML}
        </tbody>
      </table>
    </div>
    <div class="col-lg-3" style="margin-top: 18px !important;">
        <div class="card-group">
          <div class="card">
            <img src="https://img.freepik.com/fotos-premium/carrito-compras-calle-ciudad-noche_899027-5330.jpg"
              class="card-img-top" alt="..." />
            <div class="card-body">
              <h5 style="margin-bottom: 30px; margin-top: -10px">
                Total de la compra: $ ${total}
              </h5>
              <h6 style="margin-bottom: 30px; margin-top: -10px">
                Productos: ${carrito.length}
              </h6>
              <hr />
              <button id="btnComprar" type="button" class="btn-comprar">
                <i class="fa-solid fa-money-check-dollar" style="margin-right: 10px"></i>Comprar
              </button>
            </div>
          </div>
        </div>
      </div>
  `;
  contenedorCarrito.appendChild(tarjetaProductoCarrito);

  cargarFuncionalidadesCarrito(carrito, productos);
}

function sinHistorial(contenedorHistorial) {
  let tarjetaHistorialVacio = document.createElement("div");
  contenedorHistorial.innerHTML = "";
  tarjetaHistorialVacio.innerHTML = `
  <div class="card mb-3" style="max-width: 540px; margin-top: 17rem !important; margin-left: 27rem">
  <div class="row g-0">
    <div class="col-md-4">
      <img src="./Img/Productos/sin_existencia.png" class="img-fluid rounded-start" alt="..." style="margin-bottom: 8px !important;">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">Historial vacio <i class="fa-solid fa-circle-exclamation"></i></h5>
        <p class="card-text">Sin productos en el historial.</p>
      </div>
    </div>
  </div>
</div>
  `;
  contenedorHistorial.appendChild(tarjetaHistorialVacio);
}

function cargarCarritoVacio(contenedorCarrito) {
  let tarjetaCarritoVacio = document.createElement("div");
  contenedorCarrito.innerHTML = "";
  tarjetaCarritoVacio.innerHTML = `
  <div class="card mb-3" style="max-width: 540px; margin-top: 17rem !important; margin-left: 27rem">
  <div class="row g-0">
    <div class="col-md-4">
      <img src="./Img/Productos/sin_existencia.png" class="img-fluid rounded-start" alt="..." style="margin-bottom: 8px !important;">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">Carrito vacio <i class="fa-solid fa-circle-exclamation"></i></h5>
        <p class="card-text">Sin productos en el carrito.</p>
      </div>
    </div>
  </div>
</div>
  `;
  contenedorCarrito.appendChild(tarjetaCarritoVacio);
}

function sinProductos(contenedorProductos) {
  let tarjetaProducto = document.createElement("div");
  tarjetaProducto.innerHTML = `
    <div class="card" style="background: #a9a9ec; width: 17rem">
    <img src=./Img/Productos/sin_existencia.png class="card-img-top" alt="..." />
    <div class="card-body">
      <h3
        class="card-title"
        style="
          font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS',
            sans-serif;
        "
      >
        Sin productos
      </h3>
      <h5
        class="card-title"
        style="
          font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS',
            sans-serif;
        "
      >
        No existen productos con esa busqueda
      </h5>
    </div>
  </div>
        `;
  contenedorProductos.appendChild(tarjetaProducto);
}

function renderizarCarrito(productos) {
  let carrito = obtenerCarritoLS();
  let contenedorCarrito = document.getElementById("contenedorCarrito");
  if (carrito.length === 0) {
    cargarCarritoVacio(contenedorCarrito);
  } else {
    cargarCarrito(productos, carrito, contenedorCarrito);
  }
}

function actualizarUnidades(productos) {
  let carrito = obtenerCarritoLS();
  carrito.forEach((carrito) => {
    let producto = productos.find((producto) => producto.id === carrito.id);
    if (producto) {
      producto.existencia -= carrito.unidades;
    }
  });
}

function cargarCantidadProductosCarrito() {
  let notificacionCantidadProductoCarrito =
    document.getElementById("notification");
  notificacionCantidadProductoCarrito.textContent = obtenerCarritoLS().length;
}

function verComponente(componente, productos) {
  let contenedorCarrito = document.getElementById("contenedorCarrito");
  let contenedorProductos = document.getElementById("content-products");
  let contenedorHistorial = document.getElementById("contenedorHistorial");
  let groupBuscarProducto = document.getElementById("input-group-busqueda");
  if (componente === "botonVerComponenteCarrito") {
    groupBuscarProducto.classList.add("oculto");
    contenedorCarrito.classList.remove("oculto");
    contenedorProductos.classList.add("oculto");
    contenedorHistorial.classList.add("oculto");
    renderizarCarrito(productos);
  } else if (componente === "botonVerComponenteProductos") {
    groupBuscarProducto.classList.remove("oculto");
    contenedorCarrito.classList.add("oculto");
    contenedorProductos.classList.remove("oculto");
    contenedorHistorial.classList.add("oculto");
    renderizarProductos(productos);
  } else {
    groupBuscarProducto.classList.add("oculto");
    contenedorCarrito.classList.add("oculto");
    contenedorHistorial.classList.remove("oculto");
    contenedorProductos.classList.add("oculto");
    renderizarHistorial();
  }
}

function agregarProductoAlCarrito(e, productos) {
  let carrito = obtenerCarritoLS();
  let idDelProducto = Number(e.target.id.substring(10));
  let posProductoEnCarrito = carrito.findIndex(
    (producto) => producto.id === idDelProducto
  );
  let productoBuscado = productos.find(
    (producto) => producto.id === idDelProducto
  );
  if (posProductoEnCarrito !== -1) {
    carrito[posProductoEnCarrito].unidades++;
    carrito[posProductoEnCarrito].subtotal =
      carrito[posProductoEnCarrito].precioUnitario *
      carrito[posProductoEnCarrito].unidades;
  } else {
    carrito.push({
      id: productoBuscado.id,
      img: productoBuscado.img,
      nombre: productoBuscado.nombre,
      precioUnitario: productoBuscado.precio,
      unidades: 1,
      subtotal: productoBuscado.precio,
    });
  }
  productoBuscado.existencia -= 1;
  localStorage.setItem("carrito", JSON.stringify(carrito));
  cargarCantidadProductosCarrito();
  renderizarCarrito(productos);
  renderizarProductos(productos);
}

function decrementarCatidadProducto(productos, idproductoCarrito) {
  let carrito = obtenerCarritoLS();
  let posProductoEnCarrito = carrito.findIndex(
    (producto) => producto.id === idproductoCarrito
  );
  if (posProductoEnCarrito !== -1) {
    carrito[posProductoEnCarrito].unidades--;
    carrito[posProductoEnCarrito].subtotal -=
      carrito[posProductoEnCarrito].precioUnitario;
  }
  localStorage.setItem("carrito", JSON.stringify(carrito));
  if (carrito[posProductoEnCarrito].unidades < 1) {
    eliminarProductoCarrito(idproductoCarrito, productos);
  }
  let posicionProducto = productos.findIndex(
    (producto) => producto.id === idproductoCarrito
  );
  productos[posicionProducto].existencia++;
  renderizarCarrito(productos);
  renderizarProductos(productos);
}

function incrementarCantidadProducto(idproductoCarrito, productos) {
  let carrito = obtenerCarritoLS();
  let posProductoEnCarrito = carrito.findIndex(
    (producto) => producto.id === idproductoCarrito
  );
  carrito[posProductoEnCarrito].unidades++;
  carrito[posProductoEnCarrito].subtotal =
    carrito[posProductoEnCarrito].precioUnitario *
    carrito[posProductoEnCarrito].unidades;
  localStorage.setItem("carrito", JSON.stringify(carrito));
  renderizarCarrito(productos);
  let posicionProducto = productos.findIndex(
    (producto) => producto.id === idproductoCarrito
  );
  productos[posicionProducto].existencia--;
  renderizarProductos(productos);
}

function eliminarProductoCarrito(idproductoCarrito, productos) {
  let carrito = obtenerCarritoLS();
  let posProductoEnCarrito = carrito.findIndex(
    (producto) => producto.id === idproductoCarrito
  );
  let posicionProducto = productos.findIndex(
    (producto) => producto.id === idproductoCarrito
  );
  productos[posicionProducto].existencia +=
    carrito[posProductoEnCarrito].unidades;
  carrito.splice(posProductoEnCarrito, 1);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  cargarCantidadProductosCarrito();
  renderizarCarrito(productos);
  renderizarProductos(productos);
}

function cargarFuncionalidadesCarrito(carrito, productos) {
  carrito.forEach(({ id }) => {
    let botonDecrementar = document.getElementById("botonDecrementar" + id);
    botonDecrementar.addEventListener("click", () =>
      decrementarCatidadProducto(productos, id)
    );
    let botonEliminar = document.getElementById("botonEliminar" + id);
    botonEliminar.addEventListener("click", () =>
      eliminarProductoCarrito(id, productos)
    );
    let botonIncrementar = document.getElementById("botonIncrementar" + id);
    botonIncrementar.addEventListener("click", () =>
      incrementarCantidadProducto(id, productos)
    );
  });
  let botonComprar = document.getElementById("btnComprar");
  botonComprar.addEventListener("click", () => finalizarCompra(productos));
}

function finalizarCompra(productos) {
  let historial = obtenerHistorialLS();
  let carrito = obtenerCarritoLS();
  historial.push(...[carrito]);
  localStorage.setItem("historial", JSON.stringify(historial));
  carrito.forEach((carrito) => {
    let producto = productos.find((producto) => producto.id === carrito.id);
    if (producto) {
      producto.existencia += carrito.unidades;
    }
  });
  localStorage.setItem("carrito", JSON.stringify([]));
  cargarCantidadProductosCarrito();
  renderizarCarrito(productos);
  renderizarProductos(productos);
  alert("Compra realizada con exito. Gracias por su compra");
}