// URL de "API"
const URL_PROD = "https://644493ddb80f57f581a7a351.mockapi.io/productos/";//JSON que entrega una API de productos
// contenedor principal de productos
const contitem = document.getElementById(`prod-c`);//contenedor de productos
const filtros = document.getElementById(`filtro-c`);//contenedor de filtros
const Afilters = document.getElementById('Afilters');//aplicar filtro
const Cfilters = document.getElementById('Cfilters');//limpiar filtros
const precioMinimo = document.getElementById("precioMinimo")
const precioMaximo = document.getElementById("precioMaximo")
const EOSView = document.getElementById('EOSView') // filtrador de los que no hay disponibles
// categorias de productos
const catPerfumeria = document.getElementById('perfumeria');
const catCosmetica = document.getElementById('cosmetica');
const catJoyeria = document.getElementById('joyeria');
const catSolares = document.getElementById('productos-solares');
const catMaternidad = document.getElementById('maternidad');
const catNaturales = document.getElementById('productos-naturales');
const catMedicamentos = document.getElementById('medicamentos');
const catPersonalCare = document.getElementById('cuidado-personal');
var currentPage = window.location.pathname;
// Obtener los datos de la API
fetch(URL_PROD, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  }
})
  .then(res => res.json())
  .then(data => {
    console.log(data[0])

    let datos = data[0];
    contitem.innerHTML = ' ';
    loadfilters()
    if (currentPage === "/index.html") {
      loaditems(datos.cosmetica)
      loaditems(datos.cuidadoPersonal)
      loaditems(datos.maternidad)
      loaditems(datos.perfumeria)
      BtnControl()
    } else if (currentPage === "/c/cosmetica.html") {
      loaditems(datos.cosmetica)
      BtnControl()
    } else if (currentPage === "/c/cuidado-personal.html") {
      loaditems(datos.cuidadoPersonal)
      BtnControl()
    } else if (currentPage === "/c/joyeria.html") {
      loaditems(datos.joyeria)
      BtnControl()
    } else if (currentPage === "/c/marcas.html") {
      // brands
    } else if (currentPage === "/c/maternidad.html") {
      loaditems(datos.maternidad)
      BtnControl()
    } else if (currentPage === "/c/medicamentos.html") {
      loaditems(datos.medicamentos)
      BtnControl()
    } else if (currentPage === "/c/perfumeria.html") {
      loaditems(datos.perfumeria)
      BtnControl()
    } else if (currentPage === "/c/proteccion-solar.html") {
      loaditems(datos.solares)
      BtnControl()
    } else if (currentPage === "/c/productos-naturales.html") {
      loaditems(datos.naturales);
      BtnControl();
    };

    BtnControl();
  });
//--------------FILTRADO----------//
//funcion de filtrado
function loadfilters() {
  filtros.innerHTML = `
  <button id="Afilters" class="btn btn-success" type="submit">Aplicar filtros</button>
  <button id="Cfilters" class="btn btn-danger" type="submit">Limpiar filtros</button>
  <h4>Precios</h4>
  <label for="precioMinimo">Precio mínimo:</label>
  <input type="text" id="precioMinimo" name="precioMinimo" value="0">

  <label for="precioMaximo">Precio máximo:</label>
  <input type="text" id="precioMaximo" name="precioMaximo" value="99999">
  <hr>
  <div class="form-check form-switch">
  <input class="form-check-input" type="checkbox" id="EOSView checked>
  <label class="form-check-label" for="flexSwitchCheckChecked">Mostrar Productos sin Stock</label>
</div>`

}

//borrar filtrado
Cfilters?.addEventListener('click', () => {
  clearfilter()
})
EOSView?.addEventListener("change", function () {
  if (checkbox.checked) {
    localStorage.setItem("EOSViewState", "enable");
    console.log(localStorage.getItem("EOSViewState"));
  } else {
    localStorage.setItem("EOSViewState", "disable");
    console.log(localStorage.getItem("EOSViewState"));
  }
});
//aplicar filtrado
//Afilters.addEventListener('click', () => {
//loaditems(productos,precioMinimo,precioMaximo)
//})

