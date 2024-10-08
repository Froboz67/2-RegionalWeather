import './assets/main.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { createStore } from './store'




import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createStore())

app.use(router)

app.mount('#app')
