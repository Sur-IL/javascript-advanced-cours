const API = 'jsonFiles';

const app = new Vue({
    el: '#app',
    data: {
        showMenu: false,
    },
    methods: {
        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => console.log(error))
        },
    },
});