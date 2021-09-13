import Vue from "vue";
import Router from "vue-router";
import Dashboard from "./pages/Dashboard.vue";

Vue.use(Router);
let router = new Router({
  routes: [
    {
      path: "/",
      name: "dashboard",
      component: Dashboard,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/candidates",
      name: "Candidates",
      meta: {
        requiresAuth: true,
      },
      component: () => import("./pages/Candidates.vue"),
    },
    {
      path: "/settings",
      name: "Settings",
      meta: {
        requiresAuth: true,
      },
      component: () => import("./pages/Settings.vue"),
    },
    {
      path: "/cert",
      name: "cert",
      meta: {
        requiresAuth: true,
      },
      component: () => import("./pages/Certificate.vue"),
    },
    {
      path: "/period",
      name: "Period",
      meta: {
        requiresAuth: true,
      },
      component: () => import("./pages/Period.vue"),
    },
    {
      path: "/students",
      name: "Students",
      meta: {
        requiresAuth: true,
      },
      component: () => import("./pages/Student.vue"),
    },
    {
      path: "/vote",
      name: "Vote",
      meta: {
        requiresAuth: true,
      },
      component: () => import("./pages/Vote.vue"),
    },
   
    {
      path: "/login",
      name: "login",
      meta: {
        requiresAuth: false,
      },
      component: () => import("./pages/Login.vue"),
    },
    {
      path: "/votos/estudiantes",
      name: "students",
      meta: {
        requiresAuth: true,
      },
      component: () => import("./pages/Student.vue"),
    },
    {
      path: "/votar",
      name: "votes",
      meta: {
        requiresAuth: true,
      },
      component: () => import("./pages/Vote.vue"),
    },
  ],

  scrollBehavior() {
    return {
      x: 0,
      y: 0,
    };
  },
});

router.beforeEach((to, from, next) => {
  //If current route need Auth.
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    //Verify jwt
    if (!sessionStorage.getItem("jwt")) {
      next({
        path: "/login",
        params: {
          nextUrl: to.fullPath,
        },
      });
    } else {
      next();
    }
  }
  else {
    next();
  }
});
export default router;
