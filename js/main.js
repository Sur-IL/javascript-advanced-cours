const products = [
    { id: 1, title: 'Notebook', price: 2000, picture: 'https://st.depositphotos.com/1001877/1469/i/950/depositphotos_14695825-stock-photo-laptop-3d.jpg' },
    { id: 2, title: 'Mouse', price: 20, picture: 'http://xn----dtbjalal8asil4g8c.xn--p1ai/wp-content/uploads/2014/07/kompjuternaja-mysh-1.jpg' },
    { id: 3, title: 'Keyboard', price: 200, picture: 'https://www.ixbt.com/img/n1/news/2021/1/2/OOoVW42wLGW7rLsw_large.jpg' },
    { id: 4, title: 'Gamepad', price: 50, picture: 'https://cdn.igromania.ru/mnt/news/2/9/3/e/6/0/88224/961d51a3c7a38c30_1920xH.jpg' },
];



//Функция для формирования верстки каждого товара
//Добавить в выводе изображение
const renderProduct = (product) => {
    return `<div class="product-item">
                <img src="${product.picture}">
                <h3>${product.title}</h3>
                <p>$${product.price}</p>
                <button class="buy-btn">Купить</button>
            </div>`
};
const renderPage = list => {
    document.querySelector('.products').innerHTML =
        (list.map(product => renderProduct(product))).join('');
};

renderPage(products);