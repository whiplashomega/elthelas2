import Vue from 'vue';
import Router from 'vue-router';
import homepage from '../components/homepage';
import calendar from '../components/ref/calendar';
import store from '../model';
import refmenu from '../components/ref/menu';
import astronomy from '../components/ref/astronomy';
import magic from '../components/ref/magic';
import cosmology from '../components/ref/cosmology';
import bestiary from '../components/ref/bestiary';
import runner from '../components/ref/runner';
import quick from '../components/ref/quick';
import gods from '../components/ref/gods';
import divines from '../components/ref/divines';
import organizations from '../components/ref/organizations';
import history from '../components/history';
import geography from '../components/geography';
import backgrounds from '../components/options/backgrounds';
import options from '../components/options/menu';
import races from '../components/options/races';
import classes from '../components/options/class';
import domains from '../components/options/domains';
import languages from '../components/options/languages';
import book4guide from '../components/tools/book4guide';
import book4 from '../components/tools/book4';
import book4menu from '../components/tools/book4menu';
import charbuilder from '../components/tools/characterbuilder';
import npcgen from '@/components/tools/npcgenerator';
import feats from '@/components/options/feats';
import privacy from '@/components/privacy';
import encounterbuilder from '@/components/tools/encounterbuilder';
import randomencounters from '@/components/tools/randomencounters';
import encounterdetails from '@/components/tools/encounterdetails';
import treasuregenerator from '@/components/tools/treasuregenerator';

Vue.use(Router);

