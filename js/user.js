// JSON para simular una base de datos de usuario - seguridad 0
const URL_USERS = "127.0.0.1:3000/usuarios/";

// div de inicio/registro y user
const userControl = document.getElementById('userControl')
//variables de login
const userInput = document.getElementById('usernamelgn');
const passInput = document.getElementById('passwordlgn');
const iniciarSesionBtn = document.getElementById('loginBtn');
const eventLogin = document.getElementById('login-message');
//variables de registro
const userReg = document.getElementById('userReg');
const emailReg = document.getElementById('emailReg');
const passReg = document.getElementById('passReg');
const userBDay = document.getElementById("birthday");
const confirm_passReg = document.getElementById('confirm_passReg');
const registerBtn = document.getElementById('RegBtn');
const eventReg = document.getElementById('register-message');

// mensajes 
const msg = {

  "datoIncorrecto": "El usuario o la contraseña son incorrectos",
  "sessionOk": "El usuario ha iniciado sesión correctamente",
  "datoFaltante": "Por favor, completa todos los campos",
  "passNoIgual": "La contraseña y la confirmación de contraseña no coinciden",
  "usercreate": "El usuario ha sido registrado correctamente"
};

// chequeo de si hay una sesion ya abierta
function userVerification() {
  let user = localStorage.getItem('user') || sessionStorage.getItem('user')
  if (user != null) {
    userControl.innerHTML = `<li><a>${user}</a></li>`
  } else if (currentPage === "/user.html"){
    location.href = './index.html';
  }
  else {
    userControl.innerHTML = `<li><a data-bs-toggle="modal" data-bs-target="#loginModal">Iniciar sesión</a></li>
        <li><a data-bs-toggle="modal" data-bs-target="#registerModal">Registrarse</a></li>`
  }
}
userVerification()

//evento de error
function eventError(eventDir) {
  eventDir.classList.remove('d-none')
  eventDir.classList.add('eventError')
}
//evento confirmacion
function eventOk(eventDir) {
  eventDir.classList.add('eventOk')
  eventDir.classList.remove('eventError')
  eventDir.classList.remove('d-none')
}

//-------login--------
iniciarSesionBtn.addEventListener("click", function (event) {
  event.preventDefault();
  fetch(URL_USERS)
    .then(response => response.json())
    .then(data => {
      console.log(msg)
      console.log(data)

      const usuario = userInput.value;
      const contrasena = passInput.value;
      if (validarInicioSesion(usuario, contrasena)) {
        localStorage.setItem('user', `${usuario}`)
        eventOk(eventLogin)
        eventLogin.textContent = msg.sessionOk;
        console.log(msg.sessionOk)
        // quitar botones de login e insertar user.img y user.name 
      } else {
        eventError(eventLogin)
        eventLogin.textContent = msg.datoIncorrecto;
        console.log(msg.datoIncorrecto)
      }
    })
});




//-------registro-------
registerBtn.addEventListener("click", function (event) {
  event.preventDefault();
  const newUser = userReg.value;
  const newName = document.querySelector("#userName").value;
  const newLastName = document.querySelector("#userLastName").value;
  const newEmail = emailReg.value;
  const newPass = passReg.value;
  const newConfirmPass = confirm_passReg.value;
  const newBirthday = userBDay.value;

  if (newUser === "" || newName === "" || newLastName === "" || newEmail === "" || newPass === "" || newConfirmPass === "" || newBirthday === "") {
    console.log(msg.datoFaltante);
    eventReg.textContent = msg.datoFaltante;

  } else if (newPass !== newConfirmPass) {
    console.log(msg.passNoIgual);
    eventReg.textContent = msg.passNoIgual;
    eventError(eventReg)
  } else {
    const usuarios = data.users;
    // Genera un nuevo ID para el usuario
    const newID = (usuarios.length + 1).toString().padStart(3, "0");

    const newUserObj = {
      "id": newID,
      "user": newUser,
      "name": newName,
      "lastname": newLastName,
      "mail": newEmail,
      "pass": newPass,
      "fab": [],
      "cart": [],
      "img": "/notiene.jpg",
      "created": "27-04-2023",
      "birthday": newBirthday
    };

    usuarios.push(newUserObj);
    const newData = JSON.stringify(data);

    fetch(URL_USERS, {
      method: 'PUT',
      body: newData,
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        console.log(msg.usercreate)
        eventReg.textContent = "Registro correcto";
        eventOk(eventReg);
      })
      .catch(error => console.error(error));
  }
}
)