//--------------CARGA DE PRODUCTO----------//
//funcion de carga de imagen por foco

// Función para mostrar los productos
function loaditems(productos, precioMinimo, precioMaximo) {
  for (let producto of productos) {
    let renderProducto = producto.image ?? "https://i.ibb.co/MpG69V7/nofoto.png";
    if (producto.stock == 0) {
      // const EOSViewState = localStorage.getItem("EOSViewState");

      // if (EOSViewState === "enable") {
      contitem.innerHTML += `<div class="col-md-4 mt-3" id="${producto.id}">
      <div class="card h-100">
          <img src="${renderProducto}"
              class="card-img-top" alt="${producto.name}">
          <div class="card-body">
              <h5 class="card-title">
               ${producto.name}
          </div>
          <div class="row card-footer">
              <button id="buy-${producto.id}" class="col-9 btn btn-secondary disabled">Sin Stock</button>
              <button id="fav-${producto.id}"class="col btn btn-warning"> <i class="fas fa-heart"></i></button>
          </div>
      </div>
  </div>`;
      // } else {
      // deshabilitar EOS View
      // }
    } else {
      contitem.innerHTML += `<div class="col-md-4 mt-3" id="${producto.id}">
      <div class="card h-100">
          <img src="${renderProducto}"
              class="card-img-top" alt="${producto.name}">
          <div class="card-body">
              <h5 class="card-title">
               ${producto.name}
              </h5>
          </div>
          <div class="row card-footer">
              
              <button id="buy-${producto.id}" class="col-9 btn btn-success btn-block"><i class="fas fa-shopping-cart"></i> $${producto.cost}</button>
              <button id="fav-${producto.id}"class="col btn btn-warning"><i class="fas fa-heart"></i></button>
          </div>
      </div>
  </div>`;

    }
  }
}

//---------------CARDCONTROL-------
function BtnControl() {
  favAdd()
  cartAdd()
}

//---------------FAV---------------
function favAdd() {
  let prodsFav = [];
  if (localStorage.getItem('prodsFav')) {
    prodsFav = JSON.parse(localStorage.getItem('prodsFav'));
  }
  const favBtn = document.querySelectorAll('button[id^="fav-"]');
  favBtn.forEach((boton) => {
    boton.addEventListener('click', () => {
      const id = boton.id.split('-')[1];
      prodsFav.push(id);
      console.log(`Producto agregado a favoritos: ${id}`)
      localStorage.setItem('prodsFav', JSON.stringify(prodsFav));
      document.getElementById('favN').textContent = `(${prodsFav.length})`;
    })
  })

}
// ---------------CARRITO---------------
function cartAdd() {
  let prodsBuy = [];
  if (localStorage.getItem('prodsBuy')) {
    prodsBuy = JSON.parse(localStorage.getItem('prodsBuy'));
  }
  const buyBtn = document.querySelectorAll('button[id^="buy-"]');
  buyBtn.forEach((boton) => {
    boton.addEventListener('click', () => {
      const id = boton.id.split('-')[1];
      prodsBuy.push(id);
      console.log(`Producto agregado al carrito: ${id}`)
      localStorage.setItem('prodsBuy', JSON.stringify(prodsBuy));
      document.getElementById('cartN').textContent = `(${prodsBuy.length})`;

    })
  })
}


//contact zone
function validateForm() {
  var name = document.getElementById("name").value;
  var nameError = document.getElementById("name-e").value;

  var email = document.getElementById("email").value;
  var emailError = document.getElementById("email-e").value;

  var subject = document.getElementById("subject").value;
  var subjectError = document.getElementById("subject-e").value;

  var message = document.getElementById("message").value;
  var messageError = document.getElementById("message-e").value;
  
  console.log(subject)
  if (name === "") {
    nameError.classList.remove('d-none')
    return false;
  }

  if (email === "") {
    emailError.classList.remove('d-none')
    return false;
  }

  if (subject === "default") {
    subjectError.classList.remove('d-none');
    return false;
  }

  if (message === "") {
    messageError.classList.remove('d-none')

    return false;
  }

  return true;
}
