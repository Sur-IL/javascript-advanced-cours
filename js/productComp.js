Vue.component('products', {
    data() {
        return {
            catalogUrl: '/catalogData.json',
            filtered: [],
            products: [],
        }
    },
    methods: {
        filter() {
            let regexp = new RegExp(this.userSearch, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.product_name));
        }
    },
    mounted() {
        this.$parent.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                for (let item of data) {
                    this.$data.products.push(item);
                    this.$data.filtered.push(item);
                }
            });
    },
    template: `
    <div class="featured container">
        <h2 class="heading__featured">Fetured Items</h2>
        <p class="text__featured">
            Shop for items based on what we featured in this week
        </p>
        <div class="cards">
            <product v-for="item of filtered" :key="item.product_id" :productItem="item"></product>
        </div>
        <button class="featured__button">Browse All Product</button>
    </div>
    `
});

Vue.component('product', {
    props: ['productItem'],
    template: `
                <div class="featured__card">
                    <div class="featured__img-wrap">
                        <img class="card-img" :src="productItem.product_img" alt="photo">
                        <div class="featured__img-dark">
                            <button class="buy_button" @click="$root.$refs.cart.addProduct(productItem)"">
                            Add to cart
                            </button>
                        </div>
                    </div>
                    <div class="card__title">
                        <h4 class="card-heading">{{ productItem.product_name }}</h4>
                        <p class="card-text">{{ productItem.product_discription }}</p>
                        <p class="card-price">$ {{ productItem.product_price }}</p>
                    </div>
                </div>   
    `
});