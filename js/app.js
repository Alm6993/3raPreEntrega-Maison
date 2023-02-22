const shopContent = document.getElementById("shopContent");
const verCarrito = document.getElementById("verCarrito");
const modalContainer = document.getElementById("modal-container");
const cantidadCarrito = document.getElementById("cantidadCarrito");

let carrito = JSON.parse(localStorage.getItem("GuardarCarrito")) || [];

const getProducts = async () => {
  const response = await fetch("data.json");
  const data = await response.json();

  data.forEach((product) => {
    let content = document.createElement("div");
    content.className = "card";
    content.innerHTML = `
      <img src="${product.img}">
      <h3 class"title-card">${product.nombre}</h3>
      <p class="price">$ ${product.precio}</p>
      `;

    shopContent.append(content);

    let comprar = document.createElement("button");
    comprar.innerText = "Comprar";
    comprar.className = "Comprar";

    content.append(comprar);

    comprar.addEventListener("click", () => {
      const repeat = carrito.some(
        (repeatProduct) => repeatProduct.id === product.id
      );

      if (repeat) {
        carrito.map((prod) => {
          if (prod.id === product.id) {
            prod.cantidad++;
          }
        });
      } else {
        carrito.push({
          id: product.id,
          nombre: product.nombre,
          precio: product.precio,
          img: product.img,
          cantidad: product.cantidad,
        });
      }
      console.log(carrito);
      console.log(carrito.length);
      carritoCounter();
      saveLocal();
    });
  });
};

getProducts();

const saveLocal = () => {
  localStorage.setItem("GuardarCarrito", JSON.stringify(carrito));
};
