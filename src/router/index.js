import { createWebHistory, createRouter } from 'vue-router';

import NavBar from '../components/NavBar.vue'
import Formulario from '../components/Formulario.vue'

const routes = [
    { path: '/', name: 'Index', component: NavBar },
    { path: '/formulario', name: 'Formulario', component: Formulario },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router