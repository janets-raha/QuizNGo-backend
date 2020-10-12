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
                <b-dropdown-item href="/login">
                  <b-icon icon="box-arrow-in-right"></b-icon>
                  <router-link
                    class="text-decoration-none text-dark"
                    :to="{ name: 'Login' }"
                  >
                    Login
                  </router-link>
                </b-dropdown-item>
                <b-dropdown-item href="/register">
                  <b-icon icon="person-plus"></b-icon>
                  <router-link
                    class="text-decoration-none text-dark"
                    :to="{ name: 'Register' }"
                  >
                    Register
                  </router-link>
                </b-dropdown-item>
              </div>
              <!-- END NOT LOGGED -->

              <!-- START LOGGED --->
              <div v-if="isLoggedIn && isAdmin">
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
    };
  },
  updated() {
    if (this.isLoggedIn && !this.user) {
      User.auth().then((response) => {
        this.user = response.data;
        this.isAdmin = this.user.role == "admin";
      });
    }
  },
  mounted() {
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
  methods: {
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
