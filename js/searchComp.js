Vue.component('search-form', {
    data() {
        return {
            userSearch: '',
        }
    },
    template: `
                <form action="#" class="search-form" @submit.prevent="$parent.$refs.products.filter(userSearch)">
                <input type="text" class="search-field" v-model="userSearch">
                <a href="" class="btn-search"><img src="img/index/search.svg" alt="search"></a>
            </form>
    `
});