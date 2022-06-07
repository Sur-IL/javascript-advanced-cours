class Validator {
    constructor(form) { // в конструктор в качестве параметра передается айди формы
        this.patterns = { // правила заполнения каждого поля
            name: /^[a-zа-яё]+$/i, // в скобках указаны только те символы допускаемые для введения
            phone: /^\+7\(\d{3}\)\d{3}-\d{4}$/, // скобки в регулярных выражениях как и другие спецсимволы экранируются
            email: /^[\w._-]+@\w+\.[a-z]{2,4}$/i
        };
        this.errors = { // сообщения об ошибках 
            name: 'Имя должно содержать только буквы',
            phone: 'Введите телефон в соответствии с шаблоном +7(000)000-0000',
            email: 'E-mail должен выглядеть так: mymail@mail.ru, my.mail@mail.ru или my-mail@mail.ru'
        };
        this.errorClass = 'error-msg';
        this.form = form;
        this.valid = false; // по умолчанию форма заполнена некорректно
        this._validateForm(); // запускаем метод
    }

    validate(regexp, value) {
        regexp.test(value)
    }

    _validateForm() {
        // находим элемент myform и находим колекцию ошибок и распаковываем ее, потому что коллекция - не массив
        let errors = [...document.getElementById(this.form).querySelectorAll(`.${this.errorClass}`)];
        for (let error of errors) { // проходим по всем элементам массива
            error.remove(); // и удаляем ошибки
        }
        // находим элемент myform и находим колекцию инпутов и распаковываем ее
        let formFields = [...document.getElementById(this.form).getElementsByTagName('input')];
        for (let field of formFields) { // проходим по всем инпутам
            this._validate(field); // каждый инпут отправляем в метод _validate
        }
        // находим элемент myform и находим колекцию инпутов с классом invalid и распаковываем ее
        if (![...document.getElementById(this.form).querySelectorAll('.invalid')].length) { // если их нет
            this.valid = true; // valid переопределяем
        }
    }

    _validate(field) { // принимает инпут
        if (this.patterns[field.name]) { // обращаемся к атрибуту тега и узнаем есть ли правило(шаблон) для этого инпута
            if (!this.patterns[field.name].test(field.value)) { // если есть и значение этого поля корректно
                field.classList.add('invalid'); // добавляем класс invalid
                this._addErrorMsg(field); // выводим текст с ошибкой под инпутом
                this._watchField(field); // регистрируем событие инпут, которое контролирует ввод каждого символа в инпут
            }
        }
    }

    _addErrorMsg(field) { // принимает инпут
        let error = `<div class="${this.errorClass}">${this.errors[field.name]}</div> `; // выводит актуальный текст с ошибкой
        field.parentNode.insertAdjacentHTML('beforeend', error); // перед окончанием родительского элемента инпута вставляем текст с ошибкой
    }

    _watchField(field) { // принимает инпут
        field.addEventListener('input', () => { // бобавляем слушателя для инпута
            let error = field.parentNode.querySelector(`.${this.errorClass}`); // в родительсвком элементе ищем ошибку
            if (this.patterns[field.name].test(field.value)) { // если новое значение корректно
                field.classList.remove('invalid'); // удаляем класс invalid
                field.classList.add('valid'); // добавляем класс valid
                if (error) {
                    error.remove(); // удаляем ошибку если она есть
                }
            } else { // если новое значение некорректно
                field.classList.remove('valid'); // удаляем класс valid
                field.classList.add('invalid'); // добавляем класс invalid
                if (!error) {
                    this._addErrorMsg(field); // запускаем метод добавляющий ошибку
                }
            }
        })
    }
}