var router = new Router({
  routes: [
    {
      name: 'home',
      meta: {
        title: 'Home'
      },
      path: '/',
      components: {
        default: homepage
      }
    },
    {
      name: 'calendar',
      meta: {
        title: 'Calendar'
      },
      path: '/ref/calendar',
      components: {
        default: calendar,
        sidebar: refmenu
      }
    },
    {
      name: 'astronomy',
      meta: {
        title: "Astronomy"
      },
      path: '/ref/astronomy',
      components: {
        default: astronomy,
        sidebar: refmenu
      }
    },
    {
      name: 'magic',
      meta: {
        title: "Magic"
      },
      path: '/ref/magic',
      components: {
        default: magic,
        sidebar: refmenu
      }
    },
    {
      name: 'cosmology',
      meta: {
        title: "Cosmology"
      },
      path: '/ref/cosmology',
      components: {
        default: cosmology,
        sidebar: refmenu
      }
    },
    {
      name: 'bestiary',
      meta: {
        title: "Bestiary"
      },
      path: '/ref/bestiary',
      components: {
        default: bestiary,
        sidebar: refmenu
      }
    },
    {
      name: 'gods',
      meta: {
        title: "Gods"
      },
      path: '/ref/gods',
      components: {
        default: gods,
        sidebar: refmenu
      }
    },
    {
      name: 'godsdynamic',
      meta: {
        title: "Gods"
      },
      path: '/ref/gods/:god',
      components: {
        default: gods,
        sidebar: refmenu
      }
    },
    {
      name: 'runner',
      meta: {
        title: "Encounter Runner",
        auth: true
      },
      path: '/runner',
      components: {
        default: runner
      }
    },
    {
      name: 'runnerdynamic',
      meta: {
        title: "Encounter Runner",
        auth: true
      },
      path: '/runner/:encounter',
      components: {
        default: runner
      }
    },
    {
      name: 'quick',
      meta: {
        title: "Quick Reference Manual"
      },
      path: '/ref/quick',
      components: {
        default: quick
      }
    },
    {
      name: 'divines',
      meta: {
        title: 'Divine Beings'
      },
      path: '/ref/divines',
      components: {
        default: divines,
        sidebar: refmenu
      }
    },
    {
      name: 'organizations',
      meta: {
        title: "Important Organizations"
      },
      path: '/ref/orgs',
      components: {
        default: organizations,
        sidebar: refmenu
      }
    },
    {
      name: 'orgsdynamic',
      meta: {
        title: "Important Organizations"
      },
      path: '/ref/orgs/:org',
      components: {
        default: organizations,
        sidebar: refmenu
      }
    },
    {
      name: 'history',
      meta: {
        title: "History of Elthelas"
      },
      path: '/history',
      components: {
        default: history
      }
    },
    {
      name: 'geography',
      meta: {
        title: 'Geography of Elthelas'
      },
      path: '/geo',
      components: {
        default: geography
      }
    },
    {
      name: "geographydetails",
      meta: {
        title: "Geography of Elthelas"
      },
      path: '/geo/:type/:name',
      components: {
        default: geography
      }
    },
    {
      name: "backgrounds",
      meta: {
        title: "Backgrounds"
      },
      path: '/options/backgrounds',
      components: {
        default: backgrounds,
        sidebar: options
      }
    },
    {
      name: "races",
      meta: {
        title: "Races"
      },
      path: '/options/races',
      components: {
        default: races,
        sidebar: options
      }
    },
    {
      name: "classes",
      meta: {
        title: "Classes"
      },
      path: '/options/class',
      components: {
        default: classes,
        sidebar: options
      }
    },
    {
      name: "domains",
      meta: {
        title: "Domains"
      },
      path: '/options/domains',
      components: {
        default: domains,
        sidebar: options
      }
    },
    {
      name: "languages",
      meta: {
        title: "Languages"
      },
      path: '/options/languages',
      components: {
        default: languages,
        sidebar: options
      }
    },
    {
      name: "book4",
      meta: {
        title: "Epic of Elthelas: Book 4",
        auth: true
      },
      path: '/tools/book4/dm/:chapter',
      components: {
        default: book4,
        sidebar: book4menu
      }
    },
    {
      name: "book4guide",
      meta: {
        title: "Epic of Elthelas Book 4 Players Guide"
      },
      path: '/tools/book4/playersguide',
      components: {
        default: book4guide,
        sidebar: options
      }
    },
    {
      name: "characterbuilder",
      meta: {
        title: "Character Builder"
      },
      path: '/tools/charbuilder',
      components: {
        default: charbuilder
      }
    },
    {
      name: "npcgen",
      meta: {
        title: "NPC Generator"
      },
      path: '/tools/npcgen',
      components: {
        default: npcgen
      }
    },
    {
      name: "feats",
      meta: {
        title: "Feats"
      },
      path: "/options/feats",
      components: {
        default: feats,
        sidebar: options
      }
    },
    {
      name: "privacy",
      meta: {
        title: "Privacy Policy"
      },
      path: "/privacy-policy",
      components: {
        default: privacy
      }
    },
    {
      name: "encounterbuilder",
      meta: {
        title: "Encounter Builder"
      },
      path: "/encounter/builder",
      components: {
        default: encounterbuilder
      }
    },
    {
      name: "randomencounters",
      meta: {
        title: "Random Encounter Table"
      },
      path: "/encounter/random",
      components: {
        default: randomencounters
      }
    },
    {
      name: "encounterdetails",
      meta: {
        title: "Encounter Details"
      },
      path: "/encounter/details",
      components: {
        default: encounterdetails
      }
    },
    {
      name: "encounterdetailspreload",
      meta: {
        title: "Encounter Details"
      },
      path: "/encounter/details/:id",
      components: {
        default: encounterdetails
      }
    },
    {
      name: "treasuregenerator",
      meta: {
        title: "Treasure Generator"
      },
      path: "/tools/treasuregenerator",
      components: {
        default: treasuregenerator
      }
    }
  ],
  mode: 'history'
});
router.beforeEach((to, from, next) => {
  if (to.meta.auth && !store.state.auth.loggedin) {
    next({
      path: '/',
      query: {
        redirect: to.fullPath
      }
    });
  } else {
    window.dataLayer = window.dataLayer || [];
    gtag('js', new Date());
    gtag('config', 'UA-49438333-2');
    store.dispatch('changeTitle', to.meta.title);
    next();
  }
});

function gtag() { window.dataLayer.push(arguments); }

export default router;
