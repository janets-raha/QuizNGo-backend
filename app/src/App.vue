<template>
  <div class="bg-light">
    <NavBar
      :isLoggedIn="this.$store.getters.loggedIn"
      :isAdmin="this.$store.getters.isAdmin"
    />
    <router-view />
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";

export default {
  components: {
    NavBar,
  },
};
</script>
