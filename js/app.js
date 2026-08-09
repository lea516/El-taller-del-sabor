document.addEventListener("DOMContentLoaded", function () {
  
  // 1. Modo Oscuro
  const btnModoOscuro = document.getElementById("btnModoOscuro");
  const cuerpoPagina = document.getElementById("cuerpoPagina");

  if (btnModoOscuro && cuerpoPagina) {
    btnModoOscuro.addEventListener("click", function () {
      cuerpoPagina.classList.toggle("bg-dark");
      cuerpoPagina.classList.toggle("text-white");
      btnModoOscuro.textContent = cuerpoPagina.classList.contains("bg-dark") ? "Modo Claro" : "Modo Oscuro";
      btnModoOscuro.classList.toggle("btn-warning");
      btnModoOscuro.classList.toggle("btn-outline-warning");
    });
  }

  // 2. Variables para la multicompra y calculadora
  const selectProducto = document.getElementById("selectProducto");
  const cantidadProducto = document.getElementById("cantidadProducto");
  const btnAgregarItem = document.getElementById("btnAgregarItem");
  
  const listaResumenItems = document.getElementById("listaResumenItems");
  const resumenSubtotal = document.getElementById("resumenSubtotal");
  const resumenDomicilio = document.getElementById("resumenDomicilio");
  const alertaDomicilio = document.getElementById("alertaDomicilio");
  const resumenTotal = document.getElementById("resumenTotal");

  let productosAgregados = [];

  function formatearMoneda(valor) {
    return "$" + valor.toLocaleString("es-CO");
  }

  function actualizarResumen() {
    if (!listaResumenItems) return;
    listaResumenItems.innerHTML = "";
    let subtotalGeneral = 0;

    if (productosAgregados.length === 0) {
      listaResumenItems.innerHTML = `<li class="list-group-item bg-dark text-muted small text-center border-secondary">No hay productos agregados aún.</li>`;
      resumenSubtotal.textContent = "$0";
      resumenDomicilio.textContent = formatearMoneda(5000);
      resumenTotal.textContent = "$0";
      alertaDomicilio.className = "alert alerta-domicilio-custom py-1 px-2 my-2 text-center small";
      alertaDomicilio.textContent = "Domicilio gratis por compras mayores a $30.000";
      return;
    }

    productosAgregados.forEach((item, indice) => {
      const totalItem = item.precio * item.cantidad;
      subtotalGeneral += totalItem;

      const li = document.createElement("li");
      li.className = "list-group-item bg-dark text-white d-flex justify-content-between align-items-center border-secondary px-0 small";
      li.innerHTML = `
        <div>
          <strong>${item.nombre}</strong> (x${item.cantidad})<br>
          <span class="text-warning">${formatearMoneda(totalItem)}</span>
        </div>
        <button type="button" class="btn btn-outline-danger btn-sm py-0 px-1" onclick="quitarItem(${indice})">&times;</button>
      `;
      listaResumenItems.appendChild(li);
    });

    resumenSubtotal.textContent = formatearMoneda(subtotalGeneral);

    let costoDomicilio = subtotalGeneral >= 30000 ? 0 : 5000;

    if (costoDomicilio === 0) {
      resumenDomicilio.textContent = "GRATIS";
      resumenDomicilio.className = "fw-bold text-success";
      alertaDomicilio.className = "alert alerta-domicilio-gratis py-1 px-2 my-2 text-center small";
      alertaDomicilio.textContent = "¡Tienes domicilio gratis!";
    } else {
      resumenDomicilio.textContent = formatearMoneda(5000);
      resumenDomicilio.className = "fw-bold text-warning";
      const faltante = 30000 - subtotalGeneral;
      alertaDomicilio.className = "alert alerta-domicilio-custom py-1 px-2 my-2 text-center small";
      alertaDomicilio.textContent = "Agrega " + formatearMoneda(faltante) + " más para domicilio gratis.";
    }

    const totalFinal = subtotalGeneral + costoDomicilio;
    resumenTotal.textContent = formatearMoneda(totalFinal);
  }

  if (btnAgregarItem) {
    btnAgregarItem.addEventListener("click", function () {
      if (!selectProducto.value) {
        alert("Por favor selecciona un producto o combo primero.");
        return;
      }

      const precioUnitario = parseInt(selectProducto.value);
      const nombreProducto = selectProducto.options[selectProducto.selectedIndex].text.split(" - ")[0];
      let cantidad = parseInt(cantidadProducto.value) || 1;
      
      if (cantidad < 1) cantidad = 1;
      if (cantidad > 10) cantidad = 10;

      productosAgregados.push({
        nombre: nombreProducto,
        precio: precioUnitario,
        cantidad: cantidad
      });

      actualizarResumen();

      selectProducto.value = "";
      cantidadProducto.value = "1";
    });
  }

  window.quitarItem = function (indice) {
    productosAgregados.splice(indice, 1);
    actualizarResumen();
  };

  // 3. Gestión del LocalStorage
  const tablaHistorial = document.getElementById("tablaHistorial");
  const btnLimpiarHistorial = document.getElementById("btnLimpiarHistorial");

  function cargarHistorialPedidos() {
    if (!tablaHistorial) return;
    const pedidos = JSON.parse(localStorage.getItem("pedidosTaller")) || [];
    tablaHistorial.innerHTML = "";

    if (pedidos.length === 0) {
      tablaHistorial.innerHTML = `<tr><td colspan="6" class="text-center text-light py-3">No hay pedidos guardados todavía.</td></tr>`;
      return;
    }

    pedidos.forEach(function (pedido, indice) {
      const productosStr = pedido.items.map(i => `${i.cantidad}x ${i.nombre}`).join(", ");
      const fila = document.createElement("tr");
      fila.innerHTML = `
        <td>${pedido.cliente}</td>
        <td>${pedido.telefono}</td>
        <td>${productosStr}</td>
        <td class="small text-white">${pedido.notas}</td>
        <td class="text-warning fw-bold">${pedido.total}</td>
        <td><button class="btn btn-danger btn-sm" onclick="eliminarPedido(${indice})">Eliminar</button></td>
      `;
      tablaHistorial.appendChild(fila);
    });
  }

  window.eliminarPedido = function (indice) {
    let pedidos = JSON.parse(localStorage.getItem("pedidosTaller")) || [];
    pedidos.splice(indice, 1);
    localStorage.setItem("pedidosTaller", JSON.stringify(pedidos));
    cargarHistorialPedidos();
  };

  if (btnLimpiarHistorial) {
    btnLimpiarHistorial.addEventListener("click", function () {
      if (confirm("¿Estás seguro de borrar todo el historial?")) {
        localStorage.removeItem("pedidosTaller");
        cargarHistorialPedidos();
      }
    });
  }

  // 4. Pedido
  const formPedido = document.getElementById("formPedido");
  if (formPedido) {
    formPedido.addEventListener("submit", function (evento) {
      evento.preventDefault();
      if (productosAgregados.length === 0) { alert("Agrega al menos un producto."); return; }
      const nuevoPedido = {
        cliente: document.getElementById("nombreCliente").value,
        telefono: document.getElementById("telefonoCliente").value,
        direccion: document.getElementById("direccionCliente").value,
        notas: document.getElementById("notasPedido").value || "Sin notas",
        items: [...productosAgregados],
        total: resumenTotal.textContent
      };
      let pedidos = JSON.parse(localStorage.getItem("pedidosTaller")) || [];
      pedidos.push(nuevoPedido);
      localStorage.setItem("pedidosTaller", JSON.stringify(pedidos));
      cargarHistorialPedidos();
      formPedido.reset();
      productosAgregados = [];
      actualizarResumen();
    });
  }

  // 5. Contacto
  const formContacto = document.getElementById("formContacto");
  if (formContacto) {
    formContacto.addEventListener("submit", function (evento) {
      evento.preventDefault();
      const nuevoMensaje = {
        nombre: document.getElementById("nombreContacto").value,
        correo: document.getElementById("correoContacto").value,
        asunto: document.getElementById("asuntoContacto").value,
        mensaje: document.getElementById("mensajeContacto").value,
        fecha: new Date().toLocaleDateString()
      };
      let buzón = JSON.parse(localStorage.getItem("mensajesTaller")) || [];
      buzón.push(nuevoMensaje);
      localStorage.setItem("mensajesTaller", JSON.stringify(buzón));
      alert("¡Gracias " + nuevoMensaje.nombre + "! Hemos recibido tu mensaje.");
      formContacto.reset();
    });
  }

  // 6. Carrusel Creativo (API)
  const btnActualizarMenu = document.getElementById("btn-actualizar-menu");
  const innerCarrusel = document.getElementById("inner-carrusel");

  if (btnActualizarMenu && innerCarrusel) {
    const obtenerHamburguesasCreativas = () => {
      const url = "https://www.themealdb.com/api/json/v1/1/search.php?s=burger";
      innerCarrusel.innerHTML = '<div class="carousel-item active p-3 text-center text-white">Cargando...</div>';
      
      fetch(url)
        .then(response => response.json())
        .then(data => {
          if (data.meals) {
            innerCarrusel.innerHTML = "";
            data.meals.slice(0, 5).forEach((hamburguesa, index) => {
              const div = document.createElement("div");
              div.className = `carousel-item ${index === 0 ? 'active' : ''}`;
              div.innerHTML = `
                <img src="${hamburguesa.strMealThumb}" class="d-block w-100" style="height: 200px; object-fit: cover;" alt="...">
                <div class="bg-dark p-2 text-center text-white small fw-bold">${hamburguesa.strMeal}</div>
              `;
              innerCarrusel.appendChild(div);
            });
          }
        })
        .catch(error => {
          innerCarrusel.innerHTML = '<div class="carousel-item active p-3 text-danger text-center">Error al cargar.</div>';
        });
    };
    obtenerHamburguesasCreativas();
    btnActualizarMenu.addEventListener("click", obtenerHamburguesasCreativas);
  }
});