// URL de "API"
const URL_PRODS = "https://644493ddb80f57f581a7a351.mockapi.io/productos/";
// categorias de productos
const catPerfumeria = document.getElementById('perfumeria');
const catCosmetica = document.getElementById('cosmetica');
const catJoyeria = document.getElementById('joyeria');
const catSolares = document.getElementById('productos-solares');
const catMaternidad = document.getElementById('maternidad');
const catNaturales = document.getElementById('productos-naturales');
const catMedicamentos = document.getElementById('medicamentos');
const catPersonalCare = document.getElementById('cuidado-personal');

let buySuccessBtn = document.getElementById('buySuccessBtn')
buySuccessBtn.addEventListener('click',buyAccion());

function buyAccion(){
    
    console.log('Has comprado con exito los productos');
}

$('.quantity').change(function() {
    var price = parseFloat($(this).closest('tr').find('td:nth-child(4)').text().replace('$',''));
    var quantity = $(this).val();
    var totalPrice = price * quantity;
    $(this).closest('tr').find('.price').text('$' + totalPrice.toFixed(2));
    var total = 0;
    $('.price').each(function() {
      total += parseFloat($(this).text().replace('$',''));
    });
    $('#total').text('$' + total.toFixed(2));
  });

  fetch(URL_PRODS, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(res => res.json())
    .then(data => {
      console.log(data[0])
  
      let datos = data[0];})
  const cartList = localStorage.getItem('prodsBuy')
  const tb = document.getElementById('prodListTb')

for (productid of cartList){
  findProductById(id)
}

// Función para buscar un producto por su ID
function findProductById(id) {
  for (const category in products) {
    for (const product of products[category]) {
      if (product.id === id) {
        tb.innerHTML +=`<tr>
        <td><img src="https://via.placeholder.com/50x50" alt="Producto ${product.id}"></td>
        <td>${producto.name}</td>
        <td><input type="number" min="1" max="10" value="1" class="form-control quantity"></td>
        <td>$ ${producto.cost}/td>
        <td class="price">$ ${producto.cost}</td>
        </tr>` 
      }
    }
  }
}
