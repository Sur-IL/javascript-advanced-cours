Vue.component('error', {
    data() {
        return {
            text: ''
        }
    },
    methods: {
        setText(value) {
            this.text = value;
        }
    },
    template: `
            <div class="error" v-if="text">
            ОШИБКА ПОДКЛЮЧЕНИЯ ФАЙЛА
            </div>
            `
})