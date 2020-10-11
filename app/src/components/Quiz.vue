<template>
  <b-container class="pt-2 container mb-4">
    <b-overlay :show="showOverlay" rounded="sm">
      <b-row no-gutters class=" justify-content-between mb-2">
        <b-col md="4" class="pt-3 h5">
          <strong>
            {{ quiz.name }}
          </strong>
        </b-col>
        <b-col md="4" class="pt-3 h5 text-center">
          Techno : {{ quiz.category.name }}
        </b-col>
        <b-col md="4" class="d-flex justify-content-end">
          <b-icon
            v-if="quiz.difficulty === 'Facile'"
            icon="reception1"
            variant="success"
            class="mr-3 mb-3 h1"
          ></b-icon>
          <b-icon
            v-if="quiz.difficulty === 'Moyen'"
            icon="reception2"
            variant="warning"
            class="mr-3  mb-3 h1"
          ></b-icon>
          <b-icon
            v-if="quiz.difficulty === 'Difficile'"
            icon="reception3"
            variant="danger"
            class="mr-3 mt-1 mb-3 h1"
          ></b-icon>
          <div class="pt-3 h5 mb-0 mr-3">
            <b-icon icon="stopwatch" variant="primary"></b-icon
            >{{ quiz.bonus_time }} min
          </div>
          <div class="pt-3 h5  mb-0">
            <b-icon icon="award" variant="primary"></b-icon>+
            {{ quiz.bonus_xp }} pts
          </div>
        </b-col>
      </b-row>
      <div
        v-for="(question, q_index) in questions"
        :key="q_index"
        class="shadow"
      >
        <b-card shadow no-body class="mb-1">
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
                    v-model="questions[q_index].userAnswer"
                    @click="handleChange(q_index)"
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
                  @click="handleChange(q_index)"
                  class="ml-1 p-1"
                  :name="'options-' + q_index"
                  :value="questions[q_index].answers[a_index].answer"
                  v-bind="questions[q_index].userAnswer"
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
  </b-container>
</template>

<script>
import AdminQuiz from "../apis/AdminQuiz";
export default {
  components: {},
  data: () => {
    return {
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
    };
  },
  async mounted() {
    this.showOverlay = true;
    try {
      const quizId = this.$route.params.quiz_id;
      if (quizId) {
        this.editing = true;
        const quizReq = await AdminQuiz.getQuiz(quizId);
        this.quiz = quizReq.data;
        const questionsReq = await AdminQuiz.getQuestions(quizId);
        this.questions = questionsReq.data;
      }

      this.showOverlay = false;
    } catch (err) {
      this.toast("Erreur!", err.message, true);
      this.showOverlay = false;
      this.$router.push("/admin");
    }
  },
  methods: {
    handleChange(q_index) {
      console.log(this.questions[q_index]);
    },
    isMulti(answers) {
      let cpt = 0;
      answers.forEach((answer) => {
        if (answer.is_correct) cpt++;
      });
      return cpt > 1;
    },
    async onSubmit(evt) {
      this.showOverlay = true;
      evt.preventDefault();
      try {
        if (this.editing) {
          const updQuiz = await AdminQuiz.updateQuiz({
            quizId: this.form.id,
            data: this.form,
          });
          const delQuestions = await AdminQuiz.deleteQuestions({
            quizId: this.form.id,
          });
          const updQuestions = await AdminQuiz.addQuestions({
            data: { questions: this.questions },
          });
          this.toast("Modifié!!", updQuestions.data.message);
        } else {
          const newQuiz = await AdminQuiz.addQuiz({ data: this.form });
          const newQuizId = newQuiz.data.id;
          this.questions.map((question) => (question.quizz_id = newQuizId));
          const newQuestions = await AdminQuiz.addQuestions({
            data: { questions: this.questions },
          });

          this.toast("Ajouté!", newQuestions.data.message);
        }
        this.showOverlay = false;
        this.$router.push("/admin");
      } catch (err) {
        this.toast("Erreur!", err.message, true);
        this.showOverlay = false;
      }
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
