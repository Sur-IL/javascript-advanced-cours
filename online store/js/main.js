class ProductList {
    constructor(container = '.products') {
        this.container = container;
        this.goods = [];
        this._fetchProducts(); // recomendation that the method be called inside the class
        this.render(); // output the products on the page
    }
    _fetchProducts() {
        this.goods = [
            { id: 1, title: 'Notebook', price: 2000, img: 'https://via.placeholder.com/200x150' },
            { id: 2, title: 'Mouse', price: 20, img: 'https://via.placeholder.com/200x150' },
            { id: 3, title: 'Keyboard', price: 200, img: 'https://via.placeholder.com/200x150' },
            { id: 4, title: 'Gamepad', price: 50, img: 'https://via.placeholder.com/200x150' },
        ];
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
}

class ProductItem {
    constructor(product) {
        this.title = product.title;
        this.id = product.id;
        this.price = product.price;
        this.img = product.img;
    }
    render() {
        return `<div class="product-item">
        <img src="${this.img}">
        <h3>${this.title}</h3>
        <p>${this.price}</p>
        <button class="buy-btn">Купить</button>
    </div>`
    }
}

let list = new ProductList();

class Cart {
    addToCart() {

    }
    removeFromCart() {

    }
    render() {

    }
}

class CartItem {
    render() {

    }
}

// const products = [
//     {id: 1, title: 'Notebook', price: 2000},
//     {id: 2, title: 'Mouse', price: 20},
//     {id: 3, title: 'Keyboard', price: 200},
//     {id: 4, title: 'Gamepad', price: 50}
// ];
// //Функция для формирования верстки каждого товара
// const renderProduct = (product,img='https://via.placeholder.com/200x150') => {
//     return `<div class="product-item">
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
