<template>
  <b-container class="pt-2  mb-4 h-100">
    <b-row no-gutters align-v="baseline" class=" justify-content-between mb-2 ">
      <b-col md="4" class=" h5">
        <strong>
          {{ quiz.name }}
        </strong>
      </b-col>
      <b-col md="4" class=" h5 text-center">
        Techno : {{ quiz.category.name }}
      </b-col>
      <b-col md="4" class="d-flex justify-content-end">
        <b-icon
          v-if="quiz.difficulty === 'Facile'"
          icon="reception1"
          variant="success"
          class="mr-3  h1"
        ></b-icon>
        <b-icon
          v-if="quiz.difficulty === 'Moyen'"
          icon="reception2"
          variant="warning"
          class="mr-3  h1"
        ></b-icon>
        <b-icon
          v-if="quiz.difficulty === 'Difficile'"
          icon="reception3"
          variant="danger"
          class="mr-3 mt-1  h1"
        ></b-icon>
        <div class="pt-3 h5  mr-3">
          <b-icon icon="stopwatch" variant="primary"></b-icon>
          {{ quiz.bonus_time }} min
        </div>
        <div class="pt-3 h5 ">
          <b-icon icon="award" variant="primary"></b-icon>+
          {{ quiz.bonus_xp }} pts
        </div>
      </b-col>
    </b-row>
    <div class="timer">
      <h3>
        {{ chrono | moment("mm:ss") }}
      </h3>
    </div>
    <div
      v-if="!running"
      class="scroll-zone text-center d-flex flex-column justify-content-center"
      vertical-align="center"
    >
      <b-button pill variant="success" size="lg" @click="startQuiz" class="mx-5"
        >Start Quiz</b-button
      >
    </div>
    <div v-if="running" class="scroll-zone">
      <b-overlay :show="showOverlay" rounded="sm" class="overlay-zone">
        <div
          v-for="(question, q_index) in questions"
          :key="q_index"
          class="shadow"
        >
          <b-card no-body>
            <b-card-header class="p-0 bg-light">
              <div class="d-flex justify-content-between pt-2 pb-2 px-2">
                <h5 class="mb-0">Question {{ q_index + 1 }}</h5>
                <h5 class="text-nowrap mb-0">
                  {{ questions[q_index].xps }} points
                </h5>
              </div>
            </b-card-header>
            <b-card-body class="h-100 overflow-auto">
              <strong>
                <div class="my-2">{{ questions[q_index].question }}</div>
              </strong>
              <div v-if="isMulti(questions[q_index].answers)">
                <div
                  v-for="(answer, a_index) in questions[q_index].answers"
                  :key="a_index"
                >
                  <div class="ml-1 p-1">
                    <b-form-checkbox
                      v-model="answers[q_index][a_index]"
                      :value="a_index"
                      @change="handleChange"
                    >
                      {{ questions[q_index].answers[a_index].answer }}
                    </b-form-checkbox>
                  </div>
                </div>
              </div>
              <div v-else class="ml-4">
                <div
                  v-for="(answer, a_index) in questions[q_index].answers"
                  :key="a_index"
                >
                  <b-form-radio
                    v-model="answers[q_index][a_index]"
                    @change="handleChange"
                    class="ml-1 p-1"
                    :name="'options-' + q_index"
                    :value="a_index"
                    >{{
                      questions[q_index].answers[a_index].answer
                    }}</b-form-radio
                  >
                </div>
              </div>
            </b-card-body>
          </b-card>
        </div>
      </b-overlay>
    </div>
    <b-button @click="submitAnswers">Envoyer</b-button>
  </b-container>
</template>

<script>
import AdminQuiz from "../apis/AdminQuiz";
export default {
  components: {},
  data: () => {
    return {
      running: false,
      showOverlay: false,
      quiz: {
        id: null,
        category: { _id: null, name: null },
        name: null,
        difficulty: null,
        bonus_time: null,
        bonus_xp: null,
        is_published: false,
      },
      questions: [],
      answers: [],
      chrono: null,
      polling: null,
    };
  },
  async mounted() {
    try {
      const quizId = this.$route.params.quiz_id;
      if (quizId) {
        this.editing = true;
        const quizReq = await AdminQuiz.getQuiz(quizId);
        this.quiz = quizReq.data;
        let time = new Date();
        time.setMinutes(quizReq.data.bonus_time);
        time.setUTCSeconds(0);
        this.chrono = time;
      }
    } catch (err) {
      this.toast("Erreur!", err.message, true);
      this.showOverlay = false;
    }
  },
  methods: {
    async startQuiz() {
      try {
        const quizId = this.$route.params.quiz_id;
        this.running = true;
        this.showOverlay = true;
        const questionsReq = await AdminQuiz.getQuestions(quizId);
        this.questions = questionsReq.data;
        this.questions.forEach((q, i) => (this.answers[i] = []));
        this.showOverlay = false;
        this.polling = setInterval(() => {
          let tmp = new Date(this.chrono);
          tmp.setSeconds(this.chrono.getSeconds() - 1);
          this.chrono = tmp;
          if (this.chrono.getSeconds() == 0 && this.chrono.getMinutes() == 0)
            clearInterval(this.polling);
        }, 1000);
      } catch (err) {
        this.toast("Erreur!", err.message, true);
        this.showOverlay = false;
        clearInterval(interval);
      }
    },
    beforeDestroy() {
      clearInterval(this.polling);
    },
    submitAnswers() {
      console.log(this.answers);
    },
    handleChange(e) {
      console.log(e);
    },
    isMulti(answers) {
      let cpt = 0;
      answers.forEach((answer) => {
        if (answer.is_correct) cpt++;
      });
      return cpt > 1;
    },
    toast(title, message, faulty = false) {
      this.$root.$bvToast.toast(message, {
        title: title,
        toaster: "b-toaster-top-center",
        variant: faulty ? "danger" : "success",
        appendToast: true,
      });
    },
  },
};
</script>
