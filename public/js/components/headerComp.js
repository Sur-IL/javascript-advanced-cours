Vue.component('headerComp', {
    data() {
        return {
            showMenu: false,
            showCart: false,
        }
    },
    template: `
    <header class="header">
        <div class="container">
            <div class="header__wrap">
                <div class="logo__list">
                    <a href=""><img class="logo__img" src="img/index/logo.svg" alt="logo"></a>
                </div>
                <search-form></search-form>
                <div class="menu__list">
                    <img class="menu__icon" src="img/index/menu.svg" alt="menu" @click="showMenu = !showMenu">
                    <a href=""><img class="account" src="img/index/account.svg" alt="account"></a>
                    <div class="cart__wrap">
                        <img class="cart-img" src="img/index/basket.svg" alt="cart" @click="showCart = !showCart">
                    </div>
                </div>
            </div>
        </div>
    </header>
    `
});

Vue.component('searchForm', {
    data() {
        return {
            userSearch: '',
        }
    },
    template: `
            <form action="#" class="search-form" @submit.prevent="$root.$refs.products.filter(userSearch)">
                <input type="text" class="search-field" v-model="userSearch">
                <a href="" class="btn-search"><img src="img/index/search.svg" alt="search"></a>
            </form>
    `
});