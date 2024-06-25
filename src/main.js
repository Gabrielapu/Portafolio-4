import "leaflet/dist/leaflet.css";
import "@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css";
import './assets/base.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import dayjs from './plugins/dayjs.js'
import toastObj from './plugins/toastify.js'
import VueDatePicker from './plugins/datepicker'
import VueApexCharts from "vue3-apexcharts";
import L from 'leaflet';
import "leaflet/dist/leaflet.css";
import "@geoman-io/leaflet-geoman-free";
import './plugins/vee-validate-rules.js'
import '@fortawesome/fontawesome-free/css/all.css'
import 'leaflet.awesome-markers/dist/leaflet.awesome-markers.css'
import 'leaflet.awesome-markers/dist/leaflet.awesome-markers.js'

const { Vue3Toastify, ToastContainerOptions, toast } = toastObj
const app = createApp(App)


app.use(VueApexCharts);
app.use(Vue3Toastify, ToastContainerOptions)
app.use(createPinia())
app.use(router)

app.component('VueDatePicker', VueDatePicker);

app.provide('dayjs', dayjs)
app.provide('toast', toast) 

app.mount('#app')
