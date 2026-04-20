const products = [
    { 
        id: 1,
        name: "Best friends",
      text: "The cookie that started it all! Our signature chocolate chip and walnut cookie is crispy on the outside with a thick, gooey center.",
      price: 20,
      weight: "2 pcs / 200 g",
      image: "images/1.png"
    },
    {
        id: 2,
        name: "Chocolate Frenchman",
      text: "Made with dark French cocoa and semi-sweet chocolate chips, these cookies are sure to satisfy even the most avid chocolate lover.",
      price: 24,
      weight: "2 pcs / 200 g",
      image: "images/2.png"
    },
    {
        id: 3,
        name: "Oatmeal with raisins",
      text: "These six-ounce, buttery cookies are golden brown on the outside, moist on the inside, and filled with plump, sweet raisins.",
      price: 18,
      weight: "2 pcs / 200 g",
      image: "images/3.png"
    },
    {
        id: 4,
        name: "Chocolate Delight",
      text: "Perfectly crisp on the outside and just thick and gooey in the center, these cookies are filled with semi-sweet and dark chocolate chips for a rich depth of flavor.",
      price: 24,
      weight: "2 pcs / 200 g",
      image: "images/4.png"
    },
    {
        id: 5,
        name: "Peanut Paradise",
      text: "Sweet, savory and perfectly balanced, these cookies satisfy peanut butter and chocolate lovers' cravings.",
      price: 20,
      weight: "2 pcs / 200 g",
      image: "images/5.png"
    },
    {
        id: 6,
        name: "Chocolate nut delicacy",
      text: "Our signature chocolate chip and walnut cookie recipe guarantees an unforgettable taste experience. Each cookie is crisp on the outside but reveals a tender center within.",
      price: 18,
      weight: "2 pcs / 200 g",
      image: "images/6.png"
    },
    {
        id: 7,
        name: "Branded cookies",
      text: "Why choose one when you can have them all? Our classic cookie range includes one of four original cookie flavours.",
      price: 36,
      weight: "4 pcs / 400 g",
      image: "images/7.png"
    },
    {
        id: 8,
        name: "Lemon cookies",
      text: "Spring is just around the corner, but we couldn't wait to bring you some sunshine: our first lemon cookies. This treat is chewy, lemony, not too sweet, and even a little refreshing.",
      price: 33,
      weight: "4 pcs / 400 g",
      image: "images/8.png"
    },
    {
        id: 9,
        name: "Chocolate lovers",
      text: "You no longer have to pick favorites. We made this set for all the people who really love chocolate...",
      price: 38,
      weight: "4 pcs / 400 g",
      image: "images/9.png"
    },
    {
        id: 10,
        name: "Caramel and coconut",
      text: "Treat yourself to a coconut, buttery, caramel cookie that delivers a flavor and texture like never before. Enjoyment all year round.",
      price: 33,
      weight: "4 pcs / 400 g",
      image: "images/10.png"
    },
    {
        id: 11,
        name: "Vegan with chocolate chips",
      text: "Our vegan, gluten-free cookies contain crunchy walnut pieces and semi-sweet vegan chocolate chips.",
      price: 39,
      weight: "4 pcs / 400 g",
      image: "images/11.png"
    },
    {
        id: 12,
        name: "Creme brulee nut cookies",
      text: "Using a unique blend of ingredients, we have created Creme Brulee Chunky Almond Cookies that promise a unique gastronomic experience. Each piece has a crispy crust and melts in your mouth.",
      price: 35,
      weight: "4 pcs / 400 g",
      image: "images/12.png"
    }
  ];
  
  const container = document.getElementById("products-items");
    products.forEach(product => {
  const div = document.createElement("div");
  div.classList.add("products-item");

  div.innerHTML = `
    <div class="products-item-image">
        <img src="${product.image}" alt="Product">
    </div>
    <div class="products-item-details">
        <div class="products-item-title">${product.name}</div>
        <div class="products-item-text">
            ${product.text}
        </div>
        <div class="products-item-extra">
            <div class="products-items-info">
                <div class="products-item-price" data-base-price="${product.price}">
                    ${product.price} $
                </div>
                <div class="products-item-weight">${product.weight}</div>
            </div>
            <button class="button violet-button" type="button" onclick="addToCart(${product.id})">Order</button>
        </div>
    </div>
  `;
  container.appendChild(div);
});


