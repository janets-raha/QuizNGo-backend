<template>
  <nav class="navbar navbar-expand navbar-dark bg-dark-theme">
    <div class="container">
      <div class="navbar-header mb-auto">
        <router-link class="navbar-brand" :to="{ path: '/' }">
          <img src="/qg_logo_short.png" alt="Qwiz&amp;Go" />
        </router-link>
      </div>
      <ul class="nav navbar-nav justify-content-end">
        <router-link
          v-if="isLoggedIn && notifCount"
          class="nav-item nav-link"
          :to="{ path: '/profile/favorites' }"
        >
          <div class="badge badge-light">{{ notifCount }}</div>
        </router-link>

        <router-link
          v-if="!isLoggedIn"
          class="nav-item nav-link"
          :to="{ name: 'Login' }"
          >Connexion</router-link
        >
        <router-link
          v-if="!isLoggedIn"
          class="nav-item nav-link"
          :to="{ name: 'Register' }"
          >Créer un compte</router-link
        >
        <router-link
          v-if="isLoggedIn"
          class="nav-item nav-link"
          :to="{ name: 'Profile' }"
          >Mon compte</router-link
        >
        <router-link
          v-if="isLoggedIn && isAdmin"
          class="nav-item nav-link"
          :to="{ name: 'Admin' }"
          >Admin</router-link
        >
        <a
          class="nav-item nav-link"
          v-if="isLoggedIn"
          @click.prevent="logout"
          href="#"
          >Déconnexion</a
        >
      </ul>
    </div>
  </nav>
</template>

<script>
//import User from "../apis/User";

export default {
  data() {
    return {
      isLoggedIn: true,
      isAdmin: true,
      user: null,
      notifCount: 0,
    };
  },
  xupdated() {
    if (this.isLoggedIn && !this.user) {
      User.auth().then((response) => {
        this.user = response.data;
        this.isAdmin = this.user.role == "admin";
      });
    }
  },
  xmounted() {
    this.$root.$on("login", () => {
      this.isLoggedIn = true;
    });

    this.isLoggedIn = !!localStorage.getItem("token");

    if (this.isLoggedIn) {
      User.auth().then((response) => {
        this.user = response.data;
        this.isAdmin = this.user.role == "admin";
      });
    }
  },
  xmethods: {
    logout() {
      localStorage.removeItem("token");
      this.user = null;
      this.isLoggedIn = false;
      this.isAdmin = false;
      this.$router.push({ name: "Home" });
    },
  },
};
</script>

<style>
.router-link-exact-active {
  color: #ffffff !important;
  transition: all 0.25s;
}
</style>
