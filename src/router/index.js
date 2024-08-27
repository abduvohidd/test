import { createRouter, createWebHistory } from 'vue-router'
import NotFound from '../views/NotFound.vue'

const routes = [
  {
    history: createWebHistory(import.meta.env.BASE_URL),
  },
  {
    path: '/',
    name: 'Dashboard',
    component: () => import('@/views/Dashboard.vue'),
    redirect: { name: 'dashboard' },
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import('@/views/dashboard/index.vue'),
      },
      {
        path: '/investor-app',
        name: 'investor-app',
        redirect: { name: 'investor-list' },

        children: [
          {
            path: '/investors',
            name: 'investor-list',
            component: () => import('@/views/investor-app/investors/index.vue'),
          },

          {
            path: '/investors/create',
            name: 'investor-create',
            component: () => import('@/views/investor-app/investors/createInvestor.vue'),
          },
          {
            path: '/investors/edit/:id',
            name: 'investor-edit',
            component: () => import('@/views/investor-app/investors/editInvestor.vue'),
          },
          {
            path: '/investors/view/:id',
            name: 'investor-view',
            component: () => import('@/views/investor-app/investors/viewInvestor.vue'),
          },

          // {
          //   path: '/investors/view/:id',
          //   name: 'investor-create',
          //   component: () => import('@/views/investor-app/investors/createInvestor.vue'),
          // },
        ],
      },
      {
        path: '/investor-app/investor-billing',
        name: 'investor-billing',
        component: () => import('@/views/investor-app/investor-billing/index.vue'),
      },
      {
        path: '/investor-app/investor-live',
        name: 'investor-live',
        component: () => import('@/views/investor-app/investor-live/index.vue'),
      },

      {
        path: '/user-app',
        name: 'user-app-station-list',
        redirect: { name: 'station-list' },

        children: [
          {
            path: '/station-list',
            name: 'station-list',
            component: () => import('@/views/users/station/index.vue'),
          },

          {
            path: '/station-list/create',
            name: 'station-create',
            component: () => import('@/views/users/station/stationCreate.vue'),
          },
          {
            path: '/station-list/edit/:id',
            name: 'station-edit',
            component: () => import('@/views/users/station/stationEdit.vue'),
          },
          {
            path: '/station-list/view/:id',
            name: 'station-view',
            component: () => import('@/views/users/station/stationView.vue'),
          },
          {
            path: '/station-list/stats/:id',
            name: 'station-stats',
            component: () => import('@/views/users/station/stationStats.vue'),
          },
        ],
      },

      {
        path: '/user-app',
        name: 'user-app-socket-list',
        redirect: { name: 'sockets-list' },

        children: [
          {
            path: '/sockets-list',
            name: 'sockets-list',
            component: () => import('@/views/users/socket/index.vue'),
          },
          {
            path: '/socket-create',
            name: 'socket-create',
            component: () => import('@/views/users/socket/socketCreate.vue'),
          },
          {
            path: '/socket-edit/:id',
            name: 'socket-edit',
            component: () => import('@/views/users/socket/socketEdit.vue'),
          },
          {
            path: '/socket-view/:id',
            name: 'socket-view',
            component: () => import('@/views/users/socket/socketView.vue'),
          },
        ],
      },

      {
        path: '/user-app',
        name: 'user-app-nearby-list',
        redirect: { name: 'nearby-list' },

        children: [
          {
            path: '/nearby-list',
            name: 'nearby-list',
            component: () => import('@/views/users/nearby/index.vue'),
          },
          {
            path: '/nearby-create',
            name: 'nearby-create',
            component: () => import('@/views/users/nearby/nearbyCreate.vue'),
          },
          {
            path: '/nearby-edit/:id',
            name: 'nearby-edit',
            component: () => import('@/views/users/nearby/nearbyEdit.vue'),
          },
          {
            path: '/nearby-view/:id',
            name: 'nearby-view',
            component: () => import('@/views/users/nearby/nearbyView.vue'),
          },
        ],
      },
      {
        path: '/user-app',
        name: 'user-app-user-list',
        redirect: { name: 'user-list' },

        children: [
          {
            path: '/user-list',
            name: 'user-list',
            component: () => import('@/views/users/user/index.vue'),
          },

          {
            path: '/user-list/view/:id',
            name: 'user-view',
            component: () => import('@/views/users/user/_id.vue'),
          },
        ],
      },

      {
        path: '/user-app',
        name: 'user-app-problems-list',
        redirect: { name: 'problems-list' },

        children: [
          {
            path: '/problems-list',
            name: 'problems-list',
            component: () => import('@/views/users/problem/index.vue'),
          },
        ],
      },

      {
        path: '/user-app',
        name: 'user-app-refund-list',
        redirect: { name: 'refund-list' },

        children: [
          {
            path: '/refund-list',
            name: 'refund-list',
            component: () => import('@/views/users/refund/index.vue'),
          },
        ],
      },
      {
        path: '/user-app',
        name: 'user-app-rewiew-list',
        redirect: { name: 'rewiew-list' },

        children: [
          {
            path: '/rewiew-list',
            name: 'rewiew-list',
            component: () => import('@/views/users/rewiew/index.vue'),
          },
        ],
      },

      {
        path: '/faq',
        name: 'faq-page',
        redirect: { name: 'faq-list' },

        children: [
          {
            path: '/faq-list',
            name: 'faq-list',
            component: () => import('@/views/faq/index.vue'),
          },
        ],
      },

      {
        path: '/blog',
        name: 'blog-page',
        redirect: { name: 'blog-list' },

        children: [
          {
            path: '/blog-list',
            name: 'blog-list',
            component: () => import('@/views/blog/index.vue'),
          },

          {
            path: '/blog-create',
            name: 'blog-create',
            component: () => import('@/views/blog/blogCreate.vue'),
          },
          {
            path: '/blog-edit/:id',
            name: 'blog-edit',
            component: () => import('@/views/blog/blogEdit.vue'),
          },
        ],
      },

      {
        path: '/cars-models',
        name: 'cars-models',
        redirect: { name: 'car-models-list' },

        children: [
          {
            path: '/car-models',
            name: 'car-models-list',
            component: () => import('@/views/cars/carModel/index.vue'),
          },

          {
            path: '/car-models-create',
            name: 'car-models-create',
            component: () => import('@/views/cars/carModel/carCreate.vue'),
          },
          {
            path: '/car-models-edit/:id',
            name: 'car-models-edit',
            component: () => import('@/views/cars/carModel/carEdit.vue'),
          },
        ],
      },

      {
        path: '/cars-makes',
        name: 'cars-makes',
        redirect: { name: 'car-makes-list' },

        children: [
          {
            path: '/car-makes',
            name: 'car-makes-list',
            component: () => import('@/views/cars/carBrands/index.vue'),
          },

          {
            path: '/car-makes-create',
            name: 'car-makes-create',
            component: () => import('@/views/cars/carBrands/carCreate.vue'),
          },
          {
            path: '/car-makes-edit/:id',
            name: 'car-makes-edit',
            component: () => import('@/views/cars/carBrands/carEdit.vue'),
          },
        ],
      },

      {
        path: '/privacy-policy-agreemnt',
        name: 'privacy-policy-agreemnt',
        redirect: { name: 'agreement-list' },

        children: [
          {
            path: '/agreement',
            name: 'agreement-list',
            component: () => import('@/views/privacy/agreement/index.vue'),
          },

          {
            path: '/agreement/create',
            name: 'agreement-create',
            component: () => import('@/views/privacy/agreement/createPolicy.vue'),
          },

          {
            path: '/agreement/edit/:id',
            name: 'agreement-edit',
            component: () => import('@/views/privacy/agreement/editPrivacy.vue'),
          },
        ],
      },

      {
        path: '/privacy-policy-user',
        name: 'privacy-policy-user',
        redirect: { name: 'userTerm-list' },

        children: [
          {
            path: '/userTerm',
            name: 'userTerm-list',
            component: () => import('@/views/privacy/userTerm/index.vue'),
          },

          {
            path: '/userTerm/create',
            name: 'userTerm-create',
            component: () => import('@/views/privacy/userTerm/termCreate.vue'),
          },

          {
            path: '/userTerm/edit/:id',
            name: 'userTerm-edit',
            component: () => import('@/views/privacy/userTerm/editTerm.vue'),
          },
        ],
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login.vue'),
  },

  {
    path: '/privacy-policy/:language',
    name: 'privacy-policy',
    component: () => import('@/views/Privacy.vue'),
  },

  {
    path: '/user-terms/:language',
    name: 'user-terms',
    component: () => import('@/views/UserTerms.vue'),
  },

  {
    path: '/:catchAll(.*)', // This matches all routes that were not found
    name: 'NotFound',
    component: () => import('@/views/NotFound.vue'), // Use your custom 404 component
  },
]

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior() {
    return { top: 0 }
  },
  routes,
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('access')
  const isLoggedIn = localStorage.getItem('isLoggedIn')

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!!isLoggedIn && token) {
      // Here, you can add code to check token validity if needed
      next()
    } else {
      // Handle unauthorized access
      next('/login')
    }
  } else {
    next()
  }
})

export default router
