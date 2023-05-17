// URL de "API"
const URL_PROD = "http://127.0.0.1:3000/productos"
// "http://webms.ddns.net:8080/productos/";// API de productos ALPHA
// contenedor principal de productos
const contitem = document.getElementById(`prod-c`);//contenedor de productos
const filtros = document.getElementById(`filtro-c`);//contenedor de filtros
const Afilters = document.getElementById('Afilters');//aplicar filtro
const Cfilters = document.getElementById('Cfilters');//limpiar filtros

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



function loadItems(productos, precioMinimo, precioMaximo, categoria) {
  let contitem = document.getElementById("prod-c");
  contitem.innerHTML = "";
  //console.log(precioMinimo, precioMaximo)

  for (let producto of productos) {
    let renderProducto = producto.image ?? "https://i.ibb.co/MpG69V7/nofoto.png";
    let i = 0
    i = i+1
    console.log(i , producto.categoria.id)
    if ((producto.stock == 0) && (producto.cost >= precioMinimo && producto.cost <= precioMaximo) &&
    (!categoria || producto.categoria.id === categoria) ) {
      contitem.innerHTML += `<div class="col-md-4 mt-3" id="${producto.id}">
          <div class="card h-100">
              <img src="${renderProducto}" class="card-img-top" alt="${producto.name}">
              <div class="card-body">
                  <h5 class="card-title">${producto.name}</h5>
              </div>
              <div class="row card-footer">
                  <button id="buy-${producto.id}" class="col-9 btn btn-secondary disabled">Sin Stock</button>
                  <button id="fav-${producto.id}" class="col btn btn-warning"><i class="fas fa-heart"></i></button>
              </div>
          </div>
      </div>`
    } else if (
      (producto.cost >= precioMinimo && producto.cost <= precioMaximo) &&
      (!categoria || producto.categoria.id === categoria)
    ) {
      contitem.innerHTML += `<div class="col-md-4 mt-3" id="${producto.id}">
            <div class="card h-100">
                <img src="${renderProducto}" class="card-img-top" alt="${producto.name}">
                <div class="card-body">
                    <h5 class="card-title">${producto.name}</h5>
                </div>
                <div class="row card-footer">
                    <button id="buy-${producto.id}" class="col-9 btn btn-success btn-block"><i class="fas fa-shopping-cart"></i> $${producto.cost}</button>
                    <button id="fav-${producto.id}" class="col btn btn-warning"><i class="fas fa-heart"></i></button>
                </div>
            </div>
        </div>`;
    }
  }
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



//boton de comprar y fav
function BtnControl() {
  favAdd()
  cartAdd()
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
//filtro > precio minimo
const precioMinimoInput = document?.getElementById("precioMinimo");
let precioMinimo;

if (precioMinimoInput.value !== "") {
  precioMinimo = parseFloat(precioMinimoInput.value);

  if (isNaN(precioMinimo)) {
    precioMinimo = 0;
  }
} else {
  precioMinimo = 0;
}
//filtro > precio maximo
let precioMaximo = document?.getElementById("precioMaximo").value;

if (precioMaximo === "") {
  precioMaximo = Number.MAX_VALUE;
} else {
  precioMaximo = parseFloat(precioMaximo);
  if (isNaN(precioMaximo)) {
    precioMaximo = Number.MAX_VALUE;
  }
}
// Obtener los datos de la API
fetch(URL_PROD, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  }
})
  .then(res => res.json())
  .then(data => {
    //console.log(data)
    productos = data
    const categoria = window.location.pathname.split("/").pop().replace(".html", "");
    //console.log(categoria)

    loadItems(productos, precioMinimo, precioMaximo, categoria)
    Afilters.addEventListener("click", loadItems(productos, precioMinimo, precioMaximo, categoria))
    Cfilters.addEventListener("click", ()=>{
      precioMaximo = 0
      precioMinimo = Number.MAX_VALUE
    loadItems(productos, precioMinimo, precioMaximo, categoria)})
  });