import { createApp } from 'vue'
import App from './App.vue'
import vClickOutside from "click-outside-vue3"
import { createStore } from 'vuex'

// Create a new store instance.
const store = createStore({
    state () {
        return {
            today: new Date(),
        }
    },
    mutations: {
        set_today(state, new_date) {
            state.today = new_date
        }
    }
})


const app = createApp(App)
app.use(vClickOutside)
app.use(store)
app.mount('#app')