let cart = [];

function addToCart(id) {
    const product = products.find(p => p.id === id);

    // проверяем — есть ли уже товар в корзине
    const existing = cart.find(item => item.id === id);

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1
        });
    }

    renderCart();
}


function renderCart() {
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");

    cartItems.innerHTML = "";

    let total = 0;

    cart.forEach(item => {
        const div = document.createElement("div");
        div.classList.add("cart-item");

        div.innerHTML = `
    <div class="cart-item-name">${item.name}</div>

    <div class="cart-controls">
        <button onclick="decrease(${item.id})">-</button>
        <span>${item.quantity}</span>
        <button onclick="increase(${item.id})">+</button>
    </div>

    <div class="cart-price">
        ${item.price * item.quantity} $
    </div>

    <button class="remove" onclick="removeItem(${item.id})">×</button>
`;


        cartItems.appendChild(div);

        total += item.price * item.quantity;
    });

    cartTotal.innerText = `Total: ${total} $`;
}

  
function increase(id) {
    const item = cart.find(i => i.id === id);
    item.quantity++;
    renderCart();
}

function decrease(id) {
    const item = cart.find(i => i.id === id);

    if (item.quantity > 1) {
        item.quantity--;
    } else {
        removeItem(id);
    }

    renderCart();
}

function removeItem(id) {
    cart = cart.filter(i => i.id !== id);
    renderCart();
}

const productInput = document.getElementById("product");

const names = cart.map(item => item.name + " x" + item.quantity);

productInput.value = names.join(", ");




document.getElementById("checkout-button").onclick = function () {
    document.getElementById("checkout").scrollIntoView({
        behavior: "smooth"
    });
};


  document.getElementById("main-action-button").onclick = function () {
    document.getElementById("products").scrollIntoView({behavior:"smooth"});
}
/*
const links = document.querySelectorAll(".menu-item > a");
for (let i = 0; i < links.length; i++) {
    links[i].onclick = function () {
        document.getElementById(links[i].getAttribute("data-link")).scrollIntoView({behavior:"smooth"});
    }
}

const buttons = document.querySelectorAll(".products-item .button");
for (let i = 0; i < buttons.length; i++) {
    buttons[i].onclick = function () {
        document.getElementById("order").scrollIntoView({behavior:"smooth"});
    }
}
*/

const prices = document.getElementsByClassName("products-item-price");
document.getElementById("change-currency").onclick = function (e) {
    const currentCurrency = e.target.innerText;

    let newCurrency = "$";
    let coefficient = 1;
    if (currentCurrency === "$") {
        newCurrency = "₽";
        coefficient = 90;
    } else if (currentCurrency === "₽") {
        newCurrency = "BYN";
        coefficient = 3;
    }
    else if (currentCurrency === "BYN") {
        newCurrency = "€";
        coefficient = 0.9;
    }
    else if (currentCurrency === "€") {
        newCurrency = "¥";
        coefficient = 6.9;
    }
    e.target.innerText = newCurrency;

    for (let i = 0; i < prices.length; i++) {
        prices[i].innerText = +(prices[i].getAttribute("data-base-price") * coefficient).toFixed(1) + " " + newCurrency;
        
    }
}



const product = document.getElementById("product");
const name = document.getElementById("name");
const phone = document.getElementById("phone");
document.getElementById("order-action").onclick = function () {
    let hasError = false;

    [product, name, phone].forEach(item => {
        if (!item.value) {
            item.style.borderColor = "red";
            hasError = true;
        } else {
            item.style.borderColor = "";
        }
    });

    if (!hasError) {
        [product, name, phone].forEach(item => {
            item.value = "";
        });
        alert("Спасибо за заказ! Мы скоро свяжемся с Вами.");
    }
}

