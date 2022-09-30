import { createRouter, createWebHistory } from "vue-router";
import login from "../views/login.vue";
import Home from "../views/Home.vue";
import Dashboard from "../views/Dashboard.vue";
import Search from "../views/Search.vue";
import List from "../views/List.vue";
import LoginStatus from "../views/LoginStatus.vue";
import Edit from "../views/Edit.vue";

const routes = [
  {
    path: "/",
    name: "Login",
    component: login,
  },
  {
    path: "/homepage",
    name: "HomePage",
    component: Home,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/search",
    name: "Search",
    component: Search,
  },
  {
    path: "/list",
    name: "List",
    component: List,
  },
  {
    path: "/loginstatus/:uid",
    name: "LoginStatus",
    component: LoginStatus,
  },
  {
    path: "/edit/:id",
    name: "Edit",
    component: Edit,
  },
  {
    path: "/admin",
    name: "admin",
    component: () => import("../views/Admin.vue"),
    children: [
      {
        path: "memberList",
        component: () => import("../components/ManageUnit.vue"),
      },
      // {
      //   path: "admin/editList",
      //   component: () => import("../views/EditMemberList.vue"),
      // },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
