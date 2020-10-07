<template>
  <div class="pt-2 mx-3">
    <h3>Nouveau Quiz</h3>
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
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
              type="email"
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
            ></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>

      <b-form-group id="input-question" label="Question:" label-for="question">
        <b-form-textarea
          id="question"
          v-model="form.question"
          required
          placeholder="Entrez la question"
        ></b-form-textarea>
      </b-form-group>

      <b-button @click="addAnswer">Ajouter une question</b-button>

      <div
        class="accordion"
        role="tablist"
        v-for="(answer, index) in answers"
        :key="index"
      >
        <b-card no-body class="mb-1">
          <b-card-header header-tag="header" class="p-1" role="tab">
            <b-button block v-b-toggle="'accordion-' + index" variant="info"
              >Accordion {{ index + 1 }}</b-button
            >
          </b-card-header>
          <b-collapse
            :id="'accordion-' + index"
            visible
            accordion="my-accordion"
            role="tabpanel"
          >
            <b-card-body>
              <b-form-group
                :id="'input-answer-' + index"
                :label="'Réponse N° ' + (index + 1) + ':'"
                :label-for="'answer-' + index"
              >
                <b-form-input
                  id="'input-answer-' +index"
                  v-model="answers[index].answer"
                  required
                  placeholder="Entrez un réponse"
                ></b-form-input>
              </b-form-group>
            </b-card-body>
          </b-collapse>
        </b-card>
      </div>

      <!-- <div v-for="(answer, index) in answers" :key="index">
        <b-form-group
          :id="'input-answer-' + index"
          :label="'Réponse N° ' + (index + 1) + ':'"
          :label-for="'answer-' + index"
        >
          <b-form-input
            id="'input-answer-' +index"
            v-model="answers[index].answer"
            required
            placeholder="Entrez un réponse"
          ></b-form-input>
        </b-form-group>
      </div> -->

      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        category: null,
        name: null,
        difficulty: null,
        bonus_time: null,
        bonus_xp: null,
      },
      answers: [],
      categories: [
        { text: "Selectionnez...", value: null },
        { text: "Laravel", value: 1 },
        "Javascript",
        "RegEx",
      ],
      difficulties: ["Facile", "Moyen", "Difficile"],
      show: true,
    };
  },
  methods: {
    addAnswer() {
      this.answers.push({ answer: "réponse" });
    },
    onSubmit(evt) {
      evt.preventDefault();
      alert(JSON.stringify(this.form));
    },
    onReset(evt) {
      evt.preventDefault();
      // Reset our form values
      this.form.email = "";
      this.form.name = "";
      this.form.food = null;
      this.form.checked = [];
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
  },
};
</script>
