# El Taller del Sabor

## 1. ¿De qué trata el proyecto?
"El Taller del Sabor" es una página web creada para una hamburguesería artesanal. Es un proyecto escolar del SENA donde aplicamos lo que hemos aprendido de diseño web y programación. La página permite ver el menú, conocer promociones, armar un pedido con varias hamburguesas, calcular costos de envío, guardar los pedidos en el navegador y ver recomendaciones del chef que se cargan desde internet.

---

## 2. Integrantes del equipo
* Andres hernandez 
* Leandro Foncesa 

---

## 3. ¿Qué tecnologías usamos?
Para hacer este proyecto utilizamos únicamente tecnologías visuales (Front-End):
* **HTML5:** Para hacer las 5 páginas de la web (Inicio, Menú, Promociones, Pedidos y Contacto).
* **CSS3 y Variables CSS:** Para dar color, ordenar con Flexbox, hacer que la página se vea bien en celulares y computadores, y crear el modo oscuro.
* **Bootstrap 5:** Para usar componentes listos como la barra de navegación (Navbar), las tarjetas (Cards), el carrusel de imágenes, los modales y las alertas.
* **JavaScript (JS):** Para darle vida a la página (el carrito de compras, las validaciones de los formularios, guardar cosas en la memoria del navegador y conectar la API).

---

## 4. ¿Qué cosas hace la página? (Funcionalidades)
* **Modo Oscuro:** Tiene un botón arriba que cambia toda la página a modo oscuro y guarda esa preferencia.
* **Carrito de Compras y Pedidos:** En la sección de pedidos puedes elegir varias hamburguesas, cambiar cantidades, y la página calcula automáticamente el subtotal.
* **Envío Gratis Automático:** Si tu pedido pasa de $30.000, la página te avisa que el domicilio es gratis; si no, te calcula el costo de $5.000 y te dice cuánto te falta.
* **Guardar Pedidos (LocalStorage):** Cuando llenas el formulario de pedido y lo envías, se guarda en la memoria del navegador. Puedes ver el historial en una tabla y borrar los pedidos si quieres.
* **Inspiración del Chef (API Externa):** En la página de inicio hay un carrusel que se conecta a internet (*TheMealDB*) para traer fotos y nombres de hamburguesas reales y mostrarlas en vivo.

---

## 5. ¿Cómo está organizada la carpeta del proyecto?
Para mantener todo ordenado, usamos esta estructura:

```text
Proyecto/
├── index.html            (Página principal / Inicio)
├── pages/
│   ├── menu.html         (Página del menú)
│   ├── promociones.html  (Página de promos)
│   ├── pedidos.html      (Página para armar el pedido)
│   └── contacto.html     (Página de contacto)
├── css/
│   └── styles.css        (Nuestros estilos personalizados)
├── js/
│   └── app.js            (Toda la programación en JavaScript)
├── img/                  (Imágenes del restaurante, logos y productos)
└── README.md             (Este archivo de explicación)