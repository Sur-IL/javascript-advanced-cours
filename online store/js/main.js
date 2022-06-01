const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const cartTotalEl = document.querySelector('.cartTotal');
const productItem = document.querySelector('.product-item');
const cartButtonEl = document.querySelector('.btn-cart');
const cartEl = document.querySelector('.cart');
const cartTotalValue = document.querySelector('.cartTotalValue');

class ProductList {
    constructor(container = '.products') {
        this.container = container;
        this.goods = [];
        this._getProducts()
            .then(data => { // после преобразования строки в коллекцию объектов JS снова делаем then
                this.goods = data; // в this.goods присавиваем массив объектов
                this.render()
            });
    }
    // _fetchProducts() {
    //     this.goods = [
    //         { id: 1, title: 'Notebook', price: 2000, img: 'https://via.placeholder.com/200x150' },
    //         { id: 2, title: 'Mouse', price: 20, img: 'https://via.placeholder.com/200x150' },
    //         { id: 3, title: 'Keyboard', price: 200, img: 'https://via.placeholder.com/200x150' },
    //         { id: 4, title: 'Gamepad', price: 50, img: 'https://via.placeholder.com/200x150' },
    //     ];
    // }
    _getProducts() {
        return fetch(`${API}/catalogData.json`) // делаем коннект к внешнему ресурсу и получаем строку json
            .then(result => result.json()) // метод json, преобразует строку json в коллекцию объектов JS и возвращает promise
            .catch(error => { // в случае ошибки подключения запустится catch(ошибку)
                console.log(error)
            });
    }
    render() {
        const block = document.querySelector(this.container);
        for (let product of this.goods) {
            const item = new ProductItem(product);
            block.insertAdjacentHTML("beforeend", item.render());
        }
    }
    getSumOfGoods() {
        let result = 0;
        for (let product of this.goods) {
            result += product.price;
        }
        alert(result);
    }
    _getCartList() {
        return fetch(`${API}/getBasket.json`)
            .then(result => result.json())
            .then(data => {
                let cartEls = [...data.contents];
                console.log(cartEls);
            })
            .catch(error => {
                console.log(error)
            });
    }
}

class ProductItem {
    constructor(product, img = 'https://via.placeholder.com/200x150') {
        this.title = product.product_name;
        this.id = product.id_product;
        this.price = product.price;
        this.img = img;
    }
    render() {
        return `<div class="product-item">
        <img src="${this.img}">
        <h3>${this.title}</h3>
        <p>$${this.price}</p>
        <button class="buy-btn">Купить</button>
    </div>`
    }
}

let list = new ProductList();

class CartItem {
    constructor(product) {
        this.name = product.product_name;
        this.price = product.price;
        this.id = product.id_product;
        this.count = product.quantity;
    }
    render() {
        return `
         <div class="cartRow">
            <div>${this.name}</div>
            <div>
                <span class="productCount">${this.count}</span> шт.
            </div>
            <div>$${this.price}</div>
            <div>
                $<span class="cartTotalRow">
                    ${(this.price * this.count).toFixed(2)}
                </span>
            </div>
        </div>
        `;
    }
}

class Cart {
    constructor(container = '.cartRow') {
        this.container = container;
        this.goods = [];
        this._showCart();
        this._getCartList()
            .then(data => {
                this.goods = data.contents;
                this.render();
            });
    }

    _getCartList() {
        return fetch(`${API}/getBasket.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error)
            });
    }

    render() {
        const cartNode = document.querySelector(this.container);
        for (let product of this.goods) {
            const item = new CartItem(product);
            cartNode.insertAdjacentHTML("afterend", item.render());
        }
    }

    _showCart() {
        cartButtonEl.addEventListener('click', () => {
            cartEl.classList.toggle('hidden');
        });
    }
}

let cart = new Cart();

// const products = [
//     {id: 1, title: 'Notebook', price: 2000},
//     {id: 2, title: 'Mouse', price: 20},
//     {id: 3, title: 'Keyboard', price: 200},
//     {id: 4, title: 'Gamepad', price: 50}
// ];
// //Функция для формирования верстки каждого товара
// const renderProduct = (product,img='https://via.placeholder.com/200x150') => {
//     return `< div class="product-item" >
//                 <img src="${product.img}">
//                 <h3>${product.title}</h3>
//                 <p>${product.price}</p>
//                 <button class="buy-btn">Купить</button>
//             </div>`
// };
// const renderPage = list => {
//     document.querySelector('.products').innerHTML =
//         (list.map(product => renderProduct(product))).join('');
// };



// renderPage(products);
