import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Register from "../views/Register.vue";
import Login from "../views/Login.vue";
//import Profile from "../views/Profile.vue";
//import AdminUsers from "../components/AdminUsers.vue";
import AdminQuiz from "../components/AdminQuiz.vue";
import Quiz from "../components/Quiz.vue";
import EditQuiz from "../components/EditQuiz.vue";
import Admin from "../views/Admin.vue";
//import MyAccount from "../components/MyAccount.vue";
//import Favorites from "../components/Favorites.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
   {
    path: "/register",
    name: "Register",
    component: Register
  }, 
  {
    path: "/newquiz",
    name: "NewQuiz",
    component: EditQuiz,
  },
  {
    path: "/editquiz/:quiz_id",
    name: "EditQuiz",
    component: EditQuiz,
  },
   {
    path: "/login",
    name: "Login",
    component: Login,
  }/*,  {
    path: "/editconcert/:concertId",
    name: "EditConcert",
    component: EditConcert
  }, */,
  /* {
    path: "/ticket/:concertId",
    name: "Ticket",
    component: Ticket
  }, */
  {
    path: "/admin",
    component: Admin,
    children: [
      {
        name: "Admin",
        path: "",
        component: AdminQuiz,
      } /*
      {
        name: "Quiz",
        path: "quiz",
        component: AddQuiz,
      }  ,
      {
        name: "AdminConcerts",
        path: "admin-concerts",
        component: AdminConcerts
      },
      {
        path: "/stats",
        name: "AdminStats",
        component: AdminStats
      } ,*/,
    ],
  },
  /* {
    path: "/profile",
    component: Profile,
    children: [
      {
        name: "Profile",
        path: "",
        component: MyAccount
      },
      {
        name: "Favorites",
        path: "favorites",
        component: Favorites
      },
      {
        path: "tickets",
        name: "Tickets",
        component: Tickets
      }
    ]
  }, */
  /* {
    path: "/my-ticket/:ticketId",
    name: "RecapTicket",
    component: RecapTicket
  } */
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
