import { DASHBOARD_PATH } from "./paths";

export default [
  {
    component: () => import("./../views/DashboardView.vue"),
    name: "dashboard",
    path: DASHBOARD_PATH
  }
];
