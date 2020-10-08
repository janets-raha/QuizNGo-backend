<template>
  <b-container class="py-3">
    <b-button to="/newquiz" variant="success">Ajouter un Quiz</b-button>

    <!--Labels -->
    <b-row no-gutter id="labels" class="text-center" align-v="center">
      <b-col>
        <strong> Titre </strong>
      </b-col>
      <b-col>
        <strong> Techno </strong>
      </b-col>
      <b-col>
        <strong> Difficulté </strong>
      </b-col>
      <b-col> </b-col>
      <b-col> </b-col>
    </b-row>

    <!--Cards -->
    <div v-for="(quiz, idx) in quizz" :key="idx">
      <b-row no-gutter id="quizCard" class="text-center" align-v="center">
        <b-col>
          <strong>
            {{ quiz.name }}
          </strong>
        </b-col>
        <b-col>
          {{ quiz.category.name }}
        </b-col>
        <b-col v-if="quiz.difficulty === 'Facile'" class="h1">
          <b-icon icon="reception1" variant="success" class="mr-1"></b-icon>
        </b-col>
        <b-col v-if="quiz.difficulty === 'Moyen'" class="h1">
          <b-icon icon="reception2" variant="warning" class="mr-1"></b-icon>
        </b-col>
        <b-col v-if="quiz.difficulty === 'Difficile'" class="h1">
          <b-icon icon="reception3" variant="danger" class="mr-1"></b-icon>
        </b-col>
        <b-col>
          <b-button variant="warning" class="btn-block">
            <b-icon icon="pencil" variant="dark" class="mr-1"></b-icon>
            Modifier
          </b-button>
        </b-col>
        <b-col v-if="quiz.is_published === true">
          <b-button variant="success" class="btn-block">
            <b-icon icon="box-arrow-up" variant="light" class="mr-1"></b-icon>
            Publier
          </b-button>
        </b-col>
        <b-col v-else>
          <b-button variant="outline-success" class="btn-block">
            <b-icon
              icon="box-arrow-in-down"
              variant="success"
              class="mr-1"
            ></b-icon>
            Dépublier
          </b-button>
        </b-col>
      </b-row>
    </div>
  </b-container>
</template>

<script>
import AdminQuiz from "../apis/AdminQuiz";
export default {
  data() {
    return {
      isLoggedIn: false,
      isAdmin: false,
      user: null,
      notifCount: 0,
      quizz: [],
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
  mounted() {
    AdminQuiz.getQuizzes().then((response) => {
      this.quizz = response.data;
    });
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

<style scoped>
#quizCard {
  margin-top: 10px;
  border: 1px solid #498824;
  border-radius: 10px;
  vertical-align: middle;
}

#labels {
  margin-top: 20px;
}
</style>