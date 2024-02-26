import {createRouter, createWebHistory} from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'alQuranPage',
        meta:{layout:'defaultLayout'},
        component: () => import('../pages/homePage.vue'),      
    },
    {
                
        path: '/detail/:id',
        name: 'detailPage',
        meta:{layout:'layoutNotTab'},
        component: () => import('../pages/surahDetail.vue')
    },

    {
        path:'/doa',
        name:'doaPage',
        meta:{layout:'defaultLayout'},
        component: () => import('../pages/doaPage.vue')
    },
    {
        path:'/doa/:id',
        name:'doaDetail',
        meta:{layout:'layoutNotTab'},
        component: () => import('../pages/doaDetailPage.vue')
    }
]
const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router