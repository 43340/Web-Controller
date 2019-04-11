import Vue from "vue";
import Router from "vue-router";
import store from "./store.js";
import Home from "./views/Home.vue";
import About from "./views/About.vue";
import Login from "./components/Login.vue";
import Secure from "./components/Secure.vue";
import Register from "./components/Register.vue";
import NewProcess from "./components/NewProcess.vue";
import Records from "./components/Records.vue";
import Current from "./components/Current.vue";
import Detail from "./components/Details.vue";
import Users from "./components/Users.vue";
import AllRecords from "./components/AllRecords.vue";

Vue.use(Router);

let router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/login",
      name: "login",
      component: Login,
      meta: {
        loggedOut: true
      }
    },
    {
      path: "/register",
      name: "register",
      component: Register
    },
    {
      path: "/secure",
      name: "secure",
      component: Secure,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/new",
      name: "newprocess",
      component: NewProcess,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/records",
      name: "records",
      component: Records,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/current",
      name: "current",
      component: Current,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/detail/:id",
      name: "detail",
      component: Detail,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/users",
      name: "users",
      component: Users,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/allrecords",
      name: "allrecords",
      component: AllRecords,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/about",
      name: "about",
      component: About
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next();
      return;
    }
    next("/login");
  } else {
    next();
  }
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.loggedOut)) {
    if (!store.getters.isLoggedIn) {
      next();
      return;
    }
    next("/");
  } else {
    next();
  }
});

export default router;
