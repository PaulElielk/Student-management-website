import { createWebHistory, createRouter } from "vue-router";
import Login from '../pages/Login.vue';
import Register from '../pages/Register.vue';
import Home from '../pages/Home.vue';
import Menu from '../pages/Menu.vue';
import Checkout from '../pages/Checkout.vue';
import AdminLogin from '../admin/AdminLogin.vue';
import AdminDashboard from '../admin/AdminDashboard.vue';
import Account from '../pages/Account.vue';
import UserQRCode from '../pages/UserQRCode.vue';
import VerifyStudent from '../pages/VerifyStudent.vue';
import SearchStudents from '../pages/SearchStudents.vue';
import AccountVerification from '../pages/AccountVerification.vue';

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home, 
  },
  
  {
    path: "/account",
    name: "Account",
    component: Account,
  },
  {
    path: "/user-qrcode",
    name: "UserQRCode",
    component: UserQRCode,
  },
  {
    path: "/menu",
    name: "Menu",
    component: Menu,
  },
  
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/checkout",
    name: "Checkout",
    component: Checkout,
  },
  
  {
    path: "/admin",
    redirect: "/admin/login"
  },
  {
    path: "/admin/login",
    name: "AdminLogin",
    component: AdminLogin,
  },
  {
    path: "/admin/dashboard",
    name: "AdminDashboard",
    component: AdminDashboard,
    meta: { requiresAuth: true }
  },
  {
    path: "/verify-student/:userId",
    name: "VerifyStudent",
    component: VerifyStudent,
  },
  {
    path: "/search-students",
    name: "SearchStudents",
    component: SearchStudents,
  },
  {
    path: '/account-verification/:id',
    name: 'AccountVerification',
    component: AccountVerification,
  },
  {
    path: '/:pathMatch(.*)*',
    component: Home,
    // https://stackoverflow.com/questions/68504803/how-can-i-make-a-catch-all-other-route-in-vue-router-also-catch-the-url-when-p
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;