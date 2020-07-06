import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './pages/home'
import Index from './pages/index'

Vue.use(VueRouter)

export default new VueRouter({
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
            redirect: 'index',
            children: [
                {
                    path: '/index',
                    name: 'index',
                    component: Index
                },{
                    path: '/product/:id',
                    name: 'product',
                    component: () => import('./pages/product.vue')
                },{
                    path: '/detail/:id',
                    name: 'detail',
                    component: () => import('./pages/detail.vue')
                }
            ]
        },{
            path: '/login',
            name: 'login',
            component: () => import('./pages/login.vue')
        },{
            path: '/cart',
            name: 'cart',
            component: () => import('./pages/cart.vue')
        },{
            path: '/order',
            name: 'order',
            component: () => import('./pages/order.vue'),
            children: [
                {
                    path: 'list',
                    name: 'orderlist',
                    component: () => import('./pages/orderList.vue')
                },{
                    path: 'pay',
                    name: 'orderpay',
                    component: () => import('./pages/orderPay.vue')
                },{
                    path: 'confirm',
                    name: 'orderconfirm',
                    component: () => import('./pages/orderConfirm.vue')
                },{
                    path: 'alipay',
                    name: 'alipay',
                    component: () => import('./pages/alipay.vue')
                }
            ]
        }
        
    ]
})