
// ЕСЛИ У СВОЙСТВА ЕСТЬ СВОИ СОБСТВЕННЫЕ СВОЙСТВА, ТО ВСЕГДА СОЗДАЕТСЯ ОТДЕЛЬНЫЙ КЛАСС И ОПИСЫВАЮТСЯ ИЭТИ СВОЙСТВА

class Param { // создаем класс с описанием свойств параметров класса Burger
    constructor(element) { // в качестве параметра принимает значение, переданное в this.size из _select()
        this.name = element.value; // значение указанное в value
        this.price = +element.dataset['price']; // цена свойства приводим к Number
        this.calories = +element.dataset['calories']; // количество калорий свойства приводим к Number
    }
}
class Burger {
    constructor(size, add, topping) {//add - состав
        this.size = new Param(this._select(size)); // возвращает значение из _select()
        this.add = new Param(this._select(add)); // возвращает значение из _select()
        // this.size.name теперь у этих свойств есть свои свойства (name, price, calories)
        this.toppings = this._getToppings(topping); // возвращает значение из _getToppings() (массив с параметрами)
    }

    _getToppings(name) { // принимает название input и готовит массив для параметра класса Param
        let result = [];
        this._selectAll(name).forEach(el => { // 
            let obj = new Param(el);
            result.push(obj);
        });
        return result; //получаем массив объектов со свойствами
    }

    _select(name) {
        return document.querySelector(`input[name=${name}]:checked`); // возвращает значение указанное на входе (size, add)
    }

    _selectAll(name) {
        return [...document.querySelectorAll(`input[name=${name}]:checked`)]; // получаем коллекцию элементов и делаем из нее массив
    }

    _sumPrice() {
        //console.log(this.toppings);
        let result = this.size.price + this.add.price; // складываем стоимости размера и начинки бургера
        this.toppings.forEach(el => result += el.price); // обходим все топпингсы и цену каждого складываем с результатом
        return result; // возвращаем результат
    }

    _sumCalories() {
        let result = this.size.calories + this.add.calories; // складываем калории размера и начинки бургера
        this.toppings.forEach(el => result += el.calories); // обходим все топпингсы и калории каждого складываем с результатом
        return result; // возвращаем результат
    }

    showSum(price, calories) {
        document.querySelector(price).textContent = this._sumPrice(); // обновляем текстконтент в теге спан в итоговой стоимости
        document.querySelector(calories).textContent = this._sumCalories(); // обновляем текстконтент в теге спан в количестве каллорий
    }
}