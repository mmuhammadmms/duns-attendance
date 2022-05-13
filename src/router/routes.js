const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        name: "Dewan Undangan Negeri Sabah",
        component: () => import("pages/Index.vue"),
      },
      {
        path: "/login",
        name: "Login",
        component: () => import("pages/Login.vue"),
      },
      {
        path: "/register",
        name: "Register",
        component: () => import("pages/Register.vue"),
      },
      {
        path: "/scan",
        name: "Scan QR Code",
        component: () => import("pages/Scan.vue"),
      },
      {
        path: "/home",
        name: "Home",
        component: () => import("pages/Home.vue"),
      },
      {
        path: "/list",
        name: "List",
        component: () => import("pages/List.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "*",
    component: () => import("pages/Error404.vue"),
  },
];

export default routes;
