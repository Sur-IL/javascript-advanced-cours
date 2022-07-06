Vue.component('brand', {
    template: `
    <div class="brand-wrap">
        <div class="brand">
            <div class="brand__left">
                <img class="brand__img" src="img/index/rect-img.png" alt="photo">
            </div>

            <div class="brand__right">
                <div class="brand__text"><span class="brand__span">THE BRAND</span> <br>
                    OF LUXERIOUS <span class="fashion">FASHION</span>
                </div>
            </div>
        </div>
        <div class="brand-dark" v-show="$root.$refs.headerComp.showMenu">
            <div class="navbar">
                <img class="menu-close" src="img/index/menu-close.png" alt="...">
                <h4 class="menu">MENU</h4>
                <a href="" class="heading-text">MAN</a>
                <div class="for">
                    <a href="" class="menu-link">Accessories</a>
                    <a href="" class="menu-link">Bags</a>
                    <a href="" class="menu-link">Denim</a>
                    <a href="" class="menu-link">T-Shirts</a>
                </div>
                <a href="" class="heading-text">WOMAN</a>
                <div class="for">
                    <a href="" class="menu-link">Accessories</a>
                    <a href="" class="menu-link">Jackets & Coats</a>
                    <a href="" class="menu-link">Polos</a>
                    <a href="" class="menu-link">T-Shirts</a>
                    <a href="" class="menu-link">Shirts</a>
                </div>
                <a href="" class="heading-text">KIDS</a>
                <div class="for">
                    <a href="" class="menu-link">Accessories</a>
                    <a href="" class="menu-link">Jackets & Coats</a>
                    <a href="" class="menu-link">Polos</a>
                    <a href="" class="menu-link">T-Shirts</a>
                    <a href="" class="menu-link">Shirts</a>
                    <a href="" class="menu-link">Bags</a>
                </div>
            </div>
        </div>
    </div>
    `
})