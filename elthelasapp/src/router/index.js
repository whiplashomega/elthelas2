import { createRouter, createWebHistory } from 'vue-router';
import home from '@/views/homepage.vue';
import refmenu from '@/components/ref/menu.vue';
import { useGlobalsStore, useUserStore } from '@/stores/index.js';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: home,
      meta: {
        title: "Home",
        auth: false
      }
    },
    {
      path: '/ref/calendar',
      name: 'calendar',
      components: {
        default: () => import('@/views/ref/calendar.vue'),
        sidebar: refmenu
      },
      meta: {
        title: "Calendar",
        auth: false
      }
    },
    {
      path: '/options/backgrounds',
      name: 'backgrounds',
      components: {
        default: () => import('@/views/character/backgrounds.vue')
      },
      meta: {
        title: "Backgrounds",
        auth: false
      }
    },
    {
      path: "/options/class",
      name: "classes",
      components: {
        default: () => import('@/views/character/class.vue')
      },
      meta: {
        title: "Character Classes",
        auth: false
      }
    },
    {
      path: "/options/class/:id",
      name: "specclass",
      components: {
        default: () => import('@/views/character/class.vue')
      },
      meta: {
        title: "Character Classes",
        auth: false
      }
    },
    {
      path: "/options/domains",
      name: "domains",
      components: {
        default: () => import('@/views/character/domains.vue')
      },
      meta: {
        title: "Domains",
        auth: false
      }
    },
    {
      path: "/options/feats",
      name: "feats",
      components: {
        default: () => import('@/views/character/feats.vue')
      },
      meta: {
        title: "Feats",
        auth: false
      }
    },
    {
      path: "/options/languages",
      name: "languages",
      components: {
        default: () => import('@/views/character/languages.vue')
      },
      meta: {
        title: "Languages",
        auth: false
      }
    },
    {
      path: "/options/races",
      name: "races",
      components: {
        default: () => import('@/views/character/races.vue')
      },
      meta: {
        title: "Character Races",
        auth: false
      }
    },
    {
      path: "/world/geography",
      name: "Geography",
      components: {
        default: () => import('@/views/world/geography.vue')
      },
      meta: {
        title: "Geography",
        auth: false
      }
    },
    {
      path: "/world/geography/:type/:name",
      name: "Geography Specifics",
      components: {
        default: () => import('@/views/world/geography.vue')
      },
      meta: {
        title: "Geography",
        auth: false
      }
    },
    /*{
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }*/
  ]
});

router.beforeEach((to, from, next) => {
  const store = useGlobalsStore();
  const user = useUserStore();
  if (to.meta.auth && !user.loggedin.token) {
    next({
      path: '/',
    });
  } else {
    window.dataLayer = window.dataLayer || [];
    //gtag('js', new Date());
    //gtag('config', 'UA-49438333-2');
    store.changeTitle(to.meta.title);
    next();
  }
});

export default router;
