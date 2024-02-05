import {createRouter, createWebHistory} from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'homePage',
        meta:{layout:'defaultLayout'},
        component: () => import('../pages/homePage.vue'),      
    },
    {
                
        path: '/detail/:id',
        name: 'detailPage',
        meta:{layout:'layoutNotTab'},
        component: () => import('../pages/surahDetail.vue')
    }
]
const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router