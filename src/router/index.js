import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProductsView from '../views/ProductsView.vue'
import CategoryView from '../views/CategoryView.vue'
import SearchProductsView from '../views/SearchProductsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path:'/products',
      name: 'products',
      component: ProductsView
    },
    {
      path:'/category/:categoria',
      name: 'category',
      component: CategoryView
    },
    {
      path:'/produto/:id',
      name:'produto',
      component: ProductsView
    },
    {
      path:'/buscar',
      name:'buscar',
      component: SearchProductsView
    },
  ],
})

export default router
