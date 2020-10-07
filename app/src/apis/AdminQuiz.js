import Api from "./Api";
export default {
  getCategories() {
    return Api().get("/category/");
  },
  getQuizzes() {
    return Api().get("/quiz");
  },
  addQuiz(payload) {
    return Api().post("/quiz", payload.data);
  },
  updateQuiz(payload) {
    return Api().patch("/quiz/" + payload.quizId, payload.data);
  },
  deleteQuiz(quizId) {
    return Api().delete("/quiz/" + quizId);
  },

  getAnswers(quizId) {
    return Api().get("/answer/" + quizId);
  },

  addAnswers(payload) {
    return Api().post("/answer" + payload.quizId, payload.data);
  },

  updateAnswers(payload) {
    return Api().patch("/answer/" + payload.quizId, payload.data);
  },

  deleteAnswer(answerId) {
    return Api().delete("/answer/" + id);
  },
};
