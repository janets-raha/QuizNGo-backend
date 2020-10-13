<template>
  <b-container class="pt-2  mb-4 h-100">
    <b-row no-gutters align-v="baseline" class=" justify-content-between mb-2 ">
      <b-col md="4" class=" h5">
        <strong>
          {{ quiz.name }}
        </strong>
      </b-col>
      <!--  <b-col md="4" class=" h5 text-center">
        Techno : {{ quiz.category.name }}
      </b-col> -->
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
    <div class="run-status d-flex justify-content-around">
      <h4>
        {{ chrono | moment("mm:ss") }}
      </h4>
      <h4>Bonus: {{ bonus }}</h4>
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
              <div v-if="questions[q_index].is_multi">
                <b-form-checkbox-group
                  v-model="answers[q_index]"
                  :name="'options-' + q_index"
                >
                  <div
                    v-for="(answer, a_index) in questions[q_index].answers"
                    :key="a_index"
                  >
                    <div class="ml-1 p-1">
                      <b-form-checkbox :value="a_index">
                        {{ answer.answer }}
                      </b-form-checkbox>
                    </div>
                  </div>
                </b-form-checkbox-group>
              </div>
              <div v-else class="ml-4">
                <b-form-radio-group
                  v-model="answers[q_index][0]"
                  stacked
                  :name="'options-' + q_index"
                >
                  <div
                    v-for="(answer, a_index) in questions[q_index].answers"
                    :key="a_index"
                  >
                    <b-form-radio :value="a_index" class="ml-1 p-1">
                      {{ answer.answer }}
                    </b-form-radio>
                  </div>
                </b-form-radio-group>
              </div>
            </b-card-body>
          </b-card>
        </div>
      </b-overlay>
    </div>
    <b-button
      @click="submitAnswers"
      :disabled="
        this.answerCount == 0 || this.answerCount !== this.questionCount
      "
      >Envoyer {{ answerCount }}/{{ questionCount }}</b-button
    >
  </b-container>
</template>

<script>
import Quiz from "../apis/Quiz";
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
      questionCount: 0,
      answers: [],
      answerCount: 0,
      chrono: null,
      polling: null,
      userId: null,
      bonus: null,
      timeout: null,
      results: null,
    };
  },
  updated() {
    let cpt = 0;
    this.answers.forEach((answerArray) => {
      if (answerArray.length) cpt++;
    });
    this.answerCount = cpt;
  },
  async mounted() {
    try {
      const quizId = this.$route.params.quiz_id;
      if (quizId) {
        this.editing = true;
        const quizReq = await Quiz.getQuiz(quizId);
        this.quiz = quizReq.data;
        let time = new Date();
        time.setMinutes(quizReq.data.bonus_time);
        time.setSeconds(0);
        this.bonus = quizReq.data.bonus_xp;
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
        this.running = true;
        this.showOverlay = true;
        const questionsReq = await Quiz.getQuestions(this.quiz.id);
        this.questions = questionsReq.data;
        this.questionCount = questionsReq.data.length;
        this.questions.forEach((q, i) => (this.answers[i] = []));
        this.showOverlay = false;
        this.polling = setInterval(() => {
          let tmp = new Date(this.chrono);
          tmp.setSeconds(this.chrono.getSeconds() - 1);
          this.chrono = tmp;
          if (this.chrono.getSeconds() == 0 && this.chrono.getMinutes() == 0) {
            clearInterval(this.polling);
            this.bonus = 0;
          }
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
    async submitAnswers() {
      clearInterval(this.polling);
      const getResults = await Quiz.getResults({
        quizId: this.quiz.id,
        answers: this.answers,
        timeout: this.chrono.getSeconds() == 0 && this.chrono.getMinutes() == 0,
      });
      console.log(getResults.data);
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
