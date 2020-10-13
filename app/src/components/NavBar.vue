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
              <template v-if="!isLoggedIn" v-slot:button-content>
                Connexion
              </template>
              <template v-else v-slot:button-content>
                {{ loggedName }}
              </template>

              <!--  NOT LOGGED-->
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
              <div v-if="isLoggedIn">
                <b-dropdown-item v-if="isAdmin" href="/admin">
                  <b-icon icon="wrench"></b-icon>
                  <router-link
                    class="text-decoration-none text-dark"
                    :to="{ name: 'Admin' }"
                  >
                    Admin
                  </router-link>
                </b-dropdown-item>
                <b-dropdown-item href="/dashboard">
                  <b-icon icon="person-circle"></b-icon>
                  Dashboard
                </b-dropdown-item>
                <b-dropdown-item @click.prevent="logout" href="#">
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
import User from "../apis/User";

export default {
  data() {
    return {
      //isLoggedIn: true,
      //isAdmin: true,
      user: this.$store.state.user || null,
    };
  },

  props: {
    isLoggedIn: Boolean,
    isAdmin: Boolean,
  },

  computed: {
    loggedName() {
      if (this.$store.state.user) {
        return this.$store.state.user.name;
      } else {
        return "User";
      }
    },
  },

  /*   xupdated() {
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
  }, */

  methods: {
    logout() {
      console.log("out");
      localStorage.removeItem("token");
      this.$store.commit("setToken", null);
      this.$store.commit("setStatus", null);
      this.$store.commit("setUser", null);
      //this.user = null;
      //this.isLoggedIn = false;
      //this.isAdmin = false;
      this.$router.push("/");
    },

    getAuth() {
      this.$root.$on("login", () => {
        this.isLoggedIn = true;
      });

      this.isLoggedIn = !!localStorage.getItem("token");

      if (this.isLoggedIn) {
        User.auth().then((response) => {
          //console.log(response.data);
          //localStorage.setItem("user", response.data);
          this.$store.commit("setUser", response.data);
          this.$store.state.user = response.data;
          //this.$store.commit("setUser", localStorage.getItem("user"));
          this.$store.commit("setStatus", response.data.role);
          this.$store.state.status = response.data.role;
          //localStorage.setItem("role", response.data.role);
          //this.user = response.data;
          //this.isAdmin = this.user.role == "admin";
        });
      }
    },
  },

  beforeMount() {
    //console.log("nav before");
    this.getAuth();
  },

  updated() {
    if (this.$props.isLoggedIn && !this.user) {
      //console.log("updated navbarr");
      this.getAuth();
    }
  },
};
</script>

<style>
.router-link-exact-active {
  color: #ffffff !important;
  transition: all 0.25s;
}
</style>
