const products = [
    { id: 1, title: 'Notebook', price: 2000, },
    { id: 2, title: 'Mouse', price: 20 },
    { id: 3, title: 'Keyboard', price: 200 },
    { id: 4, title: 'Gamepad', price: 50 },
];



//Функция для формирования верстки каждого товара
//Добавить в выводе изображение
const renderProduct = (products) => {
    return `<div class="product-item">
                <img src="img/icon-js.png" alt="">
                <h3>${products.title}</h3>
                <p>$${products.price}</p>
                <button class="buy-btn">Купить</button>
            </div>`
};
const renderPage = list => {
    const productsList = list.map(products => renderProduct(products));
    console.log(productsList);
    document.querySelector('.products').innerHTML = productsList.join('');
};

renderPage(products);