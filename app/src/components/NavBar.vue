<template>
  <div>
    <!-- ***************************NEW NAVBAR ******************* -->
    <div>
      <b-navbar toggleable="lg" type="dark" variant="info">
        <b-navbar-brand href="#">
          <router-link class="navbar-brand" :to="{ path: '/' }">
            <img src="/qg_logo_short.png" alt="Qwiz&amp;Go" />
          </router-link>
        </b-navbar-brand>
        <b-navbar-nav>
          <b-nav-item href="#">Classement</b-nav-item>
        </b-navbar-nav>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <b-nav-item-dropdown right>
              <!-- Using 'button-content' slot -->

              <!--  NOT LOGGED-->

              <template v-if="!isLoggedIn" v-slot:button-content>
                Connexion
              </template>
              <template v-else v-slot:button-content> User </template>
              <div v-if="!isLoggedIn">
                <b-dropdown-item href="/admin">
                  <b-icon icon="box-arrow-in-right"></b-icon>
                  <router-link
                    class="text-decoration-none text-dark"
                    :to="{ name: 'Admin' }"
                  >
                    Login
                  </router-link>
                </b-dropdown-item>
                <b-dropdown-item href="/admin">
                  <b-icon icon="person-plus"></b-icon>
                  <router-link
                    class="text-decoration-none text-dark"
                    :to="{ name: 'Admin' }"
                  >
                    Register
                  </router-link>
                </b-dropdown-item>
              </div>
              <!-- END NOT LOGGED -->

              <!-- START LOGGED --->
              <div v-else>
                <b-dropdown-item href="/admin">
                  <b-icon icon="wrench"></b-icon>
                  <router-link
                    class="text-decoration-none text-dark"
                    :to="{ name: 'Admin' }"
                  >
                    Admin
                  </router-link>
                </b-dropdown-item>
                <b-dropdown-item href="#">
                  <b-icon icon="person-circle"></b-icon>
                  Dashboard
                </b-dropdown-item>
                <b-dropdown-item href="#">
                  <b-icon icon="box-arrow-right"></b-icon>
                  Logout
                </b-dropdown-item>
              </div>
              <!-- END LOGGED -->
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
    <!-- *********************END NAVBAR *******************-->

    <!--  <nav class="navbar navbar-expand navbar-dark bg-dark-theme">
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
    </nav> -->
  </div>
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
