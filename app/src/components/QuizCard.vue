<template>
  <div class="QuizCard my-3 shadow">
    <b-card style="max-width: 25rem; min-width: 20rem">
      <b-card-text class="d-flex justify-content-between">
        <div>
          <h3>{{ quiz.name }}</h3>
          <h6>{{ quiz.category.name }}</h6>
        </div>
        <div>
          <p>{{ quiz.avg_rating }}</p>
          <b-icon
            icon="heart"
            class="pointer"
            @click="addFav(quiz.id)"
          ></b-icon>
        </div>
      </b-card-text>

      <b-card-text class="d-flex justify-content-between">
        <div><b-icon icon="alarm-fill"></b-icon> {{ quiz.bonus_time }} min</div>
        <div>{{ quiz.difficulty }}</div>
      </b-card-text>
    </b-card>
  </div>
</template>

<script>
import { userInfo } from "os";
import User from "../apis/User";

export default {
  data() {
    return {
      userId: this.$store.state.user.id,
    };
  },
  props: {
    quiz: Object,
  },

  computed: {},

  methods: {
    addFav(id) {
      //alert("quiz " + id + " ajouté aux favoris");
      //console.log(this.userId);
      this.$store.state.user.favorites.push(id);
      console.log("nexFav", this.$store.state.user.favorites);
      User.saveFavorites(
        this.userId,
        this.$store.state.user.favorites
      ).then((response) => console.log("fav", response));
    },
  },
};
</script>
