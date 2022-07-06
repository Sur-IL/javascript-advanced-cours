Vue.component('cart', {
    data() {
        return {
            showCart: false,
            cartItems: [],
        }
    },
    methods: {
        addProduct(item) {
            let find = this.cartItems.find(el => el.product_id === item.product_id);
            if (find) {
                this.$parent.putJson(`/api/cart/${item.product_id}`, { product_quantity: 1 })
                    .then(data => {
                        if (data.result === 1) {
                            find.product_quantity++;
                        }
                    })
            } else {
                let prod = Object.assign({ product_quantity: 1 }, item);
                this.$parent.postJson(`/api/cart/${item.product_id}`, prod)
                    .then(data => {
                        if (data.result) {
                            this.cartItems.push(prod);
                        }
                    })
            }
        },
        remove(item) {
            if (item.product_quantity > 1) {
                this.$parent.putJson(`/api/cart/${item.product_id}`, { product_quantity: -1 })
                    .then(data => {
                        if (data.result) {
                            item.product_quantity--;
                        }
                    })
            } else {
                this.$parent.delJson(`/api/cart/${item.product_id}`, item)
                    .then(data => {
                        if (data.result) {
                            this.cartItems.splice(this.cartItems.indexOf(item), 1)
                        } else {
                            console.log('error');
                        }
                    })
            }
        },
    },
    mounted() {
        this.$parent.getJson('/api/cart')
            .then(data => {
                for (let item of data.contents) {
                    this.cartItems.push(item);
                }
            })
    },
    template: `
        <div class="cartComp">
            <div class="cart__block" v-show="$root.$refs.headerComp.showCart">
                <h3>Cart</h3>
                <p class="emptyCart" v-if="!cartItems.length">Cart is Empty</p>
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