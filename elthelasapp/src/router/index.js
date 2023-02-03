import { createRouter, createWebHistory } from "vue-router";
import home from "@/views/homepage.vue";
import { useGlobalsStore, useUserStore } from "@/stores/index.js";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: home,
      meta: {
        title: "Home",
        auth: false,
      },
    },
    {
      path: "/privacy-policy",
      name: "privacy",
      components: {
        default: () => import("@/views/privacy.vue"),
      },
      meta: {
        title: "Privacy Policy",
        auth: false,
      },
    },
    {
      path: "/world/calendar",
      name: "calendar",
      components: {
        default: () => import("@/views/world/calendar.vue"),
      },
      meta: {
        title: "Calendar",
        auth: false,
      },
    },
    {
      path: "/options/backgrounds",
      name: "backgrounds",
      components: {
        default: () => import("@/views/character/backgrounds.vue"),
      },
      meta: {
        title: "Backgrounds",
        auth: false,
      },
    },
    {
      path: "/options/class",
      name: "classes",
      components: {
        default: () => import("@/views/character/class.vue"),
      },
      meta: {
        title: "Character Classes",
        auth: false,
      },
    },
    {
      path: "/options/class/:id",
      name: "specclass",
      components: {
        default: () => import("@/views/character/class.vue"),
      },
      meta: {
        title: "Character Classes",
        auth: false,
      },
    },
    {
      path: "/options/domains",
      name: "domains",
      components: {
        default: () => import("@/views/character/domains.vue"),
      },
      meta: {
        title: "Domains",
        auth: false,
      },
    },
    {
      path: "/options/feats",
      name: "feats",
      components: {
        default: () => import("@/views/character/feats.vue"),
      },
      meta: {
        title: "Feats",
        auth: false,
      },
    },
    {
      path: "/options/languages",
      name: "languages",
      components: {
        default: () => import("@/views/character/languages.vue"),
      },
      meta: {
        title: "Languages",
        auth: false,
      },
    },
    {
      path: "/options/ancestry",
      name: "ancestry",
      components: {
        default: () => import("@/views/character/ancestry.vue"),
      },
      meta: {
        title: "Character Ancestries",
        auth: false,
      },
    },
    {
      path: "/world/geography",
      name: "Geography",
      components: {
        default: () => import("@/views/world/geography.vue"),
      },
      meta: {
        title: "Geography",
        auth: false,
      },
    },
    {
      path: "/world/geography/:type/:name",
      name: "Geography Specifics",
      components: {
        default: () => import("@/views/world/geography.vue"),
      },
      meta: {
        title: "Geography",
        auth: false,
      },
    },
    {
      path: "/tools/charbuilder",
      name: "Character Builder",
      components: {
        default: () => import("@/views/character/characterbuilder.vue"),
      },
      meta: {
        title: "Character Builder",
        auth: false,
      },
    },
    {
      path: "/tools/charbuilder/:id",
      name: "Character Builder - Specific",
      components: {
        default: () => import("@/views/character/characterbuilder.vue"),
      },
      meta: {
        title: "Character Builder",
        auth: false,
      },
    },
    {
      path: "/world/historylist",
      name: "Timeline - Simple",
      components: {
        default: () => import("@/views/world/historylist.vue"),
      },
      meta: {
        title: "Timeline",
        auth: false,
      },
    },
    {
      path: "/ref/combat",
      name: "Combat",
      components: {
        default: () => import("@/views/ref/combat.vue"),
      },
      meta: {
        title: "Combat",
        auth: false,
      },
    },
    {
      path: "/ref/rules",
      name: "Rules",
      components: {
        default: () => import("@/views/ref/rules.vue"),
      },
      meta: {
        title: "Rules",
        auth: false,
      },
    },
    {
      path: "/ref/equipment",
      name: "Equipment",
      components: {
        default: () => import("@/views/ref/equipment.vue"),
      },
      meta: {
        title: "Equipment",
        auth: false,
      },
    },
    {
      path: "/world/cosmology",
      name: "Cosmology",
      components: {
        default: () => import("@/views/world/cosmology.vue"),
      },
      meta: {
        title: "Cosmology",
        auth: false,
      },
    },
    {
      path: "/world/astronomy",
      name: "Astronomy",
      components: {
        default: () => import("@/views/world/astronomy.vue"),
      },
      meta: {
        title: "Astronomy",
        auth: false,
      },
    },
    {
      path: "/ref/magic",
      name: "Magic",
      components: {
        default: () => import("@/views/ref/magic.vue"),
      },
      meta: {
        title: "Magic",
        auth: false,
      },
    },
    {
      path: "/ref/gods",
      name: "The Gods",
      components: {
        default: () => import("@/views/ref/gods.vue"),
      },
      meta: {
        title: "The Gods",
        auth: false,
      },
    },
    {
      path: "/ref/gods/:god",
      name: "The Gods - Specific",
      components: {
        default: () => import("@/views/ref/gods.vue"),
      },
      meta: {
        title: "The Gods",
        auth: false,
      },
    },
    {
      path: "/ref/divines",
      name: "The Divines",
      components: {
        default: () => import("@/views/ref/divines.vue"),
      },
      meta: {
        title: "The Divines",
        auth: false,
      },
    },
    {
      path: "/world/orgs",
      name: "Multinational Organizations and Factions",
      components: {
        default: () => import("@/views/world/organizations.vue"),
      },
      meta: {
        title: "Multinational Organizations and Factions",
        auth: false,
      },
    },
    {
      path: "/world/orgs/:org",
      name: "Multinational Organizations and Factions - Specific",
      components: {
        default: () => import("@/views/world/organizations.vue"),
      },
      meta: {
        title: "Multinational Organizations and Factions",
        auth: false,
      },
    },
    {
      path: "/campaign",
      name: "Campaign Builder",
      components: {
        default: () => import("@/views/campaign/campaign.vue"),
      },
      meta: {
        title: "Campaign Builder",
        auth: true,
      },
    },
    {
      path: "/campaign/:campaign",
      name: "Campaign Builder - Specific",
      components: {
        default: () => import("@/views/campaign/campaign.vue"),
      },
      meta: {
        title: "Campaign Builder",
        auth: true,
      },
    },
    {
      path: "/tools/creaturebuilder",
      name: "Creature Creator",
      components: {
        default: () => import("@/views/campaign/creaturebuilder.vue"),
      },
      meta: {
        title: "Creature Builder",
        auth: true,
      },
    },
    {
      path: "/tools/creaturebuilder/:id",
      name: "Creature Editor",
      components: {
        default: () => import("@/views/campaign/creaturebuilder.vue"),
      },
      meta: {
        title: "Creature Editor",
        auth: true,
      },
    },
    {
      path: "/tools/runner",
      name: "Encounter Runner",
      components: {
        default: () => import("@/views/campaign/runner.vue"),
      },
      meta: {
        title: "Encounter Runner",
        auth: true,
      },
    },
    {
      path: "/tools/runner/:id",
      name: "Encounter Runner - Specific",
      components: {
        default: () => import("@/views/campaign/runner.vue"),
      },
      meta: {
        title: "Encounter Runner",
        auth: true,
      },
    },
    {
      path: "/ref/bestiary",
      name: "Bestiary",
      components: {
        default: () => import("@/views/ref/bestiary.vue"),
      },
      meta: {
        title: "Bestiary",
        auth: true,
      },
    },
    {
      path: "/tools/treasuregenerator",
      name: "Treasure Generator",
      components: {
        default: () => import("@/views/campaign/treasuregenerator.vue"),
      },
      meta: {
        title: "Treasure Generator",
        auth: false,
      },
    },
    {
      path: "/tools/strongholdbuilder",
      name: "Stronghold Builder",
      components: {
        default: () => import("@/views/campaign/strongholdbuilder.vue"),
      },
      meta: {
        title: "Stronghold Builder",
        auth: false,
      },
    },
    {
      path: "/options/create",
      name: "Character Creation",
      components: {
        default: () => import("@/views/character/create.vue")
      },
      meta: {
        title: "Character Creation",
        auth: false
      }
    },
    {
      path: "/ref/srd",
      name: "System Reference Document",
      components: {
        default: () => import("@/views/ref/srdhome.vue")
      },
      meta: {
        title: "System Reference Document",
        auth: false
      }
    },
    {
      path: "/ref/adventuring",
      name: "Adventuring",
      components: {
        default: () => import("@/views/ref/adventuring.vue")
      },
      meta: {
        title: "Adventuring",
        auth: false
      }
    },
    {
      path: "/options/alignment",
      name: "Alignment",
      components: {
        default: () => import("@/views/character/alignment.vue")
      },
      meta: {
        title: "Alignment",
        auth: false
      }
    },
    {
      path: "/ref/rules",
      name: "Other Rules",
      components: {
        default: () => import("@/views/ref/rules.vue")
      },
      meta: {
        title: "Other Rules",
        auth: false
      }
    },
    {
      path: "/ref/abilities",
      name: "Abilities",
      components: {
        default: () => import("@/views/ref/abilities.vue")
      },
      meta: {
        title: "Abilities",
        auth: false
      }
    },
    {
      path: "/ref/gmrules",
      name: "GM Rules",
      components: {
        default: () => import("@/views/ref/gmrules.vue")
      },
      meta: {
        title: "GM Rules",
        auth: false
      }
    },
    {
      path: "/5e/homebrew",
      name: "Homebrew Rules",
      components: {
        default: () => import("@/views/5e/homebrew.vue"),
      },
      meta: {
        title: "Homebrew Rules at My Table",
        auth: false,
      },
    },
    {
      path: "/5e/quick",
      name: "5e Quick Reference Manual",
      components: {
        default: () => import("@/views/5e/quick.vue"),
      },
      meta: {
        title: "5e Quick Reference Manual",
        auth: false,
      },
    },
    {
      path: "/5e/class",
      name: "5e Classes",
      components: {
        default: () => import("@/views/5e/class.vue"),
      },
      meta: {
        title: "5e Character Classes",
        auth: false,
      },
    },
    {
      path: "/5e/races",
      name: "5e Races",
      components: {
        default: () => import("@/views/5e/races.vue"),
      },
      meta: {
        title: "Character Ancestries",
        auth: false,
      },
    },
    {
      path: "/5e/charbuilder",
      name: "5e Character Builder",
      components: {
        default: () => import("@/views/5e/characterbuilder.vue"),
      },
      meta: {
        title: "5e Character Builder",
        auth: false,
      },
    },
    {
      path: "/5e/charbuilder/:id",
      name: "5e Character Builder - Specific",
      components: {
        default: () => import("@/views/5e/characterbuilder.vue"),
      },
      meta: {
        title: "5e Character Builder",
        auth: false,
      },
    },
    {
      path: "/5e/feats",
      name: "5e feats",
      components: {
        default: () => import("@/views/5e/feats.vue"),
      },
      meta: {
        title: "5e Feats",
        auth: false,
      },
    },
    {
      path: "/5e/runner",
      name: "5e Encounter Runner",
      components: {
        default: () => import("@/views/5e/runner.vue"),
      },
      meta: {
        title: "Encounter Runner",
        auth: true,
      },
    },
    {
      path: "/5e/runner/:id",
      name: "5e Encounter Runner - Specific",
      components: {
        default: () => import("@/views/5e/runner.vue"),
      },
      meta: {
        title: "Encounter Runner",
        auth: true,
      },
    },
    {
      path: "/5e/magicitems",
      name: "Magic Item Catalog",
      components: {
        default: () => import("@/views/5e/magicitemcatalog.vue"),
      },
      meta: {
        title: "Margo's Mystics",
        auth: false,
      },
    },
    /*{
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }*/
  ],
});

router.beforeEach((to, from, next) => {
  const store = useGlobalsStore();
  const user = useUserStore();
  if (to.meta.auth && !user.loggedin.token) {
    next({
      path: "/",
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
