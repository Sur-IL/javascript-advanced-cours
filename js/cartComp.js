Vue.component('cart', {
    data() {
        return {
            showCart: false,
            cartUrl: '/getBasket.json',
            cartItems: [],
        }
    },
    methods: {
        addProduct(item) {
            this.$root.getJson(`${API}/addToBasket.json`)
                .then(data => {
                    if (data.result === 1) {
                        let find = this.cartItems.find(el => el.product_id === item.product_id);
                        if (find) {
                            find.product_quantity++;
                        } else {
                            const prod = Object.assign({ product_quantity: 1 }, item);
                            this.cartItems.push(prod)
                        }
                    }
                })
        },
        remove(item) {
            this.$root.getJson(`${API}/deleteFromBasket.json`)
                .then(data => {
                    if (data.result === 1) {
                        if (item.product_quantity > 1) {
                            item.product_quantity--;
                        } else {
                            this.cartItems.splice(this.cartItems.indexOf(item), 1);
                        }
                    }
                })
        },
    },
    mounted() {
        this.$root.getJson(`${API + this.cartUrl}`)
            .then(data => {
                for (let item of data.contents) {
                    this.cartItems.push(item);
                }
            })
    },
    template: `
<div class="cartComp">
            <img class="cart-img" src="img/index/basket.svg" alt="cart" @click="showCart = !showCart">
            <div class="cart__block" v-show="showCart">
                <cart-item
                    v-for="item of cartItems" 
                    :key="item.product_id"
                    :cart-item="item"
                    @remove="remove">
                    </cart-item>
            </div> 
</div>
    `
});

Vue.component('cart-item', {
    props: ['cartItem'],
    template: `
                <div class="cart-item">
                    <div class="product-bio">
                        <img class="cartItem-img" :src="cartItem.product_img" alt="Some image">
                        <div class="product-desc">
                            <div class="product-title">{{ cartItem.product_name }}</div>
                            <div class="product-quantity">Quantity: {{ cartItem.product_quantity }}</div>
                            <div class="product-single-price">$ {{ cartItem.product_price }} each</div>
                        </div>
                        <div class="right-block">
                            <p class="product-price">$ {{ cartItem.product_quantity * cartItem.product_price }}</p>
                            <button class="del-btn" @click="$emit('remove', cartItem)">&times;</button>
                        </div>
                    </div>
                </div>
    `
});