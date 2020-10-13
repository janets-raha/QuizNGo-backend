<template>
  <div class="home container col-md-10 mt-4">
    <div class="d-flex justify-content-between flex-wrap">
      <div class="w-100 mx-2">
        <b-input-group size="lg" class="mb-2 mw-100">
          <b-input-group-prepend>
            <button style="width: 3rem" @click="searchAll">
              <b-icon icon="search"></b-icon>
            </button>
          </b-input-group-prepend>
          <b-form-input
            type="search"
            placeholder="Search terms"
            v-model="searchItem"
            @keypress.enter="searchAll"
          ></b-form-input>
        </b-input-group>
      </div>
      <div
        class="d-flex justify-content-around align-items-center flex-wrap w-100"
      >
        <div class="mx-2">
          <b-form-select
            @change="searchAll"
            v-model="selectedLang"
            :options="options"
            class="mb-3"
            size="lg"
          >
            <template v-slot:first>
              <b-form-select-option :value="null" disabled
                >Filtrer par langage</b-form-select-option
              >
            </template>
          </b-form-select>
        </div>
        <div class="mx-2">
          <b-form-select
            @change="searchAll"
            v-model="selectedLevel"
            :options="niveau"
            class="mb-3"
            size="lg"
          >
            <!-- This slot appears above the options from 'options' prop -->
            <template v-slot:first>
              <b-form-select-option :value="null" disabled
                >Filtrer par niveau</b-form-select-option
              >
            </template>
          </b-form-select>
        </div>

        <div class="mx-2">
          <b-form-select
            @change="searchAll"
            v-model="sorting"
            :options="tri"
            class="mb-3"
            size="lg"
          >
            <!-- This slot appears above the options from 'options' prop -->
            <template v-slot:first> </template>
          </b-form-select>
        </div>

        <button @click="reset" class="btn-dark">Reset</button>
      </div>
    </div>

    <div class="d-flex justify-content-between flex-wrap">
      <QuizCard v-for="item in quizzes" :key="item.id" :quiz="item"></QuizCard>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import QuizCard from "@/components/QuizCard.vue";
import AdminQuiz from "../apis/AdminQuiz";
import Search from "../apis/Search";

export default {
  name: "Home",
  components: {
    QuizCard,
  },
  data() {
    return {
      quizzes: [],
      selectedLang: null,
      selectedLevel: null,
      searchItem: null,
      sorting: "desc",
      options: [],
      niveau: [
        { value: "Facile", text: "Facile" },
        { value: "Moyen", text: "Moyen" },
        { value: "Difficile", text: "Difficile" },
      ],
      tri: [
        { value: "desc", text: "Plus récents" },
        { value: "asc", text: "Plus anciens" },
      ],
    };
  },

  async mounted() {
    const categories = await AdminQuiz.getCategories();
    this.options = categories.data;
  },

  beforeMount() {
    this.getAllQuizzes();
  },

  updated() {
    //this.getAllQuizzes();
  },

  methods: {
    async getAllQuizzes() {
      AdminQuiz.getQuizzes().then((result) => {
        this.quizzes = result.data;
      });
    },

    /*     async filter(field) {
      const payload = {};
      payload.field = field;
      if (field === "category") {
        payload.query = this.selectedLang;
      } else {
        payload.query = this.selectedLevel;
      }
      Search.filterQuiz({ data: payload }).then(
        (result) => (this.quizzes = result.data)
      );
    }, */

    /*     async search() {
      console.log("search function")
      const payload = {};
      payload.query = this.searchItem;
      Search.searchQuiz({ data: payload }).then(
        (result) => (this.quizzes = result.data)
      );
    }, */

    async searchAll() {
      const payload = {};
      if (this.searchItem) {
        payload.query = this.searchItem;
      } else {
        payload.query = " ";
      }

      payload.category = this.selectedLang;
      payload.level = this.selectedLevel;
      payload.sort = this.sorting;
      Search.multiSearch({ data: payload }).then((result) => {
        //console.log(result.data);
        this.quizzes = result.data;
      });
    },

    /*     async sort() {
      const payload = {};
      payload.sort = this.sorting;
      Search.sortQuiz({ data: payload }).then((result) => {
        //console.log(result.data);
        this.quizzes = result.data;
      });
    }, */

    reset() {
      this.selectedLang = null;
      this.selectedLevel = null;
      this.searchItem = null;
      this.sorting = "desc";
      this.getAllQuizzes();
    },
  },
};
</script>

<style scoped>
</style>
