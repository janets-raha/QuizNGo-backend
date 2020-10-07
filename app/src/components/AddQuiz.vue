<template>
  <div class="pt-2 mx-3">
    <div class="text-center mt-2"><h3>Nouveau Quiz</h3></div>
    <b-overlay :show="showOverlay" rounded="sm">
      <b-form @submit="onSubmit" @reset="onReset">
        <b-row no-gutters>
          <b-col md="4">
            <b-form-group
              id="input-name"
              label="Nom:"
              label-for="name"
              class="mr-sm-2"
              col="sm"
            >
              <b-form-input
                id="name"
                col-md-10
                v-model="form.name"
                type="text"
                required
                placeholder="Entrez le nom du quiz"
              ></b-form-input>
            </b-form-group>
          </b-col>

          <b-col md="4">
            <b-form-group
              id="input-category"
              label="Langage ou Techno:"
              label-for="category"
              class="mr-sm-2"
            >
              <b-form-select
                id="category"
                v-model="form.category"
                :options="categories"
                required
              ></b-form-select>
            </b-form-group>
          </b-col>

          <b-col md="4">
            <b-form-group
              id="input-difficulty"
              label="Difficulté:"
              label-for="difficulty"
            >
              <b-form-radio-group
                v-model="form.difficulty"
                :options="difficulties"
                class="my-3 ml-3"
                value-field="item"
                text-field="item"
              ></b-form-radio-group>
            </b-form-group>
          </b-col>
        </b-row>

        <b-row no-gutters>
          <b-col md="4">
            <b-form-group
              id="input-btime"
              label="Temps max pour bonus:"
              label-for="bonus_time"
              class="mr-sm-2"
            >
              <b-form-input
                id="bonus_time"
                type="number"
                v-model="form.bonus_time"
                required
                placeholder="Entrez le délai en minutes"
              ></b-form-input>
            </b-form-group>
          </b-col>

          <b-col md="4">
            <b-form-group
              id="input-bxp"
              label="Points de bonus:"
              label-for="bonus_xp"
              class="mr-sm-2"
            >
              <b-form-input
                id="bonus_xp"
                v-model="form.bonus_xp"
                required
                placeholder="Entrez les points bonus"
                type="number"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col md="4" class="text-center py-3">
            <b-button @click="addQuestion">Ajouter une question</b-button>
          </b-col>
        </b-row>

        <div
          v-for="(question, q_index) in questions"
          class="accordion"
          role="tablist"
          :key="q_index"
        >
          <b-card no-body class="mb-1">
            <b-card-header header-tag="header" role="tab" class="p-0">
              <b-container
                fluid
                v-b-toggle="'accordion-' + q_index"
                variant="info"
                class="p-2 btn-primary d-flex justify-content-between"
              >
                <span>Question {{ q_index + 1 }}</span>

                <b-icon
                  icon="trash-fill"
                  variant="danger"
                  class="h4 pt-1 m-0"
                  @click.prevent="deleteQuestion(q_index)"
                ></b-icon>
              </b-container>
            </b-card-header>
            <b-collapse
              :id="'accordion-' + q_index"
              visible
              accordion="quiz-accordion"
              role="tabpanel"
            >
              <b-card-body>
                <b-form-textarea
                  id="question"
                  v-model="questions[q_index].question"
                  required
                  placeholder="Entrez la question"
                  class="mb-2"
                ></b-form-textarea>
                <div class="d-flex mb-2">
                  <span class="text-nowrap pt-2">Points:</span>
                  <b-form-input
                    :id="'xps-' + q_index"
                    type="number"
                    v-model="questions[q_index].xps"
                    required
                    placeholder="Entrez les points bonus"
                    class="mx-2 w-75px"
                  ></b-form-input
                  ><b-button
                    @click="addAnswer(q_index)"
                    class="text-nowrap ml-auto"
                    >Ajouter une réponse</b-button
                  >
                </div>

                <b-form-group
                  v-for="(answer, a_index) in questions[q_index].answers"
                  :key="a_index"
                  :id="'input-answer-' + q_index + '-' + a_index"
                  :label="'Réponse N° ' + (a_index + 1) + ':'"
                  :label-for="'answer-' + q_index + '-' + a_index"
                >
                  <b-form-input
                    id="'answer-' +q_index + '-' +a_index"
                    v-model="questions[q_index].answers[a_index].answer"
                    required
                    placeholder="Entrez une réponse"
                  ></b-form-input>
                  <div class="d-flex justify-content-between">
                    <b-form-checkbox
                      v-model="questions[q_index].answers[a_index].is_correct"
                      >Correct</b-form-checkbox
                    >
                    <b-icon
                      icon="trash-fill"
                      variant="danger"
                      class="h4 pt-1 m-0 pointer"
                      @click.prevent="deleteAnswer(q_index, a_index)"
                    ></b-icon>
                  </div>
                </b-form-group>
              </b-card-body>
            </b-collapse>
          </b-card>
        </div>

        <b-container class="mt-3 mb-5 d-flex justify-content-center">
          <b-button type="reset" variant="danger" class="mt-2"
            >Annuler</b-button
          >
          <b-button
            variant="primary"
            class="mx-4 mt-2"
            @click.prevent="displayQuiz"
            >Visualiser</b-button
          >
          <b-button type="submit" variant="primary" class="mt-2"
            >Ajouter</b-button
          >
        </b-container>
      </b-form>
    </b-overlay>
  </div>
</template>

<script>
import AdminQuiz from "../apis/AdminQuiz";
export default {
  data: () => {
    return {
      showOverlay: false,
      form: {
        category: null,
        name: null,
        difficulty: null,
        bonus_time: null,
        bonus_xp: null,
        is_published: false,
      },
      questions: [],
      categories: [{ text: "Selectionnez...", value: null }],
      difficulties: ["Facile", "Moyen", "Difficile"],
    };
  },
  async mounted() {
    const categories = await AdminQuiz.getCategories();
    this.categories = this.categories.concat(categories.data);
  },
  methods: {
    addQuestion() {
      console.log(this.questions);
      this.questions.push({
        question: "",
        xps: 10,
        answers: [
          { answer: "", is_correct: false },
          { answer: "", is_correct: true },
        ],
        quizz_id: null,
      });
    },
    deleteQuestion(q_index) {
      if (confirm("Supprimer définitivement cette question?"))
        this.questions.splice(q_index, 1);
    },
    deleteAnswer(q_index, a_index) {
      if (confirm("Supprimer définitivement cette réponse?"))
        this.questions[q_index].answers.splice(a_index, 1);
    },
    addAnswer(q_index) {
      this.questions[q_index].answers.push({ answer: "", is_correct: false });
    },
    displayQuiz(evt) {
      evt.preventDefault();
      console.log(this.form, this.questions);
    },
    onReset(evt) {
      evt.preventDefault();
      this.$router.push("/admin");
    },
    async onSubmit(evt) {
      this.showOverlay = true;
      evt.preventDefault();
      try {
        const newQuiz = await AdminQuiz.addQuiz({ data: this.form });
        const newQuizId = newQuiz.data.id;
        this.questions.map((question) => (question.quizz_id = newQuizId));
        const newQuestions = await AdminQuiz.addQuestions({
          data: { questions: this.questions },
        });

        this.showOverlay = false;
        this.toast("Ajouté!", newQuestions.data.message);

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
