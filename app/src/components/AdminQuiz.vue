<template>
  <b-container class="py-3">
    <b-button to="/newquiz" variant="success">Ajouter un Quiz</b-button>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      isLoggedIn: false,
      isAdmin: false,
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
