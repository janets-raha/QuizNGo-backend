import Api from "./Api";
export default {
  filterQuiz(payload) {
    return Api().post("/quizz/filter", payload.data);
  },
  searchQuiz(payload) {
    return Api().post("/quizz/search", payload.data);
  },